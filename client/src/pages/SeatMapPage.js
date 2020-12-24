import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {Link, useParams} from 'react-router-dom'
import '../styles/SeatMapStyle.css';
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

export const SeatMapPage = () => {
    const flightId = useParams().id
    const {request, error, clearError} = useHttp()
    const [flight, setFlight] = useState({})

    const getFlight = useCallback(async () => {
        try {
            const fetched = await request(`/api/home/${flightId}`, 'GET', null, {})
            setFlight(fetched)
        } catch (e) {
            console.log(e)
        }
    }, [request, flightId])

    /*const getSeatMap = useCallback(async () => {
        try {
            const dataSeatMap = await request('/api/home/seatMapCreate', 'POST', {flightId}, {})
            setSeatMap(dataSeatMap)
            console.log(seatMap)
        } catch (e) {
            console.log(e)
        }
    }, [request, flightId])*/


    useEffect(() => {
        getFlight()
        clearError()
    }, [getFlight, clearError, error])


    let seats = [
        {placeNumber: 'A1', value: true}, {placeNumber: 'A2', value: false}, {placeNumber: 'A3', value: true},
        {placeNumber: 'A4', value: true}, {placeNumber: 'A5', value: true}, {placeNumber: 'A6', value: true},
        {placeNumber: 'B1', value: true}, {placeNumber: 'B2', value: true}, {placeNumber: 'B3', value: true},
        {placeNumber: 'B4', value: true}, {placeNumber: 'B5', value: true}, {placeNumber: 'B6', value: true},
        {placeNumber: 'C1', value: false}, {placeNumber: 'C2', value: true}, {placeNumber: 'C3', value: true},
        {placeNumber: 'C4', value: true}, {placeNumber: 'C5', value: true}, {placeNumber: 'C6', value: true},
        {placeNumber: 'D1', value: true}, {placeNumber: 'D2', value: true}, {placeNumber: 'D3', value: true},
        {placeNumber: 'D4', value: true}, {placeNumber: 'D5', value: true}, {placeNumber: 'D6', value: true},
        {placeNumber: 'E1', value: true}, {placeNumber: 'E2', value: true}, {placeNumber: 'E3', value: true},
        {placeNumber: 'E4', value: true}, {placeNumber: 'E5', value: true}, {placeNumber: 'E6', value: true},
        {placeNumber: 'F1', value: true}, {placeNumber: 'F2', value: true}, {placeNumber: 'F3', value: true},
        {placeNumber: 'F4', value: true}, {placeNumber: 'F5', value: true}, {placeNumber: 'F6', value: true}]

    const colorCode = (number, value) => {
        let colorClass
        if (value === false) {
            colorClass = "booked"
        } else if (number[0] === "A" || number[0] === "B") {
            colorClass = "businessClass"
        } else {
            colorClass = "economyClass"
        }
        return colorClass
    }

    const pointerOrNot = (v) => {
        let cursor = 'not-allowed'
        if (v === true) {
            cursor = 'pointer'
        }
        return cursor;
    }

    return (
        <div className="parentWrapper">
            <h5>Кликните по выбранному месту</h5>
            <div className="avatarWrapper">
                <Avatar className="avatarIcon booked">B</Avatar><h5>: Забронировано</h5>
                <Avatar className="avatarIcon economyClass">E</Avatar><h5> : Эконом-класс</h5>
                <Avatar className="avatarIcon businessClass">B</Avatar><h5> : Бизнес-класс</h5>
            </div>
            {
                seats.map((item) => {
                    return (
                        <Fragment key={item}>
                    <span>
                        {item.placeNumber.charAt(1) === '4' ?
                            <span>&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;</span> : ''}
                        <span className="wrapper">
                                <Tooltip title={item.placeNumber} className="toolTip" placement="right">
                                    <Avatar style={{cursor: pointerOrNot(item.value)}}
                                            variant="square" className={colorCode(item.placeNumber, item.value)}>
                                        <Link className="linkStyle"
                                              to={`/booked/details/${flight._id}/${item.placeNumber}`}>{item.placeNumber}</Link>
                                    </Avatar>
                                </Tooltip>
                             </span>
                        </span>
                        </Fragment>
                    )
                })
            }
        </div>
    )
}