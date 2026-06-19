export class ReservaAPI {

    constructor(request) {
        this.request = request;
        this.rota = '/booking'
    }


    async buscarPorId(id) {
        return await this.request.get(`${this.rota}/${id}`);
    }

    async criar(payload) {
        return await this.request.post(this.rota, {
            data: payload
        });
    }
    
    async deletar(id, token) {
        return await this.request.del(`${this.rota}/${id}`, {
            Headers: {
                'Cookie': `token=${token}`
            }
        });
    }

    validarEstruturaDaReserva(body, dadosEsperados) {
        expect(body.firstname).toBe(dadosEsperados.firstname);
        expect(body.lastname).toBe(dadosEsperados.lastname);
        expect(body.totalprice).toBe(dadosEsperados.totalprice);
        expect(body.depositpaid).toBe(dadosEsperados.depositpaid);
        
        expect(body.bookingdates.checkin).toBe(dadosEsperados.bookingdates.checkin);
        expect(body.bookingdates.checkout).toBe(dadosEsperados.bookingdates.checkout);
    }


}