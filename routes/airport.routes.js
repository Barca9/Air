const {Router} = require('express')
const Airport = require('../models/Airport')

const {validationResult} = require('express-validator')

const router = Router()

//  /api/airport/create
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
            const {name, country, city} = req.body
            const candidate = await Airport.findOne({name: name})
            if (candidate) {
                return res.status(400).json({message: 'Такой аэропорт уже существует'})
            }

            const airport = new Airport({name, country, city})

            await airport.save()

            res.status(201).json({message: 'Аэропорт добавлен'})

        } catch (e) {
            res.status(500).json({message: "что то пошло не так"})
            console.log(e)//500-статус для ответа
        }
    })

//  /api/airport/get
router.get('/all', async (req, res) => {
        try {
            const airports = await Airport.find()
            res.json(airports)

        } catch (e) {
            res.status(500).json({message: "что-то пошло не так"})
            console.log(e)//500-статус для ответа
        }
    })

//  /api/airport/delete
router.delete('/:id', function(req, res, next) {
    Airport.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router