import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import socketIOClient from "socket.io-client";

import LogoLobby from "../../../images/logo_kahoot.png";
import { LockFill, UnlockFill, PersonFill } from "react-bootstrap-icons";

import "./playgame.css";
import { update } from "lodash";

const SOCKET_SERVER_URL = "http://localhost:4000";
const ADD_NEW_ROOM = "addNewRoom";
const UPDATE_PLAYERS = "updatePlayers";
const LOCK_ROOM = "lookRoom";
function Lobby() {
    const [isLock, setIsLock] = useState(false);
    const [pin, setPin] = useState(Math.floor(Math.random() * 10000000));
    const [players, setPlayers] = useState([]);
    const [startGame, setStartGame] = useState(false);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { pin }
        });
        socketRef.current.emit(ADD_NEW_ROOM, pin);
        socketRef.current.on(ADD_NEW_ROOM, isSuccess => {
            if (isSuccess) console.log(`creat new room, ${pin}`);
        });
        socketRef.current.on(UPDATE_PLAYERS, newPlayer => {
            const player = { name: newPlayer.name, room: newPlayer.room };
            setPlayers(players => [...players, player]);
            console.log(`updated list player`, newPlayer, players);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [pin]);

    const handleLockRoom = () => {
        socketRef.current.emit(LOCK_ROOM, pin);
        if (isLock == true) {
            setIsLock(false);
        } else if (isLock == false) {
            setIsLock(true);
        }
    };

    return (
        <div className="lobby">
            <div className="header">
                <div className="pin">
                    <div className="pin-text">Game PIN:</div>
                    <div className="pin-info">
                        <div className="join-at">
                            <h2>
                                Join at <strong>www.kahoot.it</strong>
                            </h2>
                        </div>
                        <div className="pin-num">
                            {isLock == false ? pin : <div>Locked</div>}
                        </div>
                    </div>
                </div>
                <div className="music"></div>
            </div>
            <div className="body">
                <div className="body-info">
                    <div className="num-players">
                        <PersonFill
                            color="white"
                            className="icons-svg"
                            style={{
                                width: "50px",
                                height: "40px"
                            }}
                        />
                        {players.length}
                    </div>
                    <div className="logo-lobby">
                        <img src={LogoLobby} width="300px" height="100px" />
                    </div>
                    <div className="lock-start">
                        <div className="is-lock">
                            <button
                                className="button-lock"
                                onClick={handleLockRoom}
                            >
                                {isLock == false ? (
                                    <UnlockFill
                                        color="black"
                                        className="icons-svg"
                                    />
                                ) : (
                                    <LockFill
                                        color="black"
                                        className="icons-svg"
                                    />
                                )}
                            </button>
                        </div>
                        <div className="is-start">
                            <button
                                className="button-lock button-start"
                                disabled={players.length == 0 ? true : false}
                                onClick={() => {
                                    setStartGame(true);
                                    console.log(startGame.toString());
                                }}
                                // onClick={()=> {socketRef.current.emit(UPDATE_PLAYERS, {name: "AAAA", room: pin}); console.log(players)}}
                            >
                                Start
                            </button>
                        </div>
                    </div>
                </div>
                <div className="players">
                    {players.length == 0 ? (
                        <div className="wait-players">
                            <span className="span-wait">
                                Waiting for players...
                                {/* {players} */}
                            </span>
                        </div>
                    ) : (
                        <div className="wait-players">
                            <span className="span-wait">
                                {/* Waiting for players... */}
                                {players.map(player => {
                                    return <div>{player.name}</div>;
                                })}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            {startGame && <Redirect to="/user/start" />}
        </div>
    );
}

export default Lobby;
