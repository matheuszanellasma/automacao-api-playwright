import { test, expect } from '../support/baseTest';

test.describe('Testes de autenticação', () => {



    test('Autenticação com sucesso com credenciais válidas @smoke', async ({ authAPI }) => {

        const resposta_auth = await authAPI.logar('admin', 'password123')

        expect(resposta_auth.status()).toBe(200)

        const resposta_body = await resposta_auth.json()
        expect(resposta_body.token).toBeDefined();
        expect(typeof resposta_body.token).toBe('string');
    })


    test.describe('Validações de campos obrigatórios na autenticação ', () => {

        const cenarios_autenticacao = [
            { username: 'master', password: "password123", teste: 'usuário inválido', status: 200 },
            { username: 'admin', password: "12345", teste: 'senha inválida', status: 200 },
            { username: '', password: "password123", teste: 'usuário em branco', status: 200 },
            { username: 'admin', password: '', teste: 'senha em branco', status: 200 }
        ]

        cenarios_autenticacao.forEach((cenario) => {

            test(`Autenticação mal sucedida com ${cenario.teste}`, async ({ authAPI }) => {
                const resposta_auth = await authAPI.logar(cenario.username, cenario.password)

                await expect(resposta_auth.status()).toBe(cenario.status)

                const resposta_body = await resposta_auth.json()
                await expect(resposta_body.reason).toBe('Bad credentials')

            })
        })
    })
})
