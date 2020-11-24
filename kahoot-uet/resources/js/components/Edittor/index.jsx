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

  // const signature = [
  //   {<svg id="TRIANGLE" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" style="paint-order: stroke;"><path d="M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z" style="fill: inherit;"></path></svg>},
  //   {<svg id="DIAMOND" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" style="paint-order: stroke;"><path d="M4,16.0038341 L16,4 L28,16.0007668 L16,28 L4,16.0038341 Z" style="fill: inherit;"></path></svg>},
  //   {<svg id="CIRCLE" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" style="paint-order: stroke;"><path d="M16,27 C9.92486775,27 5,22.0751322 5,16 C5,9.92486775 9.92486775,5 16,5 C22.0751322,5 27,9.92486775 27,16 C27,22.0751322 22.0751322,27 16,27 Z" style="fill: inherit;"></path></svg>},
  //   {<svg id="SQUARE" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" style="paint-order: stroke;"><path d="M7,7 L25,7 L25,25 L7,25 L7,7 Z" style="fill: inherit;"></path></svg>}
  // ];
  // const getSignature = (order) => {
  //   switch (order){
  //     case 0: return {
  //     };
  //     case 1: return {
  //       <svg id="TRIANGLE" dataFunctionalSelector="icon" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1.3px" style="paintOrder: stroke"><path d="M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z" style="fill: inherit;"></path></svg>
  //     };
  //     case 2: return {
  //       <svg id="TRIANGLE" dataFunctionalSelector="icon" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1.3px" style="paintOrder: stroke"><path d="M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z" style="fill: inherit;"></path></svg>
  //     };
  //     case 3: return {
  //       <svg id="TRIANGLE" dataFunctionalSelector="icon" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1.3px" style="paintOrder: stroke"><path d="M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z" style="fill: inherit;"></path></svg>
  //     };
  //   }
  // }
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
            <label className="uploadImage">Upload Image
              <input type="file" accept="image/*" defaultValue={""} onChange={(e) => handleSetImage(e.target.files[0])}/>
            </label>
          </div>
        </main>
        <footer>
          {
            currentQuestion.answers.map(
                (a) => {
                  return (
                      <div className="answers">
                        <div className="signature">

                        </div>
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
