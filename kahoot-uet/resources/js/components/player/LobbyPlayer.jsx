import React, {useEffect} from "react";
import IndexPlayer from "./IndexPlayer";
import axios from 'axios';

function LobbyPlayer() {

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/auth/topic')
        .then((res) => {
            console.log(res);
        }).catch( (err) => {
            console.log(err);
        })
    })

    return (
        <div>
            <IndexPlayer />
            <div className="lobby-main">
                <h1 className="text-1">You're in!</h1>
                <h3 className="text-2">See you nickname on screen?</h3>
            </div>
        </div>
    );
}

export default LobbyPlayer;