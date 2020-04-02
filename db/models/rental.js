const mongoose = require('mongoose');

const rentalSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema({
            name: {
                type: String,
                required: true,
                minLength: 5,
                maxLength: 50
            },
            isGold: {
                type: Boolean,
                required: true,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minLength: 5,
                maxLength: 50
            }
        }),
        required: true
    },
    movie: {
        type: mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minLength: 5,
                maxLength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturn: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const RentalModel = new mongoose.model('Rental', rentalSchema);

module.exports = {
    model: RentalModel,
    schema: rentalSchema
}