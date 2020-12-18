import React, {useCallback, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";

import {useMessage} from "../hooks/message.hook";

export const BookingShowPage = ()=>{

    const message = useMessage()
    const {request,loading,error,clearError}= useHttp()
    const [bookings, setBookings] = useState()

    const getBookings = useCallback(async ()=> {
        try{
            const fetched = await request('/api/booked/all', 'GET', null,{})
            setBookings(fetched)

        }catch (e){
            e.message()
            console.log(e)
        }
    },[request])


    const removeHandler = async (id) => {
        try {
            await request(`/api/booked/${id}`, 'DELETE', null, {})
            getBookings()

        } catch (e) {

            console.log(e)
        }
    }

    useEffect(()=>{
        getBookings()
        clearError()
        message(error)
    },[getBookings,clearError,message,error])

    return(
        <div>
            <table className="highlight">
                <thead>
                <tr>
                    <th>Номер рейса</th>
                    <th>Номер места</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Телефон</th>
                    <th>Почта</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {bookings!==undefined?(
                    bookings.map((book) => {
                        return (
                            <tr key={book._id}>
                                <td>{book.flight.number}</td>
                                <td >{book.placeNumber}</td>
                                <td >{book.firstName}</td>
                                <td >{book.lastName}</td>
                                <td >{book.phone}</td>
                                <td >{book.email}</td>
                                <td>
                                    <button className="waves-effect blue btn"
                                            disabled={loading}
                                            onClick= {() => removeHandler(book._id)}>
                                        Удалить
                                    </button>
                                </td>

                            </tr>
                        ) })) : (" ")
                }
                </tbody>
            </table>

        </div>
    )
}