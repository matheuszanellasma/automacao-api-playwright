import { test, expect } from '../suport/baseTest';
import { AuthAPI } from '../api/AuthAPI';

test.describe('Testes de buscar reservas', () => {


    test('Buscar reserva com sucesso', async ({ request, reservaAPI }) => {
        const authAPI = new AuthAPI(request)

        // Gerar token
        const resposta_auth = await authAPI.logar('admin', 'password123')
        const token_body = await resposta_auth.json()
        const token = token_body.token

        // Criar reserva
        const payloadValido = reservaAPI.gerarPayloadComFaker()
        const resposta_criar = await reservaAPI.criar(payloadValido)
        const criar_body = await resposta_criar.json()
        const bookingid = criar_body.bookingid

        // Buscar reserva criada
        const resposta_busca = await reservaAPI.buscarPorId(bookingid)

        expect(resposta_busca.status()).toBe(200)

        const resposta_body = await resposta_busca.json()

        expect(resposta_body.firstname).toBe(payloadValido.firstname)
        expect(resposta_body.lastname).toBe(payloadValido.lastname)
        expect(resposta_body.totalprice).toBe(payloadValido.totalprice)
        expect(resposta_body.depositpaid).toBe(payloadValido.depositpaid)
        expect(resposta_body.bookingdates.checkin).toBe(payloadValido.bookingdates.checkin)
        expect(resposta_body.bookingdates.checkout).toBe(payloadValido.bookingdates.checkout)

        // Deletar reserva
        const resposta_delete = await reservaAPI.deletar(bookingid, token)
        expect(resposta_delete.status()).toBe(201)
    })

    test.describe('Testes Negativos de Busca de Reserva', () => {

        test('Buscar reserva inexistente', async ({ reservaAPI }) => {
            const resposta = await reservaAPI.buscarPorId('9999');
            expect(resposta.status()).toBe(404);
        });

        test('Buscar reserva passando ID com caracteres especiais', async ({ reservaAPI }) => {
            const resposta = await reservaAPI.buscarPorId('@#$%');
            expect(resposta.status()).toBe(404);
        });

        test('Buscar reserva passando ID com número inválido (negativo)', async ({ reservaAPI }) => {
            const resposta = await reservaAPI.buscarPorId('-1');
            expect(resposta.status()).toBe(404);
        });

    });

})
