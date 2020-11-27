import React, {useEffect} from 'react';

import axios from 'axios';

function LobbyPlayer(props) {

    useEffect(() => {
       axios.get('http://127.0.0.1:8000/api/topic')
           .then((res) => {
               console.log(res.data);
           })
    });

    return (
        <div className="main-lobby">
            <div className="header-lobby">
                dajnsd
            </div>
            <div className="body-lobby">
asjdsnd 
            </div>
        </div>
    );
}

export default LobbyPlayer;