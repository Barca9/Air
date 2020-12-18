import React, {useContext} from "react"
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";

export const Navbar = ()=>{
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event=>{
        event.preventDefault()   //для того что бы ссылка не отрабатывалась
        auth.logout()
        history.push('/')
    }
    return (
    <nav>
        <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
            <span className="brand-logo">Air</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/booked/all">Бронирования</NavLink></li>
                <li><NavLink to="/airport/all">Аэропорты</NavLink></li>
                <li><NavLink to="/flight/all">Рейсы</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
            </ul>
        </div>
    </nav>
    )
}