import { test, expect } from '../suport/baseTest';

test.describe('Testes de buscar reservas', () => {


    test('Buscar reserva com sucesso', async ({ reservaAPI }) => {

        //criar reserva

        const resposta_busca = await reservaAPI.buscarPorId(3)

        expect(resposta_busca.status()).toBe(200)

        const resposta_body = await resposta_busca.json()

        console.log(resposta_body)

        //validar reserva método
        //deletar reserva passando id e token
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
