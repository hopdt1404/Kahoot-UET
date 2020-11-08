import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import Home from "../components/user/Home";
import Reports from "../components/user/Reports";
import Kahoots from "../components/user/Kahoots";
import Creator from "../components/user/Creator";
import Login from "../components/user/Login";
import Settings from "../components/user/Settings";
import OptionGame from "../components/user/PlayGame/Option";
import Lobby from "../components/user/PlayGame/Lobby";

function RouterPath() {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/kahoots" component={Kahoots} />
                <Route exact path="/user-reports" component={Reports} />
                <Route exact path="/creator" component={Creator} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/auth/login" component={Login} />
                {/* In Game */}
                {/* Erroring */}
                <Route exact path="/play-game" component={OptionGame} />
                <Route exact path="/play-game/lobby" component={Lobby} />
            </Switch>
        </main>
    );
}

export default RouterPath;
