const request = require('supertest');
const { model: UserModel } = require('../../../db/models/user');
const { model: GenreModel } = require('../../../db/models/genre');

describe('auth middleware', () => {

    let server;
    let token;

    const exec = () => {
        return request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: 'genre 1' });
    };

    beforeEach(() => {
        server = require('../../../index');
        token = new UserModel().generateAuthToken();
    });

    afterEach(async () => {
        await server.close();
        await GenreModel.collection.deleteMany({});
    });

    it('should return 401 if token is not provided', async () => {
        token = '';
        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = '123'
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });
});