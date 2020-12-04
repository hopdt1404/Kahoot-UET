import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import Countdown from '../user/PlayGame/animation/countdown';
import Quiz from '../user/PlayGame/animation/quiz';
import TrueFalse from "../user/PlayGame/animation/tof";

function Start() {
    // const testName = useSelector((state) => state.summary.title);
    // const questionList = useSelector((state) => state.list.qlist);
    const [count, setCount] = useState(3);
    const [stage, setStage] = useState(1);
    const testName = "TEST NAME";
    const questionList = [
        {
            timeLimit: 20,
            points: 1000,
            questionType: "Quiz",
            answerOption: "Single select",
            image: "",
            // youtubeLink: "",
            questionContent: "1 + 1 = ?",
            answers: [
                {
                    answer: "0",
                    correct: false
                },
                {
                    answer: "2",
                    correct: true
                },
                {
                    answer: "1",
                    correct: false
                },
                {
                    answer: "3",
                    correct: false
                }
            ]
        },
        {
            timeLimit: 20,
            points: 1000,
            questionType: "Quiz",
            answerOption: "Single select",
            image: "",
            // youtubeLink: "",
            questionContent: "1 x 1 = ?",
            answers: [
                {
                    answer: "0",
                    correct: false
                },
                {
                    answer: "1",
                    correct: true
                },
                {
                    answer: "2",
                    correct: false
                },
                {
                    answer: "3",
                    correct: false
                }
            ]
        },
        {
            timeLimit: 20,
            points: 1000,
            questionType: "True or False",
            answerOption: "Single select",
            image: "",
            // youtubeLink: "",
            questionContent: "1 + 1 = 2",
            answers: [
                {
                    answer: "",
                    correct: true
                },
                {
                    answer: "",
                    correct: false
                },
                {
                    answer: "",
                    correct: false
                },
                {
                    answer: "",
                    correct: false
                }
            ]
        }
    ];
    useEffect(() => {
        const set_timeout = setTimeout(() => {
            setCount(count - 1);
            if (count < 1) {
                setStage(stage + 1);
                setCount(3);
            }
        }, 1000);
        if(stage > questionList.length+1) {
          clearTimeout(set_timeout);
        }
        return () => {
          clearTimeout(set_timeout);
        }
    }, [count]);

    // useEffect(()=>{},[stage]);
    return (
        <div className="start" style={{backgroundColor:stage>2&&"#ff0000a8"}}>
            {stage<3&&<div className="layout">
                <svg className="square">
                    <rect />
                </svg>
                <svg className="circle">
                    <circle />
                </svg>
            </div>}
            {stage>2&&<div className="layout">
                <div className="currentQuestion">
                  {`${stage-2} of ${questionList.length}`}
                </div>
            </div>}
            <div className="animation">
              {stage == 1 && <div className="test_name">{testName}</div>}
              {stage == 2 && <Countdown count={count}/>}
              {stage > 2 && questionList[stage-3].questionType === "Quiz" && <Quiz/>}
              {stage > 2 && questionList[stage-3].questionType !== "Quiz" && <TrueFalse/>}
            </div>
        </div>
    );
}

export default Start;
