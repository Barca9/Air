import React, {useCallback, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {Link} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";

export const AirportShowPage = () => {
    const message = useMessage()
    const {request, loading, error, clearError} = useHttp()
    const [airports, setAirports] = useState([])

    const getAirports = useCallback(async () => {
        try {
            const response = await request('/api/airport/all', 'GET', null, {})
            setAirports(response)
        } catch (e) {
            e.message()
            console.log(e)
        }
    }, [request])

    const removeHandler = async (id) => {
        try {
            await request(`/api/airport/${id}`, 'DELETE', null, {})
            getAirports()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getAirports()
        clearError()
        message(error)
    }, [getAirports, clearError, message, error])

    return (
        <div>
            <table className="highlight">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название аэропорта</th>
                    <th>Город</th>
                    <th>Страна</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {airports.map((airport, index) => {
                    return (
                        <tr key={airport._id}>
                            <td>{index + 1}</td>
                            <td>{airport.name}</td>
                            <td>{airport.city}</td>
                            <td>{airport.country}</td>
                            <td>
                                <button className="waves-effect lime btn"
                                        disabled={loading}
                                        onClick={() => removeHandler(airport._id)}>Удалить
                                </button>
                            </td>
                            <td>
                                <button className="waves-effect blue white-text btn">
                                    <Link to={`./update/${airport._id}`}>Изменить</Link>
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <button className="waves-effect lime btn">
                <Link to={`./create`}>Добавить новый аэропорт</Link>
            </button>
        </div>
    )
}