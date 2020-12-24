const {Schema, model, Types} = require('mongoose')

const flightSchema = new Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },

    departureDate: {
        type: Date,
        required: true,
    },

    arrivalDate: {
        type: Date,
        required: true,
    },

    airportDeparture: {
        type: Types.ObjectId,
        ref: 'Airport'
    },

    airportArrival: {
        type: Types.ObjectId,
        ref: 'Airport'
    },

    priceBClass: {
        type: String
    },

    priceEClass: {
        type: String
    }
})

module.exports = model('Flight', flightSchema)
