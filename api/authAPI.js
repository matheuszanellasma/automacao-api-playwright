export class AuthAPI {

    constructor(request) {
        this.request = request;
        this.rota = '/auth'
    }


    async logar(username, password) {
        return await this.request.post(this.rota, {
            data: {
                'username': username,
                'password': password
            }
        });
    }
}