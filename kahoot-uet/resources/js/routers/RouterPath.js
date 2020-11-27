import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "../components/user/Home";
import Reports from "../components/user/Reports";
import Kahoots from "../components/user/Kahoots";
import Creator from "../components/user/Creator";
import Login from "../components/user/Login";
import Settings from "../components/user/Settings";
import OptionGame from "../components/user/PlayGame/Option";
import Lobby from "../components/user/PlayGame/Lobby";

import ErrorPage from "../components/error/ErrorPage";

//player
import Topic from "../components/user/Kahoots/Topic/Topic";
import PinInput from "../components/player/PinInput";
import NameInput from "../components/player/NameInput";
import IndexPlayer from "../components/player/IndexPlayer";

import Fake from "../components/user/Fake";

import LobbyPlayer from "../components/player/LobbyPlayer";
import StartPlayer from "../components/player/StartPlayer";
import GetReadyPlayer from "../components/player/GetReadyPlayer";
import AnswerSentPlayer from "../components/player/AnswerSentPlayer";
import AnswerResultPlayer from "../components/player/AnswerResultPlayer";
import Ranking from "../components/player/Ranking.jsx";
import GameBlock from "../components/player/GameBlock";

import ReportDetail from "../components/user/Reports/Detail/Detail"
 

function RouterPath() {
    return (
        <main>
            <Switch>
                {/* Host */}
                <Route exact path="/" component={Home} />
                <Route exact path="/kahoots" component={Kahoots} />
                <Route exact path="/user-reports" component={Reports} />
                <Route exact path="/kahoots/detail/:id" component={Topic} />
                <Route exact path="/user-reports/detail/:id" component={ReportDetail} />
                <Route path="/creator" component={Creator} />
                <Route path="/settings" component={Settings} />
                <Route path="/auth/login" component={Login} />
                {/* In Game - erroring */}
                <Route exact path="/user" component={OptionGame} />
                <Route path="/user/lobby" component={Lobby} />
                <Route exact path="/fake" component={Fake} />
                {/* Player */}
                <Route path="/pin-player" component={PinInput} />
                <Route path="/name-player" component={NameInput} />
                <Route exact path="/player" component={IndexPlayer} />
                <Route path="/player/lobby" exact component={LobbyPlayer} />
                <Route path="/player/start" component={StartPlayer} />
                <Route path="/player/getready" component={GetReadyPlayer} />
                <Route path="/player/gameblock" component={GameBlock} />
                <Route
                    path="/player/answer/sent"
                    component={AnswerSentPlayer}
                />
                <Route
                    path="/player/answer/result"
                    component={AnswerResultPlayer}
                />
                <Route path="/player/ranking" component={Ranking} />

                {/* Error announce */}
                <Route path="*" component={ErrorPage} />
            </Switch>
        </main>
    );
}

export default RouterPath;