import { test, expect } from '../support/baseTest';

test.describe('Testes de criar reservas', () => {

    test('Criar reserva com sucesso @smoke', async ({ reservaAPI, authAPI }) => {
        const respostaAuth = await authAPI.logar('admin', 'password123')
        const { token } = await respostaAuth.json()

        const payload = reservaAPI.gerarPayloadComFaker()
        const respostaCriar = await reservaAPI.criar(payload)

        expect(respostaCriar.status()).toBe(200)

        const { bookingid, booking } = await respostaCriar.json()

        expect(bookingid).toBeDefined()
        expect(typeof bookingid).toBe('number')
        expect(booking).toBeDefined()
        reservaAPI.validarEstruturaDaReserva(booking, payload)

        const respostaDeletar = await reservaAPI.deletar(bookingid, token)
        expect(respostaDeletar.status()).toBe(201)
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
            const { bookingid } = await resposta.json()
            expect(bookingid).toBeDefined()
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
            const { bookingid } = await resposta.json()
            expect(bookingid).toBeDefined()
        })

        test('Criar reserva com firstname vazio', async ({ reservaAPI }) => {
            const payload = reservaAPI.gerarPayloadComFaker({ firstname: '' })
            const resposta = await reservaAPI.criar(payload)

            expect(resposta.status()).toBe(200)
            const { bookingid } = await resposta.json()
            expect(bookingid).toBeDefined()
        })

    })

})
