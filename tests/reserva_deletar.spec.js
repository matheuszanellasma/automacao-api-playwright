import { test, expect } from '../suport/baseTest';
import { AuthAPI } from '../api/AuthAPI';

test.describe('Testes de deletar reservas', () => {

    let token;

    test.beforeEach(async ({ request }) => {
        const authAPI = new AuthAPI(request)
        const resposta_auth = await authAPI.logar('admin', 'password123')
        const token_body = await resposta_auth.json()
        token = token_body.token
    })

    test('Deletar reserva com sucesso', async ({ reservaAPI }) => {
        // Criar reserva
        const payloadValido = reservaAPI.gerarPayloadComFaker()
        const resposta_criar = await reservaAPI.criar(payloadValido)
        const criar_body = await resposta_criar.json()
        const bookingid = criar_body.bookingid

        // Deletar reserva criada
        const resposta_delete = await reservaAPI.deletar(bookingid, token)

        expect(resposta_delete.status()).toBe(201)
    })

    test('Deletar reserva deletada', async ({ reservaAPI }) => {
        // Criar reserva
        const payloadValido = reservaAPI.gerarPayloadComFaker()
        const resposta_criar = await reservaAPI.criar(payloadValido)
        const criar_body = await resposta_criar.json()
        const bookingid = criar_body.bookingid

        // Deletar reserva pela primeira vez
        await reservaAPI.deletar(bookingid, token)

        // Tentar deletar a mesma reserva novamente
        const resposta_delete_segunda_vez = await reservaAPI.deletar(bookingid, token)

        expect(resposta_delete_segunda_vez.status()).toBe(405)
    })

    test('Deletar reserva inexistente', async ({ reservaAPI }) => {
        // Tentar deletar reserva que não existe
        const resposta_delete = await reservaAPI.deletar(9999, token)

        expect(resposta_delete.status()).toBe(405)
    })

    test('Deletar reserva com token de auth vazio', async ({ reservaAPI }) => {
        // Criar reserva
        const payloadValido = reservaAPI.gerarPayloadComFaker()
        const resposta_criar = await reservaAPI.criar(payloadValido)
        const criar_body = await resposta_criar.json()
        const bookingid = criar_body.bookingid

        // Tentar deletar reserva com token vazio
        const resposta_delete = await reservaAPI.deletar(bookingid, '')

        expect(resposta_delete.status()).toBe(403)

        // Limpar: deletar a reserva com token válido
        await reservaAPI.deletar(bookingid, token)
    })

    test('Deletar reserva com token de auth inválido', async ({ reservaAPI }) => {
        // Criar reserva
        const payloadValido = reservaAPI.gerarPayloadComFaker()
        const resposta_criar = await reservaAPI.criar(payloadValido)
        const criar_body = await resposta_criar.json()
        const bookingid = criar_body.bookingid

        // Tentar deletar reserva com token inválido
        const resposta_delete = await reservaAPI.deletar(bookingid, 'token_invalido')

        expect(resposta_delete.status()).toBe(403)

        // Limpar: deletar a reserva com token válido
        await reservaAPI.deletar(bookingid, token)
    })

})
