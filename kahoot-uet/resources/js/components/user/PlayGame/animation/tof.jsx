import React, { useState } from "react";
import PropTypes from "prop-types";
import { DiamondFill, Triangle } from "react-bootstrap-icons";
import "./style.css";

function TrueFalse(props) {
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
                <div className="question">This is a question</div>
            </div>
            <div className="loading-tkt"></div>
        </div>
    );
}

export default TrueFalse;
