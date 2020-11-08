import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import Question from "../Question";
import {addQuestion, removeQuestion, duplicateQuestion, setNewOrder} from "../../actions/list";

function SideBar() {
  const questionList = useSelector((state) => state.list.qlist);
  const order = useSelector((state) => state.list.order);
  const dispatch = useDispatch();
  const handleAddQuestion = (questionType) => {
    const action = addQuestion(questionType);
    dispatch(action);
  };
  const handleremoveQuestion = (orderNumber) => {
    const action = removeQuestion(orderNumber);
    dispatch(action);
  };
  const handleDuplicateQuestion = (orderNumber) => {
    const action = duplicateQuestion(orderNumber);
    dispatch(action);
  };
  const handleOrderNumber = (orderNumber) => {
      const action = setNewOrder(orderNumber);
      dispatch(action);
  }
  return (
    <div className="sideBar">
      <ul className="listQuestion">
        {questionList.map((question) => {
          return (
            <li id={questionList.indexOf(question) === order ? "target" : ""}
                // onClick={() => {
                //         handleOrderNumber(questionList.indexOf(question));
                //     }
                // }
            >
              <Question
                orderNumber={questionList.indexOf(question)}
                question={question}
                questionLength={questionList.length}
                handleRemove={handleremoveQuestion}
                handleDuplicate={handleDuplicateQuestion}
              />
            </li>
          );
        })}
      </ul>
      <div className="addQuestion">
        <div className="add">
          <a href="#popupform"><button>Add question</button></a>
        </div>
        <div className="selectType" id="popupform">
            <a href="/#"><button  onClick={() => handleAddQuestion("Quiz")}>Quiz</button></a>
            <a href="/#"><button  onClick={() => handleAddQuestion("True or False")}>True or False</button></a>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
