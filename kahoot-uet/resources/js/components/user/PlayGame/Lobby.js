import React from 'react';

import SingleMode from './SingleMode';
import TeamMode from './TeamMode';

function Lobby({match}) {

    return (
        <div>
            <h3>{match.url == '/play-game/lobby/1' ? <SingleMode/> : <TeamMode/>}</h3>
        </div>
    );
}

export default Lobby;