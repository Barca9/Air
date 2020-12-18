const Flight = require('../models/Flight')
const {Router} = require('express')
const Booking = require('../models/Booking')
const router = Router()
const {validationResult} = require('express-validator')

router.get('/details/:id/:k', async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id).populate({ path: 'airportDeparture'}).populate({ path: 'airportDeparture'})
        const numberP = req.params.k
        res.json({flight, numberP})

    } catch (e) {}
})

router.post('/create',
    [],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message: 'Некорректные данные'
            })
        }
        const {lastName, firstName, flight, phone, email, placeNumber} = req.body

        const book = new Booking({lastName, firstName, flight, phone, email, placeNumber})
        console.log(book)
        await book.save()

        res.status(201).json({message: 'Бронирование сохранилось'})

    } catch (e) {
        res.status(500).json({message: "что то пошло не так в роуте букинга по созданию брони"})
        console.log(e)//500-статус для ответа
    }

})

router.get('/all', async (req, res) => {
    try {
        const bookings = await Booking.find().populate({ path: 'flight' })
        res.json(bookings)

    } catch (e) {
        res.status(500).json({message: "что-то пошло не так"})
        console.log(e)//500-статус для ответа
    }
})

router.delete('/:id', function(req, res, next) {
    Booking.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});



module.exports = router

