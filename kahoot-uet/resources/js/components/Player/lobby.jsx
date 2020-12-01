import React from "react";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { Link, Redirect } from "react-router-dom";
import { setAnswer } from "../../actions/list";
const SOCKET_SERVER_URL = "http://localhost:4000";
const VALIDATE_ROOM = "validatRoom";
const ADD_PLAYER = "addPlayer";
// import "./Home.css";

const Lobby = () => {
    const [roomId, setRoomId] = React.useState("");
    const [playerName, setPlayerName] = React.useState("");
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [accept, setAccept] = React.useState(false);
    const socketRef = useRef();

    useEffect(() => {
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL);
        socketRef.current.on(VALIDATE_ROOM, isAccept => {
            setAccept(isAccept);
            isAccept && console.log(`accept to ${roomId}`);
        });
        socketRef.current.on(ADD_PLAYER, isSuccess => {
            setIsSuccess(isSuccess);
            isSuccess && console.log(`added ${playerName} to ${roomId}`);
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    const handleChange = event => {
        if (!accept) {
            setRoomId(event.target.value);
        } else {
            setPlayerName(event.target.value);
        }
    };
    const handleSubmit = () => {
        if(!accept){
            socketRef.current.emit(VALIDATE_ROOM, roomId);
            console.log("VALIDATE ROOM", roomId);
        }else{
            socketRef.current.emit(ADD_PLAYER, {name:playerName,room:roomId});
            console.log("ADD PLAYER", playerName);
        }
    };
    return (
        <div className="home-container">
            {!accept && (
                <input
                    type="number"
                    placeholder="Room"
                    value={roomId}
                    onChange={handleChange}
                    className="text-input-field"
                />
            )}
            {accept && (
                <input
                    type="text"
                    placeholder="Player Name"
                    value={playerName}
                    onChange={handleChange}
                    className="text-input-field"
                />
            )}
            <button onClick={() => handleSubmit()}>Join</button>

            {isSuccess && <Redirect to={`/player/${roomId}`}></Redirect>}
        </div>
    );
};

export default Lobby;
