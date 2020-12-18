const{Schema,model,Types} = require('mongoose')


const flightSchema = new Schema({
    number: {
        type:String,
        required:true,
        unique:true
    },

    departureDate: {
        type: Date,
        required:true,
        unique: false
    },

    arrivalDate:{
        type: Date,
        required:true,
        unique: false
    },

    airportDeparture:{
        type:Types.ObjectId,
        ref:'Airport'
    },

    airportArrival:{
        type:Types.ObjectId,
        ref:'Airport'
    },

    priceBClass:{
        type: String
    },

    priceEClass:{
        type: String
    }

})

module.exports = model('Flight',flightSchema)
