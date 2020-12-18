import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {Link, useParams} from 'react-router-dom'
import '../styles/SeatMapStyle.css';
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";



export const SeatMapPage = () => {
    const flightId = useParams().id
    const {request,error,clearError} = useHttp()
    const [flight, setFlight] = useState({})
    const [seatMap, setSeatMap] = useState([])


    const getFlight = useCallback(async () => {
        try {
            const fetched = await request(`/api/home/${flightId}`, 'GET', null, {})
            setFlight(fetched)

        } catch (e) {
            console.log(e)
        }
    }, [request, flightId])


    const getSeatMap = useCallback(async () => {
        try {
            const dataSeatMap = await request('/api/home/seatMapCreate', 'POST', {flightId}, {})
            setSeatMap(dataSeatMap)
            console.log(seatMap)
        } catch (e) {
            console.log(e)
        }
    }, [request, flightId])


    useEffect(() => {
        getFlight()
        getSeatMap()
        clearError()
    }, [getSeatMap,getFlight,clearError,error])


    let seats = [
        {k: 'A1', v: true},{k: 'A2', v: false},{k: 'A3', v: true},
        {k: 'A4', v: true},{k: 'A5', v: true},{k: 'A6', v: true},
        {k: 'B1', v: true},{k: 'B2', v: true},{k: 'B3', v: true},
        {k: 'B4', v: true},{k: 'B5', v: true},{k: 'B6', v: true},
        {k: 'C1', v: false},{k: 'C2', v: true},{k: 'C3', v: true},
        {k: 'C4', v: true},{k: 'C5', v: true},{k: 'C6', v: true},
        {k: 'D1', v: true},{k: 'D2', v: true},{k: 'D3', v: true},
        {k: 'D4', v: true},{k: 'D5', v: true},{k: 'D6', v: true},
        {k: 'E1', v: true},{k: 'E2', v: true},{k: 'E3', v: true},
        {k: 'E4', v: true},{k: 'E5', v: true},{k: 'E6', v: true},
        {k: 'F1', v: true},{k: 'F2', v: true},{k: 'F3', v: true},
        {k: 'F4', v: true},{k: 'F5', v: true},{k: 'F6', v: true}]



    const colorCode = (number,value) => {
        let colorClass
        if (value === false) {
            colorClass = "booked"
        } else if (number[0] === "A" || number[0] === "B") {
            colorClass = "businessClass"
        } else { colorClass = "economyClass"}
        return colorClass
    }

    const pointerOrNot = (v) => {
        let cursor = 'not-allowed'
        if (v === true) {
            cursor = 'pointer'
        }return cursor;
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
                        {item.k.charAt(1) === '4' ?
                            <span>&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;</span> :''}

                            <span className="wrapper">
                                <Tooltip title={item.k} className="toolTip" placement="right">
                                    <Avatar  style={{cursor:pointerOrNot(item.v)}}
                                             variant="square" className={colorCode(item.k, item.v)}>
                                        <Link className="linkStyle" to={`/booked/details/${flight._id}/${item.k}`}>{item.k}</Link>
                                    </Avatar>
                                </Tooltip>
                             </span>
                        </span>
                    </Fragment>
                        )})
            }
        </div>
    )
}