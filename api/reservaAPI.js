import { faker } from '@faker-js/faker';

export class ReservaAPI {

    constructor(request) {
        this.request = request;
        this.rota = '/booking'
    }

    gerarPayloadComFaker(dadosCustomizados = {}) {
        return {
            firstname: dadosCustomizados.firstname || faker.person.firstName(),
            lastname: dadosCustomizados.lastname || faker.person.lastName(),
            totalprice: dadosCustomizados.totalprice !== undefined ? dadosCustomizados.totalprice : faker.number.int({ min: 0, max: 1000 }),
            depositpaid: dadosCustomizados.depositpaid !== undefined ? dadosCustomizados.depositpaid : faker.datatype.boolean(),
            bookingdates: {
                checkin: dadosCustomizados.bookingdates?.checkin || faker.date.past().toISOString().split('T')[0],
                checkout: dadosCustomizados.bookingdates?.checkout || faker.date.future().toISOString().split('T')[0]
            },
            additionalneeds: dadosCustomizados.additionalneeds || faker.lorem.word()
        }
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
        return await this.request.delete(`${this.rota}/${id}`, {
            headers: {
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