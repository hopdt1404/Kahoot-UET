import React, { useState, useEffect, useRef } from "react";
import IndexPlayer from "./IndexPlayer";
import socketIOClient from "socket.io-client";
import { Redirect } from "react-router";
import { set } from "lodash";
const SEND_QUESTION = "sendQuestion";
const SHOW_OPTION = "showOption";
function GetReadyPlayer(props) {
    const player = props.location.data.player;
    const roomId = props.location.data.roomId;
    const [counter, setCounter] = useState(5);
    const [labelCounter, setLabelCounter] = useState("");
    const socketRef = useRef();
    const [question, setQuestion] = useState({});
    const [length, setLength] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    useEffect(() => {
        socketRef.current = socketIOClient("http://localhost:4000", {
            query: { roomId }
        });
        socketRef.current.on(
            SEND_QUESTION,
            (question, roomId, length, orderNumber) => {
                console.log(question, roomId, length, orderNumber);
                setQuestion(question);
                setOrderNumber(orderNumber);
                setLength(length);
            }
        );
        socketRef.current.emit(SHOW_OPTION, roomId, counter);
        return () => {
            socketRef.current.disconnect();
        };
    }, [counter]);
    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    useEffect(() => {
        switch (counter) {
            case 5:
                setLabelCounter("Ready...");
                break;
            case 4:
                setLabelCounter("Ready...");
                break;
            case 3:
                setLabelCounter("Ready...");
                break;
            case 2:
                setLabelCounter("Set...");
                break;
            case 1: {
                setLabelCounter("Go!");
                break;
            }
            default:
                break;
        }
    }, [counter]);

    return (
        <div>
            {counter == 0 && (
                <Redirect
                    to={{
                        pathname: "/player/gameblock",
                        data: {
                            question: question,
                            orderNumber: orderNumber,
                            length: length,
                            roomId: roomId
                        }
                    }}
                />
            )}
            <IndexPlayer
                roomId={roomId}
                player={player}
                length={length}
                indexNumber={orderNumber}
            />
            <div className="lobby-main get-ready-main">
                <div className="text-1">Question 1</div>
                <div className="get-ready-countdown">
                    <div className="counter">{counter}</div>
                </div>
                <div className="text-2">{labelCounter}</div>
            </div>
        </div>
    );
}

export default GetReadyPlayer;
