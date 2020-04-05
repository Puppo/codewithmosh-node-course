const mongoose = require('mongoose');
const moment = require('moment');

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

rentalSchema.statics.lookup = function(customerId, movieId) {
    return this.findOne({ 
        'customer._id': customerId,
        'movie._id': movieId
     });
}

rentalSchema.methods.return = function() {
    this.dateReturn = new Date();
    
    const rentalDays = moment().diff(this.dateOut, 'days');
    this.rentalFee = rentalDays * this.movie.dailyRentalRate;
}

const RentalModel = new mongoose.model('Rental', rentalSchema);

module.exports = {
    model: RentalModel,
    schema: rentalSchema
}