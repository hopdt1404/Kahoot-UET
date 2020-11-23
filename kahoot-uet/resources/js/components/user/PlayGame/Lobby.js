import React, { useState } from "react";
import { Link } from "react-bootstrap-icons";

import LogoLobby from "../../../images/logo_kahoot.png";
import { LockFill, UnlockFill, PersonFill } from "react-bootstrap-icons";

import "./playgame.css";

function Lobby() {
    const [isLock, setIsLock] = useState(false);
    const [pin, setPin] = useState(Math.floor(Math.random() * 1000000));
    const [countPlayers, setCountPlayers] = useState(0);
    const [players, setPlayers] = useState([]);

    const handleLockRoom = () => {
        if (isLock == true) {
            setIsLock(false);
        } else if (isLock == false) {
            setIsLock(true);
        }
    };

    const handleStartGame = () => {
        // handle with database
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
                        {countPlayers}
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
                                disabled={countPlayers == 0 ? "true" : false}
                                onClick={handleStartGame}
                            >
                                Start
                            </button>
                        </div>
                    </div>
                </div>
                <div className="players">
                    {countPlayers == 0 ? (
                        <div className="wait-players">
                            <span className="span-wait">
                                Waiting for players...
                            </span>
                        </div>
                    ) : (
                        <h1>Players</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Lobby;
