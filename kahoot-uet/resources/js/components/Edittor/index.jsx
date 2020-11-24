import React, { useEffect, useState } from "react";
import {
    CircleFill,
    DiamondFill,
    SquareFill,
    TriangleFill
} from "react-bootstrap-icons";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
    setAnswer,
    setAnswerOption,
    setCorrectAnswer,
    setImage,
    setPoints,
    setQuestionContent,
    setTimeLimit
} from "../../actions/list";
import { Alert } from "bootstrap";

function Editor() {
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

    const order = useSelector(state => state.list.order);

    const currentQuestion = useSelector(state => state.list.qlist[order]);

    const dispatch = useDispatch();

    const handleQuestionContent = content => {
        const action = setQuestionContent(content, order);
        dispatch(action);
    };

    const handleTimeLimit = timeLimit => {
        const action = setTimeLimit(timeLimit, order);
        dispatch(action);
    };

    const handleSelectPoints = points => {
        const action = setPoints(points, order);
        dispatch(action);
    };

    const handleAnswerOption = option => {
        const action = setAnswerOption(option, order);
        dispatch(action);
    };

    const handleSetImage = image => {
        if (image === "delete") {
            const action = setImage("", order);
            dispatch(action);
        } else {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const action = setImage(reader.result, order);
                dispatch(action);
            });
            reader.readAsDataURL(image);
        }
    };
    const handleSetAnswer = (answer, answeOrderNumber) => {
        const action = setAnswer(answer, order, answeOrderNumber);
        dispatch(action);
    };
    const handleSetCorrectAnswer = answeOrderNumber => {
        const action = setCorrectAnswer(order, answeOrderNumber);
        dispatch(action);
    };
    const [className, setClassName] = React.useState("hideOption");
    useEffect(() => {
        console.log(currentQuestion.answers.filter(a=>a.correct==true).length);
    }, [currentQuestion]);

    return (
        <div className="Container">
            <header>
                <input
                    type="text"
                    name="content"
                    id="content"
                    placeholder="Click to start typing your question"
                    value={`${currentQuestion.questionContent}`}
                    onChange={e => handleQuestionContent(e.target.value)}
                />
            </header>
            <main>
                <div className="left-col">
                    <div className="subOption">
                        <div className="selectTimeLimit">
                            <label>Time limit</label>
                            <br />
                            <div
                                className={`timeLimit ${className}`}
                                id="timeLimit"
                                onClick={() => {
                                    setClassName(
                                        className == "showOption"
                                            ? "hideOption"
                                            : "showOption"
                                    );
                                }}
                            >{`${currentQuestion.timeLimit} sec`}</div>
                            {className == "showOption" && (
                                <div
                                    className="optionGrid"
                                    onClick={() => {
                                        setClassName(
                                            className == "showOption"
                                                ? "hideOption"
                                                : "showOption"
                                        );
                                    }}
                                >
                                    <div
                                        id="o1"
                                        className={className}
                                        data-position="5"
                                        onClick={e => {
                                            handleTimeLimit(
                                                e.target.dataset.position
                                            );
                                        }}
                                    >
                                        5
                                    </div>
                                    <div
                                        id="o2"
                                        className={className}
                                        data-position="10"
                                        onClick={e => {
                                            handleTimeLimit(
                                                e.target.dataset.position
                                            );
                                        }}
                                    >
                                        10
                                    </div>
                                    <div
                                        id="o3"
                                        className={className}
                                        data-position="20"
                                        onClick={e => {
                                            handleTimeLimit(
                                                e.target.dataset.position
                                            );
                                        }}
                                    >
                                        20
                                    </div>
                                    <div
                                        id="o4"
                                        className={className}
                                        data-position="30"
                                        onClick={e => {
                                            handleTimeLimit(
                                                e.target.dataset.position
                                            );
                                        }}
                                    >
                                        30
                                    </div>
                                    <div
                                        id="o5"
                                        className={className}
                                        data-position="60"
                                        onClick={e => {
                                            handleTimeLimit(
                                                e.target.dataset.position
                                            );
                                        }}
                                    >
                                        60
                                    </div>
                                    <div
                                        id="o6"
                                        className={className}
                                        data-position="90"
                                        onClick={e => {
                                            handleTimeLimit(
                                                e.target.dataset.position
                                            );
                                        }}
                                    >
                                        90
                                    </div>
                                    <div
                                        id="o7"
                                        className={className}
                                        data-position="120"
                                        onClick={e => {
                                            handleTimeLimit(
                                                e.target.dataset.position
                                            );
                                        }}
                                    >
                                        120
                                    </div>
                                    <div
                                        id="o8"
                                        className={className}
                                        data-position="240"
                                        onClick={e => {
                                            handleTimeLimit(
                                                e.target.dataset.position
                                            );
                                        }}
                                    >
                                        240
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="selectPoints">
                            <label>Points</label>
                            <br />
                            <input
                                type="range"
                                name="points"
                                id="points"
                                step="1000"
                                max="2000"
                                min="0"
                                defaultValue={currentQuestion.points}
                                onChange={e => {
                                    handleSelectPoints(e.target.value);
                                }}
                            />
                        </div>
                        <div
                            className="selectAnswerOption"
                            hidden={
                                currentQuestion.questionType === "True or False"
                            }
                        >
                            <label htmlFor="answerOption">Answer options</label>
                            <br />
                            <select
                                name="answerOption"
                                id={currentQuestion.answers.filter( a => a.correct == true).length > 1 && currentQuestion.answerOption === "Single select" ? "alert": ""}
                                defaultValue={currentQuestion.answerOption}
                                onChange={e =>
                                    handleAnswerOption(e.target.value)
                                }
                            >
                                <option value="Single select">
                                    Single select
                                </option>
                                <option value="Multi select">
                                    Multi select
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="right-col">
                    <div className="preview">
                        <img
                            className="previewImage"
                            src={currentQuestion.image}
                        />
                    </div>
                    {currentQuestion.image === "" && (
                        <label className="uploadImage">
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                defaultValue={""}
                                onChange={e =>
                                    handleSetImage(e.target.files[0])
                                }
                            />
                        </label>
                    )}
                    {currentQuestion.image !== "" && (
                        <div
                            className="deleteImage"
                            className="deleteImage"
                            onClick={e => handleSetImage("delete")}
                        >
                            Delete Image
                        </div>
                    )}
                </div>
            </main>
            <footer>
                {currentQuestion.answers.map(a => {
                    return (
                        <div
                            className="answers"
                            style={{
                                backgroundColor:
                                    a.answer != ""
                                        ? signatures[
                                              currentQuestion.answers.indexOf(
                                                  a
                                              ) + 4
                                          ]
                                        : ""
                            }}
                        >
                            <div
                                className="signature"
                                style={{
                                    backgroundColor:
                                        signatures[
                                            currentQuestion.answers.indexOf(a) +
                                                4
                                        ]
                                }}
                            >
                                <div className="sSvg">
                                    {
                                        signatures[
                                            currentQuestion.answers.indexOf(a)
                                        ]
                                    }
                                </div>
                            </div>
                            <input
                                className="answer"
                                type="text"
                                value={a.answer}
                                placeholder={
                                    "Add answer " +
                                    (currentQuestion.answers.indexOf(a) + 1) +
                                    (currentQuestion.answers.indexOf(a) > 1
                                        ? " (Optional)"
                                        : "")
                                }
                                onChange={e => {
                                    handleSetAnswer(
                                        e.target.value,
                                        currentQuestion.answers.indexOf(a)
                                    );
                                }}
                                style={{
                                    backgroundColor:
                                        a.answer != ""
                                            ? signatures[
                                                  currentQuestion.answers.indexOf(
                                                      a
                                                  ) + 4
                                              ]
                                            : ""
                                }}
                            />
                            <input
                                className="correct"
                                type="checkbox"
                                name="status"
                                checked={a.correct}
                                onChange={() => {
                                    handleSetCorrectAnswer(
                                        currentQuestion.answers.indexOf(a)
                                    );
                                }}
                                style={{
                                  visibility:
                                      a.answer != ""
                                          ? "visible": "hidden"
                              }}
                            />
                        </div>
                    );
                })}
            </footer>
        </div>
    );
}

export default Editor;
