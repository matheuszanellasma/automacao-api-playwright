import { test, expect } from '../suport/baseTest';
import { AuthAPI } from '../api/AuthAPI';

test.describe('Testes de criar reservas', () => {

    test('Criar reserva com sucesso @smoke', async ({ request, reservaAPI }) => {
        const authAPI = new AuthAPI(request)

        // Gerar token
        const resposta_auth = await authAPI.logar('admin', 'password123')
        const token_body = await resposta_auth.json()
        const token = token_body.token

        // Criar reserva
        const payloadValido = reservaAPI.gerarPayloadComFaker()
        const resposta = await reservaAPI.criar(payloadValido)

        expect(resposta.status()).toBe(200)

        const resposta_body = await resposta.json()
        const bookingid = resposta_body.bookingid

        expect(resposta_body.bookingid).toBeDefined()
        expect(typeof resposta_body.bookingid).toBe('number')

        expect(resposta_body.booking).toBeDefined()
        reservaAPI.validarEstruturaDaReserva(resposta_body.booking, payloadValido)

        // Deletar reserva
        const resposta_delete = await reservaAPI.deletar(bookingid, token)
        expect(resposta_delete.status()).toBe(201)
    })

    test.describe('Validações de campos obrigatórios na criação', () => {

        const cenarios_obrigatorios = [
            { campo: 'firstname', descricao: 'sem firstname' },
            { campo: 'lastname', descricao: 'sem lastname' },
            { campo: 'totalprice', descricao: 'sem totalprice' },
            { campo: 'depositpaid', descricao: 'sem depositpaid' },
            { campo: 'bookingdates', descricao: 'sem bookingdates' }
        ]

        cenarios_obrigatorios.forEach((cenario) => {
            test(`Validar erro ao criar reserva ${cenario.descricao}`, async ({ reservaAPI }) => {
                const payload = reservaAPI.gerarPayloadComFaker()
                delete payload[cenario.campo]

                const resposta = await reservaAPI.criar(payload)

                expect(resposta.status()).toBe(500)
            })
        })
    })

    test.describe('Testes negativos de criação de reserva', () => {

        test('Criar reserva com payload incompleto (vazio)', async ({ reservaAPI }) => {
            const resposta = await reservaAPI.criar({})

            expect(resposta.status()).toBe(500)
        })

        test('Criar reserva com totalprice negativo', async ({ reservaAPI }) => {
            const payload = reservaAPI.gerarPayloadComFaker({ totalprice: -100 })

            const resposta = await reservaAPI.criar(payload)

            expect(resposta.status()).toBe(200)
            const resposta_body = await resposta.json()
            expect(resposta_body.bookingid).toBeDefined()
        })

        test('Criar reserva com datas em formato inválido', async ({ reservaAPI }) => {
            const payload = reservaAPI.gerarPayloadComFaker({
                bookingdates: {
                    checkin: 'data-invalida',
                    checkout: 'outra-data-invalida'
                }
            })

            const resposta = await reservaAPI.criar(payload)

            expect(resposta.status()).toBe(200)
            const resposta_body = await resposta.json()
            expect(resposta_body.bookingid).toBeDefined()
        })

        test('Criar reserva com firstname vazio', async ({ reservaAPI }) => {
            const payload = reservaAPI.gerarPayloadComFaker({ firstname: '' })

            const resposta = await reservaAPI.criar(payload)

            expect(resposta.status()).toBe(200)
            const resposta_body = await resposta.json()
            expect(resposta_body.bookingid).toBeDefined()
        })

    })

})
