import { test, expect } from '../suport/baseTest';

test.describe('Testes de buscar reservas', () => {


    test('Buscar reserva com sucesso @smoke', async ({ reservaAPI, authAPI }) => {
        const respostaAuth = await authAPI.logar('admin', 'password123')
        const { token } = await respostaAuth.json()

        const payload = reservaAPI.gerarPayloadComFaker()
        const respostaCriar = await reservaAPI.criar(payload)
        const { bookingid } = await respostaCriar.json()

        const respostaBuscar = await reservaAPI.buscarPorId(bookingid)

        expect(respostaBuscar.status()).toBe(200)
        const respostaBody = await respostaBuscar.json()
        reservaAPI.validarEstruturaDaReserva(respostaBody, payload)

        const respostaDeletar = await reservaAPI.deletar(bookingid, token)
        expect(respostaDeletar.status()).toBe(201)
    })

    test.describe('Testes Negativos de Busca de Reserva', () => {

        test('Buscar reserva inexistente', async ({ reservaAPI }) => {
            const resposta = await reservaAPI.buscarPorId('9999')
            expect(resposta.status()).toBe(404)
        })

        test('Buscar reserva passando ID com caracteres especiais', async ({ reservaAPI }) => {
            const resposta = await reservaAPI.buscarPorId('@#$%')
            expect(resposta.status()).toBe(404)
        })

        test('Buscar reserva passando ID com número inválido (negativo)', async ({ reservaAPI }) => {
            const resposta = await reservaAPI.buscarPorId('-1')
            expect(resposta.status()).toBe(404)
        })

    })

})
