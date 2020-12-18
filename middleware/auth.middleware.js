const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next)=>{
    if (req.method === 'OPTIONS'){  //метод который проверяет доступность сервера по запросу req
        return next()
    }

    try{
        const token = req.headers.authorization.split('')[1]  //строка которую мы передаём с фронтенда, "Bearer TOKEN"
        //парсим строку с пробелом и вытаскиваем из строки TOKEN
        if(!token){
            return res.status(401).json({message: 'Нет авторизации'})
        }
        const decoded = jwt.verify(token,config.get('jwtSecret'))  //раскодируем наш токен, 2ой параметр ключ из конфига
        req.user = decoded  //кладём в объект req, создаём там поле user  и кладём в него токен
        next()

    }catch (e) {
        res.status(401).json({message: 'Нет авторизации'})
    }
}


