import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
//import PrivateRoute from '../components/private-route/PrivateRoute';
import Dashboard from '../pages/dashboard/Dashboard';
import History from '../pages/history/History';
import Job from '../pages/job/Job';

const DashboardRouter = () => {

    //const [isAuth, setIsAuth] = useState(true);

    return (
        <>
            <Navbar />
            <Switch>
                <Route component={Job} exact path="/job/:id" />
                <Route component={History} exact path="/history" />
                <Route component={Dashboard} exact path="/" />
                <Redirect to="/" />
            </Switch>
        </>
    )
}

export default DashboardRouter;