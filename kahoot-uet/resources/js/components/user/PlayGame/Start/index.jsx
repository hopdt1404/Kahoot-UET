import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import Countdown from "../animation/countdown";
import Quiz from "../animation/quiz";
import TrueFalse from "../animation/tof";
import { Redirect } from "react-router";
import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:4000";
const LOADING = "loading";
function Start(props) {
    const roomId = props.location.data.roomId;
    // const testName = useSelector((state) => state.summary.title);
    // const questionList = useSelector((state) => state.list.qlist);
    const [count, setCount] = useState(3);
    const [stage, setStage] = useState(1);
    const testName = "TEST NAME";
    const socketRef = useRef();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId }
        });

        // socketRef.current.on(LOADING, (loaded) => {
        //     if(loaded) setIsLoaded(true);
        // });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    useEffect(() => {
        const set_timeout = setTimeout(() => {
            setCount(count - 1);
            if (count < 2) {
                setStage(stage + 1);
                setCount(3);
            }
        }, 1000);
        if (stage > 2) {
            handleRedirect();
            clearTimeout(set_timeout);
        }
        return () => {
            clearTimeout(set_timeout);
        };
    }, [count]);
    const handleRedirect = () => {
        socketRef.current.emit(LOADING, roomId);
        setIsLoaded(true);
    };
    return (
        <div
            className="start"
            // style={{ backgroundColor: stage > 2 && "#ff0000a8" }}
        >
            {stage < 3 && (
                <div className="layout">
                    <svg className="square">
                        <rect />
                    </svg>
                    <svg className="circle">
                        <circle />
                    </svg>
                </div>
            )}
            
            <div className="animation">
                {stage == 1 && <div className="test_name">{testName}</div>}
                {stage == 2 && <Countdown count={count} />}
                {/* {stage > 2 && handleRedirect()} */}
                {isLoaded && (
                    <Redirect
                        to={{
                            pathname: "/user/controller/gameblock",
                            data: { roomId: roomId , stage: "loading"}
                        }}
                    />
                )}
                {/* {stage > 2 && questionList[stage-3].questionType === "Quiz" && <Quiz/>} */}
                {/* {stage > 2 && questionList[stage-3].questionType !== "Quiz" && <TrueFalse/>} */}
            </div>
        </div>
    );
}

export default Start;
