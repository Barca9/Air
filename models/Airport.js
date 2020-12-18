const{Schema,model} = require('mongoose')

const airportSchema = new Schema({
    name: {
        type:String,
        required:true,  //обязательное поле
        //unique:true    //уникальность
    },
    country: {
        type: String,
        required:true
    },
    city: {
        type: String,
        required:true
    }
})

module.exports = model('Airport',airportSchema)