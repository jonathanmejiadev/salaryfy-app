import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
        if (localStorage.getItem('user')) {
            return <Component />
        } else {
            return (<Redirect to="/login" />)
        };
    }} />
};

export default PrivateRoute;
