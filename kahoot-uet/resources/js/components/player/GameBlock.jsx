import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

import { TriangleFill, SquareFill } from "react-bootstrap-icons";
import IndexPlayer from "./IndexPlayer";
import { Redirect } from "react-router";

function GameBlock(props) {
    const question = props.location.data.question;
    const player = props.location.data.player;
    const playerId = props.location.data.id;
    const roomId = props.location.data.roomId;
    const orderNumber = props.location.data.orderNumber;
    const [score, setScore] = useState(props.location.data.score);
    const length = props.location.data.length;
    const socketRef = useRef();
    const [counter, setCounter] = useState(question.timeLimit);
    const [redirect, setRedirect] = useState(null);
    const [isCorrect, SetIsCorrect] = useState(null);
    useEffect(() => {
        socketRef.current = socketIOClient("http://localhost:4000", {
            query: { roomId }
        });
        socketRef.current.on("skipQuestion", (skip) => {
            SetIsCorrect(false);
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    useEffect(() => {
        const setTimeOut = setTimeout(() => {
            setCounter(counter - 1);
        }, 1000);
        if (counter < 1) {
            clearTimeout(setTimeOut);
        }
        return () => {
            clearTimeout(setTimeOut);
        };
    }, [counter]);
    const handleSubmit = numberOfAmswer => {
        if (question.answers[numberOfAmswer].correct == true) {
            SetIsCorrect(true);
            setScore(score + (question.points * counter) / question.timeLimit);
        } else {
            SetIsCorrect(false);
        }

        socketRef.current.emit(
            "sendScore",
            roomId,
            playerId,
            score,
            numberOfAmswer
        );
        setRedirect("showResult");
    };

    return (
        <div>
            {isCorrect != null && (
                <Redirect
                    to={{
                        pathname: "/player/answer/result",
                        data: {
                            orderNumber: orderNumber,
                            length: length,
                            roomId: roomId,
                            id: playerId,
                            score: score,
                            player: player,
                            isCorrect: isCorrect
                        }
                    }}
                />
            )}
            <IndexPlayer
                roomId={roomId}
                player={player}
                length={length}
                indexNumber={orderNumber}
                score={score}
            />
            <div class="game-block-main">
                <div class="row justify-content-md-center text-center">
                    <div
                        class="col-md-5 common-button game-block-red"
                        onClick={() => handleSubmit(0)}
                    >
                        {/* <span className="triangle"></span> */}
                    </div>
                    <div
                        class="col-md-5 common-button game-block-blue"
                        onClick={() => handleSubmit(1)}
                    >
                        {/* <span className="rhombus-1"></span> */}
                    </div>
                    <div
                        class="col-md-5 common-button game-block-yellow"
                        onClick={() => handleSubmit(2)}
                    >
                        {/* <span className="circle"></span> */}
                    </div>
                    <div
                        class="col-md-5 common-button game-block-green"
                        onClick={() => handleSubmit(3)}
                    >
                        {/* <span className="square"></span> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameBlock;
