import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import Home from "../components/user/Home";
import Reports from "../components/user/Reports";
import Kahoots from "../components/user/Kahoots";
import Creator from "../components/user/Creator";
import Login from "../components/user/Login";
import Header from '../components/user/Header';
import Register from '../components/user/Login/Register/Register'
import Forget from '../components/user/Login/Forget/Forget'
import AccountType from '../components/user/Login/AccountType/AccountType'
import ResetPassword from '../components/user/Login/ResetPassword/ResetPassword'
import ActiveAccount from '../components/user/Login/ActiveAccount/ActiveAccount'

function RouterPath() {
    return (
        <main>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/kahoots" component={Kahoots} />
                <Route exact path="/user-reports" component={Reports} />
                <Route exact path="/creator" component={Creator} />
                <Route path="/auth/login" component={Login} />
                <Route path="/Register/signup-options/:organization" component={Register} /> 
                <Route path="/auth/forgot-password" component={Forget} />
                <Route path="/Register" component={AccountType} />
                <Route path="/auth/reset-password/:token" component={ResetPassword} />
                <Route path="/auth/signup/active-account/:email" component={ActiveAccount} />
            </Switch>
        </main>
    );
}

export default RouterPath;
