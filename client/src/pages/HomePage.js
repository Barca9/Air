import React, {useCallback, useEffect, useState} from "react";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

export const HomePage = () => {
    const message = useMessage()
    const [airports, setAirports] = useState()
    const [dataFlights, setDataFlights] = useState()
    const {loading, request, error} = useHttp()
    const [form, setForm] = useState({
        firstDate: '', secondDate: '', selectAirportDeparture: '', selectAirportArrival: ''
    })

    const [dateFirst, setDateFirst] = useState(new Date());
    const [dateSecond, setDateSecond] = useState(new Date());


    const fetchAirports = useCallback(async () => {
        try {
            const fetched = await request('/api/airport/all', 'GET', null, {})
            setAirports(fetched)
        } catch (e) {
            e.message()

        }
    }, [request])

    useEffect(() => {
        fetchAirports()
        message(error)
    }, [fetchAirports, message, error])


    const findHandler = async () => {
        try {
            const data = await request(`/api/home/find`, 'POST', {...form}, {})
            setDataFlights(data)
        } catch (e) {
            e.message()
            console.log(e)
        }
    }

    const dateProcessorFirst = (date, name) => {
        setDateFirst(date)
        setForm({...form, [name]: date})
    }
    const dateProcessorSecond = (date, name) => {
        setDateSecond(date)
        setForm({...form, [name]: date})
    }

    return (
        <div>
            <div className="row">
                <h3>Страница поиска рейсов</h3>
                <form className="col s12">
                    <div className="col s6">
                        <Autocomplete
                            id="combo-box-demo"
                            options={airports}
                            getOptionLabel={(option) => option.name}
                            renderOption={(option) => (
                                <React.Fragment>
                                    {option.country}, {option.city}, {option.name}
                                </React.Fragment>
                            )}
                            style={{width: 300}}
                            onChange={(event, value) =>
                                setForm({...form, "selectAirportDeparture": value})}
                            autoSelect={true}
                            name="selectAirportDeparture"
                            renderInput={(params) => <TextField {...params}
                                                                label="Откуда"
                                                                name="selectAirportDeparture"
                                                                variant="outlined"/>}
                        />
                    </div>
                    <div className="col s6">
                        <Autocomplete
                            id="combo-box-demo"
                            options={airports}
                            getOptionLabel={(option) => option.name}
                            renderOption={(option) => (
                                <React.Fragment>
                                    {option.country}, {option.city}, {option.name}
                                </React.Fragment>
                            )}
                            style={{width: 300}}
                            onChange={(event, value) =>
                                setForm({...form, "selectAirportArrival": value})}
                            autoSelect={true}
                            name="selectAirportArrival"
                            renderInput={(params) => <TextField {...params}
                                                                label="Куда"
                                                                name="selectAirportArrival"
                                                                variant="outlined"/>}
                        />
                    </div>
                    <div className="row">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="firstDate"
                                    label="Искать рейс с числа"
                                    format="dd/MM/yyyy"
                                    value={dateFirst}
                                    onChange={(date) => dateProcessorFirst(date, "firstDate")}
                                />
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="secondDate"
                                    label="по число"
                                    format="dd/MM/yyyy"
                                    value={dateSecond}
                                    onChange={(date) => dateProcessorSecond(date, "secondDate")}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                    <button className="waves-effect blue btn"
                            onClick={findHandler}
                            disabled={loading}>
                        Найти подходящие рейсы
                    </button>
                </form>
                {dataFlights ? (
                    dataFlights.map((flight) => {
                        return (
                            <div className="row">
                                <div className="col s12">
                                    <div className="card blue-grey darken-1">
                                        <div className="card-content white-text">
                                            <span className="card-title">Время вылета: {(new Date(flight.departureDate)).toLocaleTimeString()}</span>
                                            <span className="card-title">Время прилёта: {(new Date(flight.arrivalDate)).toLocaleTimeString()}</span>
                                            <p> {flight.airportDeparture.name} - {flight.airportArrival.name}</p>
                                            <p>Цена за место в бизнес-классе: {flight.priceBClass}</p>
                                            <p>Цена за место в эконом-классе: {flight.priceEClass}</p>
                                        </div>
                                        <div className="card-action">
                                            <Link to={`./seatMap/${flight._id}`}>Выбрать место</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })) : (" ")
                }
            </div>
        </div>
    )
}