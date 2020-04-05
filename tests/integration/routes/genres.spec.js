const request = require('supertest');
const { model: GenreModel } = require('../../../db/models/genre');
const { model: UserModel } = require('../../../db/models/user');

describe('/api/genres', () => {

    let server;

    beforeEach(() => {
        server = require('../../../index')
    });

    afterEach(async () => {
        await server.close();
        await GenreModel.collection.deleteMany({})
    });
    
    describe('GET /', () => {
        it('should return all genres', async () => {
            await GenreModel.collection.insertMany([
                { name: 'genre 1' },
                { name: 'genre 2' },
            ]);

            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre 1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre 2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        let id;
        
        const exec = async () => {
            return await await request(server).get(`/api/genres/${id}`)
        };

        it('should return genre if valid id is passed', async () => {
            const genre = await new GenreModel({ name: 'genre 1' }).save();
            id = genre._id;
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return status 404 if genre not found', async () => {
            id = '5e77e4d4ee05cc60bfb0531f';
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should return status 404 if object is is not valid', async () => {
            id = '123';
            const res = await exec();
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        let token;
        let name;

        const exec = async () => {
            return await request(server).post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: name });
        };

        beforeEach(() => {
            token = new UserModel().generateAuthToken();
            name = 'genre 1';
        });

        it('should return 400 if genre is less then 5 characters', async () => {
            name = '1234'
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if genre is more then 50 characters', async () => {
            name = new Array(52).join('a')
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save genre in the db if it is valid', async () => {
            await exec();
            const genre = await GenreModel.find({ name: 'genre 1' });

            expect(genre).not.toBeNull();
        });

        it('should return genre if it is valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).not.toBeNull();
            expect(res.body).toHaveProperty('name', 'genre 1');
        });
    });

});