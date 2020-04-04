const { model: User } = require('../../../../db/models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('User', () => {
    describe('generateAuthToken', () => {
        it('should return a valid JWT', () => {
            const payload = { 
                _id: mongoose.Types.ObjectId().toHexString(),
                isAdmin: true
            };
            const user = new User(payload);
            const token = user.generateAuthToken();
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            expect(decoded).toMatchObject(payload);
        });
    });
});