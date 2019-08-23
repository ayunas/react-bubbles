import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export function PrivateRoute(props) {
    console.log(props);
    if (localStorage.getItem('token')) {
        return <Route path='/' component={props.component} />
    } else {
        return <Redirect to="/login"/>
    }
}


