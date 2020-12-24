import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useParams} from 'react-router-dom'
import {useMessage} from "../hooks/message.hook";

export const BookingPage = () => {
    const message = useMessage()
    const {request, error, clearError, loading} = useHttp()
    const [flight, setFlight] = useState({})
    const flightId = useParams().id
    const placeNumber = useParams().placeNumber
    const [form, setForm] = useState({
        firstName: '', lastName: '', phone: '', email: ''
    })


    const getFlightResponse = useCallback(async () => {
        try {
            const response = await request(`/api/booked/details/${flightId}`, 'GET', null, {})
            setFlight(response)
            message(response.message)
        } catch (e) {
            e.message()
            console.log(e)
        }
    }, [request, message, flightId])

    useEffect(() => {
        getFlightResponse()
        clearError()
    }, [getFlightResponse, clearError, error])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const bookedHandler = async () => {
        try {
            const data = await request('/api/booked/create', 'POST', {...form, flight, placeNumber})
            message(data.message)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="row">
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s3">
                        <input id="icon_prefix" type="text"
                               className="validate"
                               name="firstName"
                               onChange={changeHandler}/>
                        <label htmlFor="first_name">Введите имя</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="icon_prefix" type="text"
                               className="validate"
                               name="lastName"
                               onChange={changeHandler}/>
                        <label htmlFor="last_name">Введите фамилию</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="icon_telephone" type="tel"
                               className="validate"
                               name="phone"
                               onChange={changeHandler}/>
                        <label htmlFor="password">Введите номер телефона</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="email" type="email"
                               className="validate"
                               name="email"
                               onChange={changeHandler}/>
                        <label htmlFor="email">Введите email</label>
                    </div>
                </div>
                <button className="waves-effect blue btn"
                        onClick={bookedHandler}
                        disabled={loading}>Забронировать
                </button>
            </form>
        </div>
    )
}
