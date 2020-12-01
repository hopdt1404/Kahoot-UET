import React, { useEffect, useRef, useState } from "react";
import IndexPlayer from "./IndexPlayer";
import { Redirect } from "react-router";
import socketIOClient from "socket.io-client";



const SOCKET_SERVER_URL = "http://localhost:4000";
const WAIT_TO_START = "waitToStart";

function LobbyPlayer(props) {
    const roomId = props.match.params.roomId;
    const player = props.location.data.player;
    // const { userName } = props.data;
    const [isStarted, setIsStarted] = useState(false);
    const socketRef = useRef();
    
    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId }
        });
        socketRef.current.on(WAIT_TO_START, (started) => {
            console.log(started);
            if(started){
                console.log("STARTED");
                setIsStarted(true);
            }
            else{
                console.log("WAITING");
                setIsStarted(false);
            }
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <div>
            <IndexPlayer roomId={roomId} player={player}/>
            <div className="lobby-main">
                <h1 className="text-1">You're in!</h1>
                <h3 className="text-2">See you nickname on screen?</h3>
            </div>
            { isStarted && <Redirect to={{pathname:`/player/start`,data: {player: player,roomId: roomId}}}></Redirect>}
            {/* { isStarted && <Redirect to={`/player/${roomId}`}></Redirect>} */}
        </div>
    );
}

export default LobbyPlayer;
