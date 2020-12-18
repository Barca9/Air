import React, {useCallback, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {Link} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";

export const FlightShowPage = ()=>{

    const message = useMessage()
    const {request,loading,error,clearError}= useHttp()
    const [flights, setFlight] = useState()

    const getFlights = useCallback(async ()=> {
        try{
            const fetched = await request('/api/flight/all', 'GET', null,{})
            setFlight(fetched)

        }catch (e){
            e.message()
            console.log(e)
        }
    },[request])


    const removeHandler = async (id) => {
        try {
            await request(`/api/${id}`, 'DELETE', null, {})
            getFlights()

        } catch (e) {

            console.log(e)
        }
    }

    useEffect(()=>{
        getFlights()
        clearError()
        message(error)
    },[getFlights,clearError,message,error])

    return(
         <div>
           <table className="highlight">
                <thead>
                <tr>
                    <th>Номер рейса</th>
                    <th>Дата отбытия</th>
                    <th>Время отбытия</th>
                    <th>Дата прибытия</th>
                    <th>Время прибытия</th>
                    <th>Аэропорт отбытия</th>
                    <th>Аэропорт прибытия</th>
                    <th>Цена,безнес-класс</th>
                    <th>Цена,эконом-класс</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {flights!==undefined?(
                    flights.map((flight) => {
                    return (
                        <tr key={flight._id}>
                            <td>{flight.number}</td>
                            <td >{(new Date(flight.departureDate)).toLocaleDateString()}</td>
                            <td >{(new Date(flight.departureDate)).toLocaleTimeString()}</td>
                            <td >{(new Date(flight.arrivalDate)).toLocaleDateString()}</td>
                            <td >{(new Date(flight.arrivalDate)).toLocaleTimeString()}</td>
                            <td >{flight.airportDeparture.name}</td>
                            <td >{flight.airportArrival.name}</td>
                            <td >{flight.priceBClass}</td>
                            <td >{flight.priceEClass}</td>
                            <td>
                                <button className="waves-effect blue btn"
                                        disabled={loading}
                                        onClick= {() => removeHandler(flight._id)}>
                                    Удалить
                                </button>
                            </td>
                            <td>
                                <button className="waves-effect blue btn">
                                    <Link to={`./update/${flight._id}`}>Изменить</Link>
                                </button>
                            </td>
                        </tr>
                    ) })) : (" ")
                }
                </tbody>
            </table>
            <button className="waves-effect lime btn">
                <Link to={`./create`}>Добавить новый рейс</Link>
            </button>
        </div>
    )
}