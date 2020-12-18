const {Router} = require('express')
const Flight = require('../models/Flight')
const router = Router()

const {validationResult} = require('express-validator')

//  /api/flight
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
            const {number, departureDate,arrivalDate,airportDeparture, airportArrival,priceEClass,priceBClass} = req.body

            const flight = new Flight({number,departureDate,arrivalDate ,airportDeparture, airportArrival,priceEClass, priceBClass})

            await flight.save()

            res.status(201).json({message: 'Рейс добавлен'})

        } catch (e) {
            res.status(500).json({message: "что то пошло не так"})
            console.log(e)    //500-статус для ответа
        }
    })

router.get('/all', async (req, res) => {
    try {
        const flights = await Flight.find().populate({ path: 'airportDeparture', select: 'name' }).
        populate({ path: 'airportArrival', select: 'name' })
        res.json(flights)

    } catch (e) {
        res.status(500).json({message: "что-то пошло не так"})
        console.log(e)//500-статус для ответа
    }
})

//  /api/flight/delete
router.delete('/:id', function(req, res, next) {
    Flight.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router