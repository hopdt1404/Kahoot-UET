import React from 'react';
import {DiamondFill, Star, StarFill, TriangleFill, SquareFill,CircleFill,Check, X} from 'react-bootstrap-icons';
import "./Topic.css"
import axios from 'axios';
import Header from "../../Header";
import fake_image from "../../../../images/reports-logo.png";
class Topic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: 1,
            name:"name",
            image:fake_image,
            favorites: 0,
            plays: 0,
            players: 0,
            isFavorite: false,
            isPublic: false,
            quest : [
                {
                    type: "type",
                    text:"texaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaat",
                    image:fake_image,
                    time:20,
                    score:300,
                    answers : [
                        {
                            type:"text",
                            content:"text - image - false [0]"
                        },
                        {
                            type:"text",
                            content:"text - image - true [1]"
                        },
                        {
                            type:"text",
                            content:"text - image - false [2]"
                        },
                        {
                            type:"text",
                            content:"text - image - false [3]"
                        }
                    ],
                    true_answers: [1],
                },
                {
                    type: "type",
                    text:"text",
                    image:fake_image,
                    time:15,
                    score:500,
                    answers : [
                        {
                            type:"text",
                            content:"text - image - true [0]"
                        },
                        {
                            type:"text",
                            content:"text - image - true [1]"
                        },
                        {
                            type:"text",
                            content:"text - image - false [2]"
                        },
                        {
                            type:"text",
                            content:"text - image - false [3]"
                        }
                    ],
                    true_answers: [0,1],
                }
            ]
        }
    }
    componentDidMount(){
        axios.get('/kahoots/detail')
        .then(res => {
            const data = res.data;
            if (data.name){
                this.setState({
                    id:data.id,
                    name:data.name,
                    image:data.image,
                    favorites: data.favorites,
                    plays: data.plays,
                    players: data.players,
                    isFavorite: data.isFavorite,
                    quest:data.quest
                })
            }
        }
        )
        .catch(error => console.log(error));
    }
    render() {
        let fav = null;
        if (this.state.isFavorite === true) {
            fav = <StarFill color="orange" size="40px"/>
        }
        else {
            fav = <Star size = "40px"/>
        }

        let pub_priv=null;
        if (this.state.isPublic){
            pub_priv = <span>Public</span>;
        }
        else {
            pub_priv = <span>Private</span>;
        }
        let favorite = <div>
            <span class="kahoots-topic-num-text">{this.state.favorites} </span>
            <span class="kahoots-topic-fav-play-player">favorites</span>
        </div>
        let play = <div>
            <span class="kahoots-topic-num-text">{this.state.plays} </span>
            <span class="kahoots-topic-fav-play-player">plays</span>
        </div>
        let player = <div>
            <span class="kahoots-topic-num-text">{this.state.players} </span>
            <span class="kahoots-topic-fav-play-player">players</span>
        </div>
        const questlist = this.state.quest.map((data,index) => {
            let quest_text = null;
            quest_text = String(index + 1)+ " - " + String(data.type) + " - "+ String(data.time) + " seconds - " + String(data.score) + " points";
            let collapseid = "answer"+ String(index);
            let hrefcol = "#" + collapseid;
            let answer_all = data.answers.map((answer,index2) => {
                const sign = index2;
                const text = answer.content;
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
                let check_img = <div class="kahoots-topic-check-img">
                    <X color="red" size="30px" />
                </div>
                for (let i=0; i < data.true_answers.length; i++){
                    if (data.true_answers[i] == sign) {
                        check_img = <div class="kahoots-topic-check-img">
                            <Check color="green" size="30px"/>
                        </div>
                    }
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
                <div>
                    <div class="row kahoots-topic-quest-box" data-toggle="collapse" href={ hrefcol}>
                        <div class="kahoots-topic-quest-text">
                            <div class="kahoots-topic-quest-first">
                                <span>{quest_text}</span>
                            </div>
                            <div class="kahoots-topic-quest-second">
                                <span>{data.text}</span>
                            </div>
                        </div>
                        <img class="kahoots-topic-quest-img" src={data.image} alt="quest img"/>
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
                        <img class="kahoots-topic-img" src={this.state.image} alt="image" />
                        <div class="kahoots-topic-topic-name-area">
                            <div class="kahoots-topic-topic-name-box">
                                <span class="kahoots-topic-topic-name">{this.state.name}</span>
                            </div>
                            <div class="kahoots-topic-star">
                                {fav}
                            </div>
                        </div>
                        <div class="kahoots-topic-private-public">
                            {pub_priv}
                        </div>
                        <div class="kahoots-topic-favorite-play-player">
                            {favorite}
                            {play}
                            {player}
                        </div>
                        <div class="d-flex font-weight-bold text-black">
                            <button class="btn btn-success">Play</button>
                            <button class="btn btn-primary">Edit</button>
                        </div>
                    </div>
                    <div class="col-sm-7 m-3">
                        <div class="kahoots-topic-quest-count-text">
                            <span> Questions {'('}{this.state.quest.length}{')'}</span>
                        </div>
                        {questlist}
                    </div>
                </div>
            </div>
        )
    }
}

export default Topic