import React, {useCallback, useEffect, useState} from "react";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export const FlightCreatePage = () => {
    const message = useMessage()
    const [airports, setAirports] = useState()
    const {loading, request, error} = useHttp()
    const [form, setForm] = useState({
        number: '', departureDate: '', arrivalDate: '', airportDeparture: '', airportArrival: ''
        , priceBClass: '', priceEClass: ''
    })
    const [selectedDateDeparture, setSelectedDateDeparture] = useState(new Date());
    const [selectedDateArrival, setSelectedDateArrival] = useState(new Date());

    const getAirports = useCallback(async () => {
        try {
            const response = await request('/api/airport/all', 'GET', null, {})
            setAirports(response)
        } catch (e) {
            e.message()
        }
    }, [request])

    useEffect(() => {
        getAirports()
        message(error)
    }, [getAirports, message, error])

    const createHandler = async () => {
        try {
            const data = await request('/api/flight/create', 'POST', {...form})
            message(data.message)
        } catch (e) {
            message(error)
            console.log(e)
        }
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const dateProcessorDeparture = (date, name) => {
        setSelectedDateDeparture(date)
        setForm({...form, [name]: date})
    }

    const dateProcessorArrival = (date, name) => {
        setSelectedDateArrival(date)
        setForm({...form, [name]: date})
    }

    return (
        <div className="row">
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <input id="number"
                               type="text"
                               name="number"
                               onChange={changeHandler}/>
                        <label htmlFor="input_text">Номер рейса</label>
                    </div>
                </div>
                <div className="row">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="departureDate"
                                label="Дата отбытия"
                                format="dd/MM/yyyy"
                                value={selectedDateDeparture}
                                onChange={(date) => dateProcessorDeparture(date, "departureDate")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="arrivalDate"
                                label="Дата прибытия"
                                format="dd/MM/yyyy"
                                value={selectedDateArrival}
                                onChange={(date) => dateProcessorArrival(date, "arrivalDate")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <Grid container justify="space-around">
                            <KeyboardTimePicker
                                margin="normal"
                                id="departureDate"
                                ampm={false}
                                label="Время отбытия"
                                value={selectedDateDeparture}
                                onChange={(date) => dateProcessorDeparture(date, "departureDate")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />

                            <KeyboardTimePicker
                                margin="normal"
                                id="arrivalDate"
                                ampm={false}
                                label="Время прибытия"
                                value={selectedDateArrival}
                                onChange={(date) => dateProcessorArrival(date, "arrivalDate")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />

                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
                <div className="row">
                    <Autocomplete
                        id="combo-box-demo"
                        options={airports}
                        getOptionLabel={(option) => option.name}
                        style={{width: 300}}
                        onChange={(event, value) =>
                            setForm({...form, "airportDeparture": value})}
                        autoSelect={true}
                        name="airportDeparture"
                        renderInput={(params) => <TextField {...params}
                                                            label="Аэропорт отбытия"
                                                            name="airportDeparture"
                                                            variant="outlined"/>}
                    />
                </div>
                <div className="row">
                    <Autocomplete
                        id="combo-box-demo"
                        options={airports}
                        getOptionLabel={(option) => option.name}
                        style={{width: 300}}
                        onChange={(event, value) =>
                            setForm({...form, "airportArrival": value})}
                        autoSelect={true}
                        name="airportArrival"
                        renderInput={(params) => <TextField {...params}
                                                            label="Аэропорт прибытия"
                                                            name="airportArrival"
                                                            variant="outlined"/>}
                    />
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="priceEClass"
                               type="text"
                               name="priceEClass"
                               onChange={changeHandler}/>
                        <label htmlFor="input_text">Цена за место в эконом-классе</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="priceBClass"
                               type="text"
                               name="priceBClass"
                               onChange={changeHandler}/>
                        <label htmlFor="input_text">Цена за место в бизнес-классе</label>
                    </div>
                </div>
                <div className="input-field col s6">
                    <button className="waves-effect blue btn"
                            onClick={createHandler}
                            disabled={loading}>
                        Добавить
                    </button>
                </div>
            </form>
        </div>
    )
}