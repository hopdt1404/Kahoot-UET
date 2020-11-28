import React from "react";
import PropTypes from "prop-types";
import { Circle, DiamondFill, Square, Triangle } from "react-bootstrap-icons";
import "./style.css";

TrueFalse.propTypes = {};

function TrueFalse(props) {
    return (
        <div className="quizAnimation">
            <div className="signature" id="triangle">
                <Triangle />
            </div>
            <div className="signature" id="diamond">
                <DiamondFill/>
            </div>
            {/* <div className="signature" id="circle">
                <Circle />
            </div>
            <div className="signature" id="square">
                <Square />
            </div> */}
        </div>
    );
}

export default TrueFalse;
