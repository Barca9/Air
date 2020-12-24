const {Router} = require('express')
const Flight = require('../models/Flight')
const router = Router()

router.post('/find', async (req, res) => {
    try {
        const {firstDate, secondDate, selectAirportDeparture, selectAirportArrival} = req.body
        const flights = await Flight.find({
            $and: [
                {airportDeparture: selectAirportDeparture},
                {airportArrival: selectAirportArrival},
                {departureDate: {$gte: firstDate, $lte: secondDate}}
            ]
        }).populate({path: 'airportDeparture', select: 'name'}).populate({path: 'airportArrival', select: 'name'});

        if (!flights) {
            return res.status(400).json({message: 'Рейс не найден'})
        }
        res.json(flights)

    } catch (e) {
        res.status(500).json({message: "что то пошло не так с руотом хома"})
        console.log(e)//500-статус для ответа
    }
})
//api/home/seatMap
router.get('/:id', async (req, res) => {
    try {
        const flightForSeatMap = await Flight.findById(req.params.id)
        res.json(flightForSeatMap)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова в роуте по ID'})
    }
})

/*router.post('/seatMapCreate', async (req, res) => {
    try {
        const {flightId} = req.body
        const books = await Booking.find({flight: flightId})

        let seats = [
            {k: 'A1', v: true}, {k: 'A2', v: true}, {k: 'A3', v: true},
            {k: 'A4', v: true}, {k: 'A5', v: true}, {k: 'A6', v: true},
            {k: 'B1', v: true}, {k: 'B2', v: true}, {k: 'B3', v: true},
            {k: 'B4', v: true}, {k: 'B5', v: true}, {k: 'B6', v: true},
            {k: 'C1', v: true}, {k: 'C2', v: true}, {k: 'C3', v: true},
            {k: 'C4', v: true}, {k: 'C5', v: true}, {k: 'C6', v: true},
            {k: 'D1', v: true}, {k: 'D2', v: true}, {k: 'D3', v: true},
            {k: 'D4', v: true}, {k: 'D5', v: true}, {k: 'D6', v: true},
            {k: 'E1', v: true}, {k: 'E2', v: true}, {k: 'E3', v: true},
            {k: 'E4', v: true}, {k: 'E5', v: true}, {k: 'E6', v: true},
            {k: 'F1', v: true}, {k: 'F2', v: true}, {k: 'F3', v: true},
            {k: 'F4', v: true}, {k: 'F5', v: true}, {k: 'F6', v: true}]

        const placeNumbers = await books.map((book) => {
            return book.placeNumber
        })

        const arr = await seats.map((item) => {
            return {
                k: item.k,
                v: !placeNumbers.contains(item.k)
            }
        })

        console.log(arr)

        res.json({arr})
    } catch (e) {
        res.status(500).json({message: "что-то пошло не так в роуте букед по ситмапе"})
        console.log(e)
    }
})*/

module.exports = router