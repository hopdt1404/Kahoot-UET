import React from "react";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {
  setAnswer,
  setAnswerOption,
  setCorrectAnswer,
  setImage,
  setPoints,
  setQuestionContent,
  setTimeLimit,
} from "../../actions/list";



function Editor() {
  const order = useSelector((state) => state.list.order);
  console.log("EDITOR ORDER",order);
  const currentQuestion = useSelector((state) => state.list.qlist[order]);
  const dispatch = useDispatch();
  const handleQuestionContent = (content) => {
    const action = setQuestionContent(content, order);
    dispatch(action);
  };
  const handleTimeLimit = (timeLimit) => {
    const action = setTimeLimit(timeLimit, order);
    dispatch(action);
  };
  const handleSelectPoints = (points) => {
    const action = setPoints(points, order);
    dispatch(action);
  };
  const handleAnswerOption = (option) => {
    const action = setAnswerOption(option, order);
    dispatch(action);
  };
  const handleSetImage = (image) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const action = setImage(reader.result, order);
      dispatch(action);
    });
    reader.readAsDataURL(image);
  };
  const handleSetAnswer = (answer, answeOrderNumber) => {
    const action = setAnswer(answer, order, answeOrderNumber);
    dispatch(action);
  }
  const handleSetCorrectAnswer = (answeOrderNumber) => {
    const action = setCorrectAnswer(order, answeOrderNumber);
    dispatch(action);
  }
  return (
      <div className="Container">
        <header>
          <input
              type="text"
              name="content"
              id="content"
              placeholder="Click to start typing your question"
              onBlur={(e) => handleQuestionContent(e.target.value)}
          />
        </header>
        <main>
          <div className="left-col">
            <ul className="subOption">
              <li className="selectTimeLimit">
                <label>Time limit</label>
                <br/>
                <select name="timeLimit" id="timeLimit" defaultValue={currentQuestion.timeLimit}  onChange={(e) => {
                  handleTimeLimit(e.target.value)
                }}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="60">60</option>
                  <option value="90">90</option>
                  <option value="120">120</option>
                  <option value="240">240</option>
                </select>Secs
              </li>
              <li className="selectPoints">
                <label>Points</label>
                <br/>
                <input
                    type="range"
                    name="points"
                    id="points"
                    step="1000"
                    max="2000"
                    min="0"
                    defaultValue={currentQuestion.points}
                    onChange={(e) => {
                      handleSelectPoints(e.target.value)
                    }}
                />
              </li>
              <li className="selectAnswerOption" hidden={currentQuestion.questionType === "True or False"}>
                <label htmlFor="answerOption">Answer options</label>
                <br/>
                <select name="answerOption"
                        id="answerOption"
                        defaultValue={currentQuestion.answerOption}
                        onChange={(e) => handleAnswerOption(e.target.value)}
                >
                  <option value="Single select">Single select</option>
                  <option value="Multi select">Multi select</option>
                </select>
              </li>
            </ul>
          </div>
          <div className="right-col">
            <div className="preview">
              <img className="previewImage" src={currentQuestion.image} />
            </div>
            <div className="uploadImage">
              <input type="file" defaultValue={""} onChange={(e) => handleSetImage(e.target.files[0])}/>
            </div>
          </div>
        </main>
        <footer>
          {
            currentQuestion.answers.map(
                (a) => {
                  return (
                      <div className="answers">
                        <input
                          className="answer"
                          type="text"
                          defaultValue={a.answer}
                          placeholder={"Add answer "+(currentQuestion.answers.indexOf(a)+1)+((currentQuestion.answers.indexOf(a)>1)?" (Optional)":"")}
                          onBlur={(e) => {
                            handleSetAnswer(e.target.value, currentQuestion.answers.indexOf(a))
                          }}
                        />
                        <input
                          className="correct"
                          type="checkbox"
                          name="status"
                          checked={a.correct}
                          onChange={() => {
                            handleSetCorrectAnswer(currentQuestion.answers.indexOf(a))
                          }}
                        />
                      </div>
                  )
                }
            )
          }
        </footer>
      </div>
  );
}

export default Editor;
