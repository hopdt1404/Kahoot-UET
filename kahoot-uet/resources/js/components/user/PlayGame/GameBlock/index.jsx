import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { changeQuestion, updatePlayer } from "../../../../actions/fakeList";
import Quiz from "../animation/quiz";
import TrueFalse from "../animation/tof";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";
function GameBlock(props) {
    const roomId = props.location.data.roomId;
    const stage = props.location.data.stage;
    const socketRef = useRef();
    const dispatch = useDispatch();
    // const testName = useSelector((state) => state.summary.title);
    const questionList = useSelector(state => state.fake.listQuestion);
    const currentQuestion = useSelector(state => state.fake.currentQuestion);
    const testName = "TEST NAME";
    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL);
        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    const handleChangeQuestion = () => {
        console.log("CLICKKKKKKK");
        const action = changeQuestion(currentQuestion+1);
        dispatch(action);
    }
    return (
        <div className="start">
            {stage=="loading" && <Quiz roomId={roomId} orderNumber={currentQuestion+1} length={questionList.length} question={questionList[currentQuestion].questionContent} />}
            {stage=="showQuestion" && <div></div>}
            
            
            
            
            
            {/* <button onClick={() => handleChangeQuestion() }>Next</button>
            {JSON.stringify(questionList[currentQuestion])}
            {JSON.stringify(currentQuestion)} */}
        </div>
    );
}

export default GameBlock;
