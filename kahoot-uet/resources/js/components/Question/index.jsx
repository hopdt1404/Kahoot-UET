import React from "react";
import PropTypes from "prop-types";
import "./index.css";

Question.propTypes = {
  orderNumber: PropTypes.number,
  question: PropTypes.object,
  questionLength: PropTypes.number,
  handleRemove: PropTypes.func,
  handleDuplicate: PropTypes.func,
};
function Question(props) {
  return (
    <div className="questionBlock">
      <div className="blockheader">
        <p className="order">{props.orderNumber + 1}</p>
        <p className="qType">&ensp;{props.question.questionType}</p>
      </div>
      <div className="blockbody">
        <div className="col-1">
          <button onClick={()=>{props.handleDuplicate(props.orderNumber)}}>D</button>
          <button onClick={()=>{props.questionLength>1?props.handleRemove(props.orderNumber):console.log("Het")}}>R</button>
        </div>
        <div className="col-2">
          <p className="title">
            {props.question.questionContent !== ""
              ? props.question.questionContent
              : "Type your question"}
          </p>
          <div className="mid">
            <div className="description">
              <p className="timeLimit">{props.question.timeLimit}</p>
              <img height={"30px"} src={props.question.image} className="image"/>
            </div>
            <div className="answers">
              {props.question.answers.map((answer) => {
                    return (
                        <div className="choice">
                          <p className="answer"/>
                          <p id={answer.correct ? "correct" : "incorrect"}/>
                        </div>
                    );
                  }
              )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
