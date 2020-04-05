const authMiddleware = require('../../../middleware/auth');
const { model: UserModel } = require('../../../db/models/user');
const mongoose = require('mongoose');

describe('auth middleware', () => {
    it('should populate req.user with the payload of a valid JWT', () => {
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const token = new UserModel(user).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = { };
        const next = jest.fn();


        authMiddleware(req, res, next);

        expect(req.user).toMatchObject(user);
        expect(next).toHaveBeenCalled();
    });
});