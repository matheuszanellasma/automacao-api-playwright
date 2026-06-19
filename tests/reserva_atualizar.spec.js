import { test, expect } from '../suport/baseTest';
import { AuthAPI } from '../api/AuthAPI';

test.describe('Testes de atualizar reservas', () => {

    let token;

    test.beforeEach(async ({ request }) => {
        const authAPI = new AuthAPI(request)
        const resposta_auth = await authAPI.logar('admin', 'password123')
        const token_body = await resposta_auth.json()
        token = token_body.token
    })

    test('Atualizar reserva com sucesso', async ({ reservaAPI }) => {
        // Criar reserva
        const payloadValido = reservaAPI.gerarPayloadComFaker()
        const resposta_criar = await reservaAPI.criar(payloadValido)
        const criar_body = await resposta_criar.json()
        const bookingid = criar_body.bookingid

        // Atualizar reserva com novos dados
        const payloadAtualizado = reservaAPI.gerarPayloadComFaker()
        const resposta_update = await reservaAPI.atualizar(bookingid, payloadAtualizado, token)

        expect(resposta_update.status()).toBe(200)

        const resposta_body = await resposta_update.json()
        reservaAPI.validarEstruturaDaReserva(resposta_body, payloadAtualizado)

        // Limpar
        await reservaAPI.deletar(bookingid, token)
    })

    test('Atualizar reserva inexistente', async ({ reservaAPI }) => {
        // Tentar atualizar reserva que não existe
        const payloadValido = reservaAPI.gerarPayloadComFaker()
        const resposta_update = await reservaAPI.atualizar(9999, payloadValido, token)

        expect(resposta_update.status()).toBe(405)
    })

    test('Atualizar reserva com payload vazio', async ({ reservaAPI }) => {
        // Criar reserva
        const payloadValido = reservaAPI.gerarPayloadComFaker()
        const resposta_criar = await reservaAPI.criar(payloadValido)
        const criar_body = await resposta_criar.json()
        const bookingid = criar_body.bookingid

        // Tentar atualizar com payload vazio
        const resposta_update = await reservaAPI.atualizar(bookingid, {}, token)

        expect(resposta_update.status()).toBe(400)

        // Limpar
        await reservaAPI.deletar(bookingid, token)
    })

    test('Atualizar reserva com token de auth vazio', async ({ reservaAPI }) => {
        // Criar reserva
        const payloadValido = reservaAPI.gerarPayloadComFaker()
        const resposta_criar = await reservaAPI.criar(payloadValido)
        const criar_body = await resposta_criar.json()
        const bookingid = criar_body.bookingid

        // Tentar atualizar com token vazio
        const payloadAtualizado = reservaAPI.gerarPayloadComFaker()
        const resposta_update = await reservaAPI.atualizar(bookingid, payloadAtualizado, '')

        expect(resposta_update.status()).toBe(403)

        // Limpar: atualizar com token válido
        await reservaAPI.deletar(bookingid, token)
    })

    test('Atualizar reserva com token de auth inválido', async ({ reservaAPI }) => {
        // Criar reserva
        const payloadValido = reservaAPI.gerarPayloadComFaker()
        const resposta_criar = await reservaAPI.criar(payloadValido)
        const criar_body = await resposta_criar.json()
        const bookingid = criar_body.bookingid

        // Tentar atualizar com token inválido
        const payloadAtualizado = reservaAPI.gerarPayloadComFaker()
        const resposta_update = await reservaAPI.atualizar(bookingid, payloadAtualizado, 'token_invalido')

        expect(resposta_update.status()).toBe(403)

        // Limpar: deletar com token válido
        await reservaAPI.deletar(bookingid, token)
    })

})
