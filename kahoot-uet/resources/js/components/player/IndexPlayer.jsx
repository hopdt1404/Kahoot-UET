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
        </div>
    );
}

export default IndexPlayer;