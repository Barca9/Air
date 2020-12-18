const{Schema,model,Types} = require('mongoose')


const bookingSchema = new Schema({

    flight:{
        type:Types.ObjectId,
        ref:'Flight'

    },

    email:{
        type:String,
        required:true,  //обязательное поле
        unique:true
    },

    firstName:{
        type:String,
        required:true,  //обязательное поле

    },

    lastName:{
        type:String,
        required:true,  //обязательное поле

    },

    phone:{
        type:String,
        required:true,
    },

    placeNumber:{
        type:String
    }
})

module.exports = model('Booking',bookingSchema)