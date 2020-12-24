const {Schema, model, Types} = require('mongoose')


const bookingSchema = new Schema({

    flight: {
        type: Types.ObjectId,
        ref: 'Flight'
    },

    email: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    placeNumber: {
        type: String
    }
})

module.exports = model('Booking', bookingSchema)