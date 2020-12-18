import React, {useEffect, useState} from "react";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";

export const AirportCreatePage = () => {
    const message = useMessage()
    const {loading,request,error,clearError} = useHttp()
    const [form, setForm] = useState({
        name: '', country: '', city: ''
    })

    const createHandler = async () => {
        try {
            const data = await request('/api/airport/create', 'POST', {...form})
            message(data.message)
        }catch (e) {
            message(error)
        }
    }
    const changeHandler = event => {
        setForm({...form,[event.target.name]: event.target.value})
    }

    useEffect(()=>{
        message(error)
        clearError()
    },[error,message,clearError])

    return (

        <div className="row">
            <h2>Добавить аэропорт</h2>
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <input id="name"
                               type="text"
                               name="name"
                               onChange = {changeHandler}/>
                        <label htmlFor="input_text">Название аэропорта</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="country"
                               type="text"
                               name="country"
                               onChange = {changeHandler}/>
                        <label htmlFor="input_text">Страна</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="city"
                               type="text"
                               name="city"
                               onChange = {changeHandler}/>
                        <label htmlFor="input_text">Город</label>
                    </div>
                </div>
                <button className="waves-effect blue btn"
                        onClick={createHandler}
                        disabled = {loading}>
                    Добавить
                </button>
            </form>
        </div>
    )
}
