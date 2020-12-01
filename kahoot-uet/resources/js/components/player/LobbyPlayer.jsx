import React, {useEffect, useState} from "react";
import IndexPlayer from "./IndexPlayer";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

function LobbyPlayer() {

    

    // const pin = useSelector((state) => state.playGame.selectedPin);
    // console.log(pin);

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
