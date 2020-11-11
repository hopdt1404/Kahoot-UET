import React from 'react';
import {Star, StarFill, TriangleFill } from 'react-bootstrap-icons';
import "./Topic.css"
import axios from 'axios';
class Topic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: 1,
            name:"name",
            image:null,
            favorites: 0,
            plays: 0,
            players: 0,
            isFavorite: false,
            isPublic: false,
            quest : [
                {
                    type: "type",
                    text:"texaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaat",
                    image:"",
                    time:20,
                    score:300,
                    answers : [
                        {
                            type:"type",
                            content:"text - image"
                        },
                        {
                            type:"type",
                            content:"text - image"
                        },
                        {
                            type:"type",
                            content:"text - image"
                        },
                        {
                            type:"type",
                            content:"text - image"
                        }
                    ],
                    true: [1],
                },
                {
                    type: "type",
                    text:"text",
                    image:"",
                    time:20,
                    score:300,
                    answers : [
                        {
                            type:"text",
                            content:"text - image"
                        },
                        {
                            type:"text",
                            content:"text - image"
                        },
                        {
                            type:"text",
                            content:"text - image"
                        },
                        {
                            type:"text",
                            content:"text - image"
                        }
                    ],
                    true: [2],
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
        console.log(this.props);
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
            <span class="num-text">{this.state.favorites} </span>
            <span class="fav-play-player">favorites</span>
        </div>
        let play = <div>
            <span class="num-text">{this.state.plays} </span>
            <span class="fav-play-player">plays</span>
        </div>
        let player = <div>
            <span class="num-text">{this.state.players} </span>
            <span class="fav-play-player">players</span>
        </div>
        const questlist = this.state.quest.map((data,index) => {
            let quest_text = null;
            quest_text = String(index + 1)+ " - " + String(data.type) + " - "+ String(data.time) + " seconds - " + String(data.score) + " points";
            let collapseid = "answer"+ String(index);
            let hrefcol = "#" + collapseid;
            let answerlist = "answer";
            return(
                <div>
                    <div class="row quest-box" data-toggle="collapse" href={ hrefcol}>
                        <div class="quest-text">
                            <div class="quest-first">
                                <span>{quest_text}</span>
                            </div>
                            <div class="quest-second">
                                <span>{data.text}</span>
                            </div>
                        </div>
                        <img class="quest-img" src={data.image} alt="quest img"/>
                    </div>
                    <div id={collapseid} class="collapse answer">
                        {answerlist}
                    </div>
                </div>
            )
        })
        return (
            <div class="row" style={{background:' rgb(242, 242, 242)',minHeight:'100vh'}}>
                <div class="col-sm-4 info">
                    <img class="img" src={this.state.image} alt="image" />
                    <div class="topic-name-area">
                        <div class="topic-name-box">
                            <span class="topic-name">{this.state.name}</span>
                        </div>
                        <div class="star">
                            {fav}
                        </div>
                    </div>
                    <div class="private-public">
                        {pub_priv}
                    </div>
                    <div class="favorite-play-player">
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
                    <div class="quest-count-text">
                        <span> Questions {'('}{this.state.quest.length}{')'}</span>
                    </div>
                    {questlist}
                </div>
            </div>
        )
    }
}

export default Topic