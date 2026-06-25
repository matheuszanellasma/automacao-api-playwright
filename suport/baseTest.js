import { test as base } from '@playwright/test';
import { AuthAPI } from '../api/authAPI';
import { ReservaAPI } from '../api/reservaAPI'; 

export const test = base.extend({

    authAPI: async ({ request }, use) => {
        await use(new AuthAPI(request));
    },

    reservaAPI: async ({ request }, use) => {
        await use(new ReservaAPI(request));
    }
});

export { expect } from '@playwright/test';