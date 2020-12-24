const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {
        type: String,
        required: true,  //обязательное поле
        unique: true    //уникальность
    },
    password: {
        type: String,
        required: true
    }

})

module.exports = model('User', schema)