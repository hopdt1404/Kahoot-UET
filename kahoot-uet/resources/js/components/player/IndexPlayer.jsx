import React, { useEffect, useState } from 'react';

import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import LobbyPlayer from './LobbyPlayer';
import StartPlayer from './StartPlayer';
import GetReadyPlayer from './GetReadyPlayer';
import AnswerSentPlayer from './AnswerSentPlayer';
import AnswerResultPlayer from './AnswerResultPlayer';
import Ranking from './Ranking';
import axios from 'axios';

function IndexPlayer(props) {
    return (
        <div className="index-main">
            <div className="index-header">
                <div className="index-pin">
                    {`PIN: ${props.roomId}`}
                </div>
                {props.indexNumber != null && <div className="index-number-topic">
                    {`${props.indexNumber} of ${props.length}`}
                </div>}
                <div className="index-name-player">
                    {props.player}
                </div>
                {props.score != null && <div className="index-score-player">
                    {props.score}
                </div>}
            </div>
<<<<<<< HEAD
=======
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
>>>>>>> d33fd84d3bfd26ae6a9ea481bb46abe62257b645
        </div>
    );
}

export default IndexPlayer;