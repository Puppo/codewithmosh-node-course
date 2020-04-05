const moment = require('moment');
const request = require('supertest');
const mongoose = require('mongoose');
const { model: RentalModel } = require('../../../db/models/rental');
const { model: MovieModel } = require('../../../db/models/movie');
const { model: UserModel } = require('../../../db/models/user');


describe('/api/returns', () => {
    
    let server;
    let token;
    let customerId;
    let movieId;
    let movie;
    let rental;

    const exec = () => {
        return request(server)
        .post('/api/returns')
        .set('x-auth-token', token)
        .send({ customerId, movieId });
    }

    beforeEach(async () => {
        server = require('../../../index');
        token = new UserModel().generateAuthToken();
        customerId = mongoose.Types.ObjectId().toHexString();
        movieId = mongoose.Types.ObjectId().toHexString();
        movie = new MovieModel({
            _id: movieId,
            title: '12345',
            dailyRentalRate: 2,
            genre: { name: '12345' },
            numberInStock: 10
        });
        await movie.save();
        rental = new RentalModel({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        })
        await rental.save();
    });

    afterEach(async() => {
        await server.close();
        await RentalModel.collection.deleteMany({});
        await MovieModel.collection.deleteMany({});
    });


    it('should return 401 if client is not logged in', async () => {
        token = '';
        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if customerId is not provided', async () => {
        customerId = '';
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 400 if movieId is not provided', async () => {
        movieId = '';
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 404 if no rental found for customerId/movieId', async () => {
        await RentalModel.collection.deleteMany({});
        const res = await exec();
        
        expect(res.status).toBe(404)
    });

    it('should return 400 if return is already process', async () => {
        rental.dateReturn = new Date();
        await rental.save();

        const res = await exec();
        
        expect(res.status).toBe(400)
    });

    it('should return 200 if rental is valid', async () => {
        const res = await exec();
        
        expect(res.status).toBe(200)
    });

    it('should set the return date if input is valid', async () => {
        await exec();

        const rentalInDb = await RentalModel.findById(rental._id);
        const diff = new Date() - rentalInDb.dateReturn;
        expect(diff).toBeLessThan(10 * 1000);
    });

    it('should set the rental fee if input is valid', async () => {
        rental.dateOut = moment().add(-7, 'days').toDate();
        await rental.save();

        await exec();

        const rentalInDb = await RentalModel.findById(rental._id);
        expect(rentalInDb.rentalFee).toBe(14);
    });

    it('should increase the movie stock if input is valid', async () => {
        await exec();

        const movieInDb = await MovieModel.findById(movie._id);
        expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
    });

    it('should return the rental if input is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    });

});
