import React, { useState } from "react";
import PropTypes from "prop-types";
import { Circle, DiamondFill, Square, Triangle } from "react-bootstrap-icons";
import "./style.css";

Quiz.propTypes = {};

function Quiz(props) {
    const [bgColor, setBgColor] = useState("#ff0000a8");
    return (
        <div
            style={{
                backgroundColor: bgColor,
                width: "100vw",
                height: "100vh"
            }}
        >
            {
                <div className="layout">
                    <div className="currentQuestion">
                        2 of 3
                        {/* {`${props.indexNumber} of ${props.length}`} */}
                    </div>
                </div>
            }
            <div className="qBlock">
                <div className="animation">
                    <div className="quizShadow">
                        <div className="quizAnimation">
                            <div className="signature" id="triangle">
                                <Triangle />
                            </div>
                            <div className="signature" id="diamond">
                                <DiamondFill />
                            </div>
                            <div className="signature" id="circle">
                                <Circle />
                            </div>
                            <div className="signature" id="square">
                                <Square />
                            </div>
                        </div>
                    </div>
                    <div className="quizText">Quiz</div>
                </div>
            </div>
            <div className="qBlock2">
                <div className="question">This is a question</div>
            </div>
            <div className="loading-tkt"></div>
        </div>
    );
}

export default Quiz;
