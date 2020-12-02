import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

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
import Settings from "../components/user/Settings";
import OptionGame from "../components/user/PlayGame/Option";
import Lobby from "../components/user/PlayGame/Lobby";
import Start from "../components/user/PlayGame/Start"
import ErrorPage from "../components/error/ErrorPage";
import GameBlockController from "../components/user/PlayGame/GameBlock";
// import Fake from "../components/user/PlayGame/Fake";

//player
import Topic from "../components/user/Kahoots/Topic/Topic";
import PinInput from "../components/player/PinInput";
import NameInput from "../components/player/NameInput";
import IndexPlayer from "../components/player/IndexPlayer";


import LobbyPlayer from "../components/player/LobbyPlayer";
import StartPlayer from "../components/player/StartPlayer";
import GetReadyPlayer from "../components/player/GetReadyPlayer";
import AnswerSentPlayer from "../components/player/AnswerSentPlayer";
import AnswerResultPlayer from "../components/player/AnswerResultPlayer";
import Ranking from "../components/player/Ranking.jsx";
import GameBlock from "../components/player/GameBlock";

import ReportDetail from "../components/user/Reports/Detail/Detail"
import Landing from "../components/player/Landing";
 
 
/**
 * Test
 */
import lobby from "../components/Player/lobby";
import start from "../components/Player/start";










//delete
import Quiz from '../components/user/PlayGame/animation/quiz';
function RouterPath() {
    return (
        <Router>
            <Switch>
                {/* Host */}
                {/* <Route exact path="/" component={Quiz} /> */}




                <Route exact path="/" component={Home} />
                <Route exact path="/kahoots" component={Kahoots} />
                <Route exact path="/user-reports" component={Reports} />
                <Route exact path="/kahoots/detail/:id_topic" component={Topic} />
                <Route exact path="/user-reports/detail/:id" component={ReportDetail} />
                <Route exact path="/creator" component={Creator} />
                <Route path="/auth/login" component={Login} />
                <Route path="/Register/signup-options/:organization" component={Register} /> 
                <Route path="/auth/forgot-password" component={Forget} />
                <Route path="/Register" component={AccountType} />
                <Route path="/auth/reset-password/:token" component={ResetPassword} />
                <Route path="/auth/signup/active-account/:email" component={ActiveAccount} />
                <Route path="/user-reports" component={Reports} />
                <Route path="/creator" component={Creator} />
                <Route path="/settings" component={Settings} />
                <Route path="/auth/login" component={Login} />
                {/* In Game - erroring */}
                <Route exact path={`/user/:id_topic`} component={OptionGame} />
                <Route path={`/user/lobby/:id_topic`} component={Lobby} />
                <Route exact path="/user/start" component={Start} />
                {/* Player */}
                <Route path="/player/lobby" exact component={LobbyPlayer} />
                <Route path="/user/gameblock" component={GameBlock} />  
                {/* Player */}
                <Route path="/pin-player" component={PinInput} />
                <Route path="/name-player" component={NameInput} />
                {/* <Route exact path="/playe-r" component={IndexPlayer} /> */}
                <Route path="/player/lobby/:roomId" component={LobbyPlayer} />
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
                <Route path="/test1111" component={Ranking} />

                /* Test */
                <Route exact path="/player" component={Landing}/>
                <Route exact path="/user/controller/gameblock" component={GameBlockController}/>
                
                {/* <Route path="/player/:roomId" component={start}/> */}
                {/* <Route path */}
                <Route path="*" component={ErrorPage} />
            </Switch>
        </Router>
    );
}

export default RouterPath;