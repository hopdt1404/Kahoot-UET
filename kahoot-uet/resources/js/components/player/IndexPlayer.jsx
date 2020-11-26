import React, { useState } from 'react';

import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import LobbyPlayer from './LobbyPlayer';
import StartPlayer from './StartPlayer';
import GetReadyPlayer from './GetReadyPlayer';
import AnswerSentPlayer from './AnswerSentPlayer';
import AnswerResultPlayer from './AnswerResultPlayer';
import Ranking from './Ranking';

function IndexPlayer(props) {

    let { path, url } = useRouteMatch();
    const [test, setTest] = useState(5);

    return (
        <div className="index-main">
            <div className="index-header">
                <div className="index-pin">
                    PIN: 2731321
                </div>
                <div className="index-number-topic">
                    10 of 20
                </div>
                <div className="index-name-player">
                    aaa
                </div>
                <div className="index-score-player">
                    1111
                </div>
            </div>
            {/* <div className="index-body">
                <ul style={{backgroundColor: "white"}}>
                    <Link to={`${url}/lobby`}><h3>Lobby Player</h3></Link>
                    <Link to="/player/start"><h3>Start</h3></Link>
                    <Link to="/player/getready"><h3>Get Ready</h3></Link>
                    <Link to="/player/answer/sent"><h3>Answer Sent</h3></Link>
                    <Link to="/player/answer/result"><h3>Answer Result</h3></Link>
                    <Link to="/player/ranking"><h3>Ranking</h3></Link>
                </ul>
            </div>

            <Switch>
            <Route path={`${path}/lobby`} exact component={LobbyPlayer} />

            </Switch> */}

            {/* <Switch>
                <Route path="/lobby" exact component={LobbyPlayer} />
                <Route path="/start"  component={StartPlayer} />
                <Route path="/getready"  component={GetReadyPlayer} />
                <Route path="/answer/sent" exact component={AnswerSentPlayer} />
                <Route path="/answer/result"  component={AnswerResultPlayer} />
                <Route path="/ranking"  component={Ranking} />
            </Switch> */}
        </div>
    );
}

export default IndexPlayer;