import { test, expect } from '../suport/baseTest';

test.describe('Testes de atualizar reservas', () => {

    let token;

    test.beforeEach(async ({ authAPI }) => {
        const resposta_auth = await authAPI.logar('admin', 'password123')
        const token_body = await resposta_auth.json()
        token = token_body.token
    })

    test('Atualizar reserva com sucesso @smoke', async ({ reservaAPI }) => {
        const payload = reservaAPI.gerarPayloadComFaker()
        const respostaCriar = await reservaAPI.criar(payload)
        const { bookingid } = await respostaCriar.json()

        const payloadAtualizado = reservaAPI.gerarPayloadComFaker()
        const respostaAtualizar = await reservaAPI.atualizar(bookingid, payloadAtualizado, token)

        expect(respostaAtualizar.status()).toBe(200)
        const respostaBody = await respostaAtualizar.json()
        reservaAPI.validarEstruturaDaReserva(respostaBody, payloadAtualizado)

        await reservaAPI.deletar(bookingid, token)
    })

    test('Atualizar reserva inexistente', async ({ reservaAPI }) => {
        const payload = reservaAPI.gerarPayloadComFaker()
        const respostaAtualizar = await reservaAPI.atualizar(9999, payload, token)

        expect(respostaAtualizar.status()).toBe(405)
    })

    test('Atualizar reserva com payload vazio', async ({ reservaAPI }) => {
        const payload = reservaAPI.gerarPayloadComFaker()
        const respostaCriar = await reservaAPI.criar(payload)
        const { bookingid } = await respostaCriar.json()

        const respostaAtualizar = await reservaAPI.atualizar(bookingid, {}, token)

        expect(respostaAtualizar.status()).toBe(400)

        await reservaAPI.deletar(bookingid, token)
    })

    test('Atualizar reserva com token de auth vazio', async ({ reservaAPI }) => {
        const payload = reservaAPI.gerarPayloadComFaker()
        const respostaCriar = await reservaAPI.criar(payload)
        const { bookingid } = await respostaCriar.json()

        const payloadAtualizado = reservaAPI.gerarPayloadComFaker()
        const respostaAtualizar = await reservaAPI.atualizar(bookingid, payloadAtualizado, '')

        expect(respostaAtualizar.status()).toBe(403)

        await reservaAPI.deletar(bookingid, token)
    })

    test('Atualizar reserva com token de auth inválido', async ({ reservaAPI }) => {
        const payload = reservaAPI.gerarPayloadComFaker()
        const respostaCriar = await reservaAPI.criar(payload)
        const { bookingid } = await respostaCriar.json()

        const payloadAtualizado = reservaAPI.gerarPayloadComFaker()
        const respostaAtualizar = await reservaAPI.atualizar(bookingid, payloadAtualizado, 'token_invalido')

        expect(respostaAtualizar.status()).toBe(403)

        await reservaAPI.deletar(bookingid, token)
    })

})
