import React from "react";
import PropTypes from "prop-types";

Result.propTypes = {};

function Result(props) {
    const color = ["red", "blue", "#d8d800", "green"];
    var result = props.result;
    console.log(result);
    result.map(r => (r) / 3);
    return <div className="result">{
        color.map( c => {
            return <div style={{transform:`scaleY(${1+result[color.indexOf(c)]})`,backgroundColor:`${c}`,minWidth:"2rem"}}></div>
        })
    }</div>;
}

export default Result;
