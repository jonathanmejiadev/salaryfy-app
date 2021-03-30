import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/private-route/PrivateRoute';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import DashboardRouter from './DashboardRouter';

const AppRouter = () => {

    const [auth, setAuth] = useState({
        isAuth: false,
        userAuth: ''
    });
    //const [isAuth, setIsAuth] = useState(false);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            <Router>
                <div>
                    <Switch>
                        <Route component={Login} exact path="/login" />
                        <Route component={Register} exact path="/register" />
                        <PrivateRoute component={DashboardRouter} path="/" isAuth={auth.isAuth} />
                    </Switch>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default AppRouter
