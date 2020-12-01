import React, { useEffect, useState, useRef } from "react";
import IndexPlayer from "./IndexPlayer";
import socketIOClient from "socket.io-client";
import { Redirect } from "react-router";
const LOADING = "loading";

function StartPlayer(props) {
    const player = props.location.data.player;
    const roomId = props.location.data.roomId;
    const [isLoaded, setIsLoaded] = useState(false);
    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = socketIOClient("http://localhost:4000", {
            query: { roomId }
        });
        socketRef.current.on(LOADING, loaded => {
            if (loaded) {
                setIsLoaded(true);
                socketRef.current.emit(LOADING, true);
            }
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    return (
        <div>
            {isLoaded && (
                <Redirect
                    to={{
                        pathname: "/player/getready",
                        data: { roomId: roomId, player: player }
                    }}
                ></Redirect>
            )}
            <IndexPlayer roomId={roomId} player={player} />
            <div className="lobby-main start-main">
                <div className="text-1">Get Ready!</div>
                <div className="loader"></div>
                <div className="text-2">Loading...</div>
            </div>
        </div>
    );
}

export default StartPlayer;
