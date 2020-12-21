import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {FlightCreatePage} from "./pages/FlightCreatePage";
import {AirportCreatePage} from "./pages/AirportCreatePage";
import {AuthPage} from "./pages/AuthPage";
import {AirportShowPage} from "./pages/AirportShowPage";
import {HomePage} from "./pages/HomePage";
import {SeatMapPage} from "./pages/SeatMapPage";
import {BookedPage} from "./pages/BookedPage";
import {FlightShowPage} from "./pages/FlightShowPage";
import {BookingShowPage} from "./pages/BookingShowPage";


export const useRoutes = isAuthenticated => {   //флаг о решистрации пользователя
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/auth" exact>
                    <AuthPage/>
                </Route>
                <Route path="/airport/create" >
                    <AirportCreatePage/>
                </Route>
                <Route path="/airport/all">
                    <AirportShowPage/>
                </Route>
                <Route path="/flight/all">
                    <FlightShowPage/>
                </Route>
                <Route path="/flight/create" >
                    <FlightCreatePage/>
                </Route>
                <Route path="/booked/all">
                    <BookingShowPage/>
                </Route>
                <Route path="/home/find">
                    <HomePage/>
                </Route>
                <Route path="/home/seatMap/:id">
                    <SeatMapPage/>
                </Route>

                <Route path="/booked/details/:id/:k">
                    <BookedPage/>
                </Route>
                <Redirect to="/home/find"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}