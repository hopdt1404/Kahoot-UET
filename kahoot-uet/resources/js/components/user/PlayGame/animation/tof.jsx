import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Circle, DiamondFill, Square, Triangle } from "react-bootstrap-icons";
import "./style.css";
import socketIOClient from "socket.io-client";
import { Redirect } from "react-router";
const SHOW_OPTION = "showOption";
const SEND_QUESTION = "sendQuestion";
function Tof(props) {
    const [redirect, setRedirect] = useState(false);
    const socketRef = useRef();
    const roomId = props.roomId;
    const question = props.question;
    const length = props.length;
    const orderNumber = props.orderNumber;
    console.log(roomId);
    useEffect(() => {
        socketRef.current = socketIOClient("http://localhost:4000", {
            query: { roomId }
        });
        socketRef.current.emit(SEND_QUESTION, question, roomId, length, orderNumber);
        socketRef.current.on(SHOW_OPTION, (show) => {
            setRedirect(show);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    return (
        <div
            style={{
                backgroundColor: "#ff0000a8",
                width: "100vw",
                height: "100vh"
            }}
        >
            {redirect && (
                <Redirect
                    to={{
                        pathname: "/user/controller/gameblock",
                        data: { roomId: roomId, stage: "showQuestion" }
                    }}
                />
            )}
            {
                <div className="layout">
                    <div className="currentQuestion">
                        {`${orderNumber} of ${length}`}
                    </div>
                </div>
            }
            <div className="qBlock">
                <div className="animation-tkt">
                    <div className="quizShadow">
                        <div className="quizAnimation">
                            <div className="signature" id="triangle">
                                <Triangle />
                            </div>
                            <div className="signature" id="diamond">
                                <DiamondFill />
                            </div>
                        </div>
                    </div>
                    <div className="quizText">True or False</div>
                </div>
            </div>
            <div className="qBlock2">
                <div className="question">{props.question.questionContent}</div>
            </div>
            <div className="loading-tkt"></div>
        </div>
    );
}

export default Tof;
