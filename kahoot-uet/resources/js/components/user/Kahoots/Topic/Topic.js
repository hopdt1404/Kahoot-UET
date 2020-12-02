import React, { useEffect, useState } from 'react';
import {DiamondFill, Star, StarFill, TriangleFill, SquareFill,CircleFill,Check, X, TypeH3} from 'react-bootstrap-icons';
import "./Topic.css"
import Axios from 'axios';
import Header from "../../Header";
import fake_image from "../../../../images/reports-logo.png";
import my_kahoot from "../../../../images/my_kahoot.png";
import {Link} from 'react-router-dom';


function Topic(props){

    const [listQuestion, setListQuestion] = useState([]);

    const id_topic = props.match.params.id_topic;
    const name_topic = props.location.data.nameTopic;

    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/api/auth/topic/detail', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            params: {
                "topic_id": id_topic
            }
        }).then((res) => {
            setListQuestion(res.data.questionList)
        })
    }, [])

    function handleDeleteTopic(id) {
        alert("Are you sure delete this topic?");
        axios.post('http://127.0.0.1:8000/api/auth/topic/delete', {
            topic_id: id
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
        .catch((error) => {console.log(error)})
    }


    const questlist = listQuestion.map((data,index) => {

        let quest_text = <h5>{`${index + 1} - ${data.questionType} - ${data.timeLimit} seconds - ${data.points} point.`}</h5>;
        let collapseid = "answer"+ String(index);
        let hrefcol = "#" + collapseid;
        let answer_all = data.answers.map((answer,index2) => {
            const sign = index2;
            const text = answer.answer;
            let answer_img = null;
            if (sign == 0) {
                answer_img = <div class="bg-danger kahoots-topic-answer-img">
                    <TriangleFill color="white" size="20px"/>
                </div>
            } else if (sign == 1) {
                answer_img = <div class="bg-info kahoots-topic-answer-img">
                    <DiamondFill color="white" size="20px"/>
                </div>
            } else if (sign == 2) {
                answer_img = <div class="bg-warning kahoots-topic-answer-img">
                    <CircleFill color="white" size="20px"/>
                </div>
            } else if (sign == 3) {
                answer_img = <div class="bg-success kahoots-topic-answer-img">
                    <SquareFill color="white" size="20px"/>
                </div>
            }
            let check_img = null;
            if (answer.correct == false) {
                check_img = <div class="kahoots-topic-check-img">
                                <X color="red" size="30px" />
                            </div>
            }else {
                check_img = <div class="kahoots-topic-check-img">
                                <Check color="green" size="30px"/>
                            </div>
            }
            return(
                <div class="kahoots-topic-answer-each">
                    <div class="d-inline-flex kahoots-topic-answer-each-first">
                        {answer_img}
                        <span class="kahoots-topic-answer-text">{text}</span>
                    </div>
                    {check_img}
                </div>
            )
        })
        let answerlist = <div class="d-flex flex-column">
            {answer_all}
        </div>; 
    
        return(
            <div className="topic-container">
                <div class="row kahoots-topic-quest-box" data-toggle="collapse" href={ hrefcol}>
                    <div class="kahoots-topic-quest-text">
                        <div class="kahoots-topic-quest-first">
                            <span>{quest_text}</span>
                        </div>
                        <div class="kahoots-topic-quest-second">
                            <h4>{`Content: ${data.questionContent}`}</h4>
                        </div>
                    </div>
                    <img class="kahoots-topic-quest-img" src={fake_image} alt="quest img"/>
                </div>
                <div id={collapseid} class="collapse kahoots-topic-answer">
                    {answerlist}
                </div>
            </div>
        )
    })
    return (
        <div>
            <Header />
            <div class="row" style={{background:' rgb(242, 242, 242)',minHeight:'100vh'}}>
                <div class="col-sm-4 kahoots-topic-info">
                    <img class="kahoots-topic-img" src={my_kahoot} alt="image"/>
                    <div class="kahoots-topic-topic-name-area">
                        <div class="kahoots-topic-topic-name-box">
                            <span class="kahoots-topic-topic-name">{name_topic}</span>
                        </div>
                    </div>
                    <div class="d-flex font-weight-bold text-black">
                        <Link to={{ pathname: `/user/${id_topic}`, data: {nameTopic: name_topic}}}>
                            <button class="btn btn-success" style={{width: "10vmin", height: "5vmin"}}>Play</button>
                        </Link>
                        <Link to="/kahoots" class="kahoots-play-text">
                            <button class="btn btn-danger" style={{width: "10vmin", height: "5vmin"}} onClick={() => handleDeleteTopic(id_topic)}>
                                Delete
                            </button>
                        </Link>
                        <Link to="/kahoots">
                            <button type="button" style={{width: "10vmin", height: "5vmin"}} class="btn btn-link">See all</button>
                        </Link>
                    </div>
                </div>
                <div class="col-sm-7 m-3">
                    <div class="kahoots-topic-quest-count-text">
                        <span> Questions {'('}{listQuestion.length}{')'}</span>
                    </div>
                    {questlist}
                </div>
            </div>
        </div>
    )
}

export default Topic