const request = require('supertest');

require('dotenv').config({ path: ".env.test" })

describe('Authentication', () => {
    console.log("API_ENDPOINT=", process.env.API_ENDPOINT)
    it('should authenticate with valid credentials', async () => {
        const response = await request(process.env.API_ENDPOINT).post('/users')
        expect(response.status).toBe(200)
        //expect(user.username).toBe('andreciornavei');        
    });
});