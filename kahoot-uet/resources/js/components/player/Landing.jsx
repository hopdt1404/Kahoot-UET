import Logo from "../.././images/logo_kahoot.png";
import React from "react";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { Link, Redirect } from "react-router-dom";
import { setAnswer } from "../../actions/list";
const SOCKET_SERVER_URL = "http://localhost:4000";
const VALIDATE_ROOM = "validateRoom";
const ADD_PLAYER = "addPlayer";
// import "./Home.css";

const Landing = () => {
    const [roomId, setRoomId] = React.useState("");
    const [invalidRoomId, setInvalidRoomId] = React.useState(false);
    const [playerName, setPlayerName] = React.useState("");
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [accept, setAccept] = React.useState(false);
    const socketRef = useRef();

    useEffect(() => {
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL);
        socketRef.current.on(VALIDATE_ROOM, isAccept => {
            setAccept(isAccept);
            setInvalidRoomId(!isAccept);
            isAccept && console.log(`accepted`);
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
        if (!accept) {
            socketRef.current.emit(VALIDATE_ROOM, roomId);
            console.log("VALIDATE ROOM", roomId);
        } else {
            socketRef.current.emit(ADD_PLAYER, {
                name: playerName,
                room: roomId,
                score: 0,
                playerId: socketRef.current.id
            });
            console.log("ADD PLAYER", playerName);
        }
    };

    return (
        <div>
            {accept === false ? (
                <div className="animation-color play">
                    <div className="play-logo">
                        <img src={Logo} width="300px" height="100px" />
                    </div>
                    <div className="play-form">
                        <input style={{border:invalidRoomId?"red solid":"white solid"}}
                            type="number"
                            placeholder="Game PIN"
                            className="play-input"
                            value={roomId}
                            onChange={handleChange}
                        ></input>
                        <button
                            type="button"
                            onClick={() => handleSubmit()}
                            className="play-submit"
                        >
                            Enter
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animation-color play">
                    <div className="play-logo">
                        <img src={Logo} width="300px" height="100px" />
                    </div>
                    <div className="play-form">
                        <input
                            type="text"
                            className="play-input"
                            placeholder="Your Name"
                            value={playerName}
                            onChange={handleChange}
                        ></input>
                        {/* <Link to="/player/lobby"> */}
                        <button
                            type="button"
                            onClick={() => handleSubmit()}
                            className="play-submit"
                        >
                            Ok, Go!
                        </button>
                        {/* </Link> */}
                    </div>
                </div>
            )}
            {isSuccess && <Redirect to={{pathname:`/player/lobby/${roomId}`, data: {player: playerName}}}></Redirect>}
        </div>
    );
};

export default Landing;
