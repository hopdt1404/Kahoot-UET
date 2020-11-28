import React from "react";
import PropTypes from "prop-types";
import "./style.css";
Countdown.propTypes = {
    count: PropTypes.number
};

function Countdown(props) {
    return (
        <div className="countdown">
            <div className="square-rotate"></div>
            <div className="count">{props.count}</div>
        </div>
    );
}

export default Countdown;
