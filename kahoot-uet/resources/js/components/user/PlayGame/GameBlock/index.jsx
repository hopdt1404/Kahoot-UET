import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { changeQuestion, updatePlayer } from "../../../../actions/fakeList";
import Quiz from "../animation/quiz";
import TrueFalse from "../animation/tof";
import socketIOClient from "socket.io-client";
import Gif from "../../../../images/play.gif";
import {
    CircleFill,
    DiamondFill,
    SquareFill,
    TriangleFill
} from "react-bootstrap-icons";
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
    const [numberOA, setNumberOA] = useState(0);
    const [timeLimit, setTimeLimit] = useState(
        questionList[currentQuestion].timeLimit
    );
    const question = questionList[currentQuestion].questionContent;
    const answer = questionList[currentQuestion].answers;
    const option = questionList[currentQuestion].answerOption;
    const image = questionList[currentQuestion].image;
    const time = questionList[currentQuestion].timeLimit;
    const point = questionList[currentQuestion].points;
    const signatures = [
        <TriangleFill />,
        <DiamondFill />,
        <CircleFill />,
        <SquareFill />,
        "red",
        "blue",
        "#d8d800",
        "green"
    ];
    const handleUpdatePlayer = (id, score) => {
        const action = updatePlayer(id, score);
        dispatch(action);
    };
    useEffect(() => {
        socketRef.current = socketIOClient("http://localhost:4000", {
            query: { roomId }
        });
        socketRef.current.on(
            "sendScore",
            (roomId, playerId, score, numberOfAnswer) => {
                setNumberOA(numberOA+1);
                handleUpdatePlayer(playerId,score);
            }
        );
        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    useEffect(() => {
        const setTimeOut = setTimeout(() => {
            setTimeLimit(timeLimit - 1);
        }, 1000);
        if (timeLimit < 1) {
            clearTimeout(setTimeOut);
            socketRef.current.emit("skipQuestion",roomId);
        }
        return () => {
            clearTimeout(setTimeOut);
        };
    }, [timeLimit]);
    const handleChangeQuestion = () => {
        const action = changeQuestion(currentQuestion + 1);
        socketRef.current.emit("skipQuestion",roomId);
        dispatch(action);
    };
    return (
        <div>
            {stage == "loading" &&
                questionList[currentQuestion].questionType == "Quiz" && (
                    <Quiz
                        roomId={roomId}
                        orderNumber={currentQuestion + 1}
                        length={questionList.length}
                        question={questionList[currentQuestion]}
                    />
                )}
            {stage == "loading" &&
                questionList[currentQuestion].questionType != "Quiz" && (
                    <TrueFalse
                        roomId={roomId}
                        orderNumber={currentQuestion + 1}
                        length={questionList.length}
                        question={questionList[currentQuestion]}
                    />
                )}
            {stage == "showQuestion" && (
                <div className="showQuestion-tkt">
                    <div className="title">
                        {questionList[currentQuestion].questionContent}
                    </div>
                    <div className="body">
                        <div className="time">{timeLimit}</div>
                        <div className="media">
                            <img
                                className="previewImage"
                                src={
                                    questionList[currentQuestion].image !== ""
                                        ? questionList[currentQuestion].image
                                        : Gif
                                }
                            />
                        </div>
                        <div className="handle">
                            <button
                                onClick={() => {
                                    handleChangeQuestion();
                                }}
                                className="skip"
                            >
                                Skip
                            </button>
                            <div className="numberOA">
                                {`${numberOA} Answers`}
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        {questionList[currentQuestion].answers.map(a => {
                            return (
                                <div
                                    className="answers"
                                    style={{
                                        backgroundColor:
                                            signatures[
                                                questionList[
                                                    currentQuestion
                                                ].answers.indexOf(a) + 4
                                            ]
                                    }}
                                >
                                    <div
                                        className="signature"
                                        style={{
                                            backgroundColor:
                                                signatures[
                                                    questionList[
                                                        currentQuestion
                                                    ].answers.indexOf(a) + 4
                                                ]
                                        }}
                                    >
                                        <div className="sSvg">
                                            {
                                                signatures[
                                                    questionList[
                                                        currentQuestion
                                                    ].answers.indexOf(a)
                                                ]
                                            }
                                        </div>
                                    </div>
                                    <div className="answer">{a.answer}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* <button onClick={() => handleChangeQuestion() }>Next</button>
            {JSON.stringify(questionList[currentQuestion])}
            {JSON.stringify(currentQuestion)} */}
        </div>
    );
}

export default GameBlock;
