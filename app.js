const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const {check, validationResult} = require('express-validator')

const app = express()  //будущий сервер

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/airport', require('./routes/airport.routes'))
app.use('/api/flight', require('./routes/flight.routes'))
app.use('/api/home', require('./routes/home.routes'))
app.use('/api/booked', require('./routes/booking.routes'))


//регистрируем роуты, которые по разному обрабатывают апи запросы с фронта
const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,   //параметры для коннекта
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`started on port ${PORT}..!!`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
