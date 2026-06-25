import { test, expect } from '../suport/baseTest';

test.describe('Testes de deletar reservas', () => {

    let token;

    test.beforeEach(async ({ authAPI }) => {
        const resposta_auth = await authAPI.logar('admin', 'password123')
        const token_body = await resposta_auth.json()
        token = token_body.token
    })

    test('Deletar reserva com sucesso @smoke', async ({ reservaAPI }) => {
        const payload = reservaAPI.gerarPayloadComFaker()
        const respostaCriar = await reservaAPI.criar(payload)
        const { bookingid } = await respostaCriar.json()

        const respostaDeletar = await reservaAPI.deletar(bookingid, token)

        expect(respostaDeletar.status()).toBe(201)
    })

    test('Deletar reserva deletada', async ({ reservaAPI }) => {
        const payload = reservaAPI.gerarPayloadComFaker()
        const respostaCriar = await reservaAPI.criar(payload)
        const { bookingid } = await respostaCriar.json()

        await reservaAPI.deletar(bookingid, token)

        const respostaDeletarNovamente = await reservaAPI.deletar(bookingid, token)

        expect(respostaDeletarNovamente.status()).toBe(405)
    })

    test('Deletar reserva inexistente', async ({ reservaAPI }) => {
        const respostaDeletar = await reservaAPI.deletar(9999, token)

        expect(respostaDeletar.status()).toBe(405)
    })

    test('Deletar reserva com token de auth vazio', async ({ reservaAPI }) => {
        const payload = reservaAPI.gerarPayloadComFaker()
        const respostaCriar = await reservaAPI.criar(payload)
        const { bookingid } = await respostaCriar.json()

        const respostaDeletar = await reservaAPI.deletar(bookingid, '')

        expect(respostaDeletar.status()).toBe(403)

        await reservaAPI.deletar(bookingid, token)
    })

    test('Deletar reserva com token de auth inválido', async ({ reservaAPI }) => {
        const payload = reservaAPI.gerarPayloadComFaker()
        const respostaCriar = await reservaAPI.criar(payload)
        const { bookingid } = await respostaCriar.json()

        const respostaDeletar = await reservaAPI.deletar(bookingid, 'token_invalido')

        expect(respostaDeletar.status()).toBe(403)

        await reservaAPI.deletar(bookingid, token)
    })

})
