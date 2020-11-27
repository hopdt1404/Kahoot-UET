import React from 'react';
import "./Detail.css";
import fake_image from "../../../../images/reports-logo.png";
import Header from "../../Header";
import axios from 'axios';
import {
    CaretDownFill,
    CaretRight,
    Pencil,
    Trash
} from "react-bootstrap-icons";

class ReportDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"test",
            date:"2018-10-16 07:16:04",
            host:"host",
            player: [
                {
                    name:"player1",
                    answer: [
                        {
                            answered:"correct",
                            time:3.05,
                            score:906
                        },
                        {
                            answered:"incorrect",
                            time:6.03,
                            score:0
                        },
                        {
                            answered:"no answer",
                            time:null,
                            score:0
                        },
                        {
                            answered:"correct",
                            time:null,
                            score:706
                        }
                    ]
                },
                {
                    name:"player2",
                    answer: [
                        {
                            answered:"correct",
                            time:3.20,
                            score:888
                        },
                        {
                            answered:"correct",
                            time:6.03,
                            score:503
                        },
                        {
                            answered:"no answer",
                            time:null,
                            score:0
                        },
                        {
                            answered:"incorrect",
                            time:4.05,
                            score:0
                        }
                    ]
                },
                {
                    name:"player3",
                    answer:[
                        {
                            answered:"correct",
                            time:3.05,
                            score:906
                        },
                        {
                            answered:"correct",
                            time:6.03,
                            score:684
                        },
                        {
                            answered:"no answer",
                            time:null,
                            score:0
                        },
                        {
                            answered:"correct",
                            time:4.05,
                            score:706
                        }
                    ]
                }
            ],
            question: [
                {
                    type:"quiz",
                    text:"text question",
                    image:fake_image,
                    time:20
                },
                {
                    type:"quiz",
                    text:"text question",
                    image:fake_image,
                    time:20
                },
                {
                    type:"quiz",
                    text:"text question",
                    image:fake_image,
                    time:20
                },
                {
                    type:"quiz",
                    text:"text question",
                    image:fake_image,
                    time:20
                }
            ],
            time:"1:03",
            player_choose:{
                index: 0,
                name:null,
                percentCorrect: null,
                totalScore : null
            },
            question_choose:{
                index:0,
                correctPlayerCount:null,
                inCorrectPlayerCount:null,
                noAnswerPlayerCount:null,
                timeAvg:null,
                playerScoreList:[]
            }
        };
    }
    componentDidMount(){
        axios.get('/user-reports/detail/')
        .then(res => {
            const data = res.data;
            if (data.name){
                this.setState({
                    name:data.name,
                    date:data.date,
                    host:data.host,
                    player:data.player,
                    question:data.question
                });
            }
        }
        )
        .catch(error => console.log(error));
        
        this.setState(
            {
                player: this.state.player.sort(this.sorttotalscore)
            }
        )
    }
    sorttotalscore(a,b){
        let a_score = 0;
        let b_score = 0;
        for (let i=0; i<a.answer.length;i++){
            a_score += a.answer[i].score;
            b_score += b.answer[i].score;
        }
        return (b_score - a_score);
    }
    sortscore(a,b){
        return (b.score - a.score);
    }
    changePlayerChoose(choose){
        let m_correctAnswer = 0;
        let m_totalScore = 0;
        for (let i=0;i<this.state.player[choose].answer.length;i++){
            if (this.state.player[choose].answer[i].answered == "correct"){
                m_correctAnswer += 1;
                m_totalScore += this.state.player[choose].answer[i].score;
            }
        }
        let m_percentCorrect = null;
        m_percentCorrect = String(Math.round(m_correctAnswer/this.state.player[choose].answer.length*100)) + "%";
        this.setState({
            player_choose:{
                index: choose,
                name: this.state.player[choose].name,
                percentCorrect: m_percentCorrect,
                totalScore : m_totalScore
            }
        })
    }
    changeQuestionChoose(choose){
        let n_correctPlayerCount = 0;
        let n_inCorrectPlayerCount = 0;
        let n_noAnswerPlayerCount = 0;
        let n_timeAvg = 0;
        let n_playerList = []
        for (let i=0;i<this.state.player.length;i++){
            let check = this.state.player[i].answer[choose].answered;
            let playerQuestList = {
                name:this.state.player[i].name,
                answered:this.state.player[i].answer[choose].answered,
                time:this.state.player[i].answer[choose].time,
                score:this.state.player[i].answer[choose].score
            }
            n_playerList.push(playerQuestList);
            if (check == "correct") {
                n_correctPlayerCount += 1;
                n_timeAvg += this.state.player[i].answer[choose].time;
            } else if (check == "incorrect") {
                n_inCorrectPlayerCount += 1;
                n_timeAvg += this.state.player[i].answer[choose].time;
            } else if (check == "no answer") {
                n_noAnswerPlayerCount += 1;
                n_timeAvg += this.state.question[choose].time;
            }
        }
        n_timeAvg = Math.round(100*n_timeAvg) / 100;
        this.setState({
            question_choose:{
                index: choose,
                correctPlayerCount: n_correctPlayerCount,
                inCorrectPlayerCount: n_inCorrectPlayerCount,
                noAnswerPlayerCount: n_noAnswerPlayerCount,
                timeAvg: n_timeAvg,
                playerScoreList: n_playerList.sort(this.sortscore)
            }
        })
    }
    render(){
        let true_answer = 0;
        for (let i=0;i<this.state.player.length;i++){
            for (let j=0;j<this.state.player[i].answer.length;j++){
                if (this.state.player[i].answer[j].answered == "correct"){
                    true_answer += 1;
                }
            }
        }
        let percent_correct = Math.round(true_answer/(this.state.player.length*this.state.question.length)*100);
        let comment = String(percent_correct) + "%";

        let top1_name = null;
        let top2_name = null;
        let top3_name = null;
        if (this.state.player.length > 0){
            top1_name = this.state.player[0].name;
        }
        if (this.state.player.length > 1){
            top2_name = this.state.player[1].name;
        }
        if (this.state.player.length > 2){
            top3_name = this.state.player[2].name;
        }
        let playerRow = this.state.player.map((each,index)=>{
            let correctAnswer = 0;
            let totalScore = 0;
            for (let i=0;i<each.answer.length;i++){
                if (each.answer[i].answered == "correct"){
                    correctAnswer += 1;
                    totalScore += each.answer[i].score;
                }
            }
            let percentCorrect = null;
            percentCorrect = String(Math.round(correctAnswer/each.answer.length*100)) + "%";
            return(
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{each.name}</td>
                        <td>{percentCorrect}</td>
                        <td>{totalScore}</td>
                        <td><button class="btn btn-primary" data-toggle="modal" data-target="#myPlayerModal" onClick={() => this.changePlayerChoose(index)}>Detail</button></td>
                    </tr>
            )
        });
        let player_choose_table = this.state.player[this.state.player_choose.index].answer.map((quest,index1) => {
            return(
                <tr>
                        <th scope="row">{index1+1}</th>
                        <td>{this.state.question[index1].text}</td>
                        <td>{quest.answered}</td>
                        <td>{quest.time}</td>
                        <td>{quest.score}</td>
                    </tr>
            )
        });

        let questionRow = this.state.question.map((each,index) => {
            let correctPlayer = 0;
            for (let i=0;i<this.state.player.length;i++){
                if (this.state.player[i].answer[index].answered == "correct"){
                    correctPlayer += 1;
                }
            }
            let percentCorrect = null;
            percentCorrect = String(Math.round(correctPlayer/this.state.player.length*100)) + "%";
            return(
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{each.type}</td>
                    <td>{percentCorrect}</td>
                    <td><button class="btn btn-primary" data-toggle="modal" data-target="#myQuestionModal" onClick={() => this.changeQuestionChoose(index)}>Detail</button></td>
                </tr>
            )
        });
        let question_choose_table = this.state.question_choose.playerScoreList.map((player,index1) => {
            return(
                <tr>
                        <td>{player.name}</td>
                        <td>{player.answered}</td>
                        <td>{player.time}</td>
                        <td>{player.score}</td>
                    </tr>
            )
        });
        return(
            <div>
                <Header />
                <div class="report-detail-head">
                    <div class="report-detail-info-left flex-fill">
                        <div class="report-detail-info-name-title">
                            <span class="report-detail-info-name-title-reports">Reports</span>
                            <div class="report-detail-info-name-title-options">
                                <span>Report options</span>
                                <div class="dropdown">
                                    <button
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        style={{
                                            border: "none",
                                            backgroundColor: "none",
                                            opacity: "0.3",
                                            margin:"0 20px"
                                        }}
                                    >
                                        <CaretDownFill
                                            color="black"
                                            className="icons-svg"
                                        />
                                    </button>

                                    <div
                                        class="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton">
                                        
                                        <a class="dropdown-item" href="#">
                                            <CaretRight
                                                color="gray"
                                                className="icons-svg"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    marginRight: "10px"
                                                }}
                                            />
                                            Play Again
                                        </a>
                                        <a class="dropdown-item" href="#">
                                            <Pencil
                                                color="gray"
                                                className="icons-svg"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    marginRight: "10px"
                                                }}
                                            />
                                            Rename
                                        </a>
                                        <a class="dropdown-item" href="#">
                                            <Trash
                                                color="gray"
                                                className="icons-svg"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    marginRight: "10px"
                                                }}
                                            />
                                            Delete
                                        </a>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div class="report-detail-info-name">
                            <span>{this.state.name}</span>
                        </div>
                        <div class="report-detail-tab">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#summary">SUMMARY</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#players">PLAYERS</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#questions">QUESTIONS</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="report-detail-info-right">
                        <div class="report-detail-info-date-host">
                            <span>{this.state.date}</span>
                        </div>
                        <div class="report-detail-info-date-host">
                            <span>Hosted by {this.state.host}</span>
                        </div>
                    </div>
                </div>
                <div class="tab-content">
                    <div id="summary" class="tab-pane active kahoot-detail-summary">
                        <div class="d-flex">
                            <div class="d-flex kahoot-detail-summary-percent flex-fill">
                                <div class="progress">
                                    <div class="progress-bar progress-bar-striped" style={{width:comment}}></div>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="kahoot-detail-summary-percent-count">{comment}</span>
                                    <span class="kahoot-detail-summary-percent-comment flex-fill">Excellent!</span>
                                </div>
                            </div>
                            <div class="d-flex flex-column kahoot-detail-summary-count">
                                <div class="kahoot-detail-summary-count-each">
                                    <span>Players:</span>
                                    <span>{this.state.player.length}</span>
                                </div>
                                <div class="kahoot-detail-summary-count-each">
                                    <span>Questions:</span>
                                    <span>{this.state.question.length}</span>
                                </div>
                                <div class="kahoot-detail-summary-count-each">
                                    <span>Time:</span>
                                    <span>{this.state.time}</span>
                                </div>
                            </div>
                            <div class="d-flex flex-column kahoot-detail-summary-top">
                                <span class="kahoot-detail-summary-top-text"> TOP PLAYERS:</span>
                                <div class="kahoot-detail-summary-top-1">
                                    <span>Top 1:</span>
                                    <span>{top1_name}</span>
                                </div>
                                <div class="kahoot-detail-summary-top-2">
                                    <span>Top 2:</span>
                                    <span>{top2_name}</span>
                                </div>
                                <div class="kahoot-detail-summary-top-3">
                                    <span>Top 3:</span>
                                    <span>{top3_name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="players" class="tab-pane fade">
                        <table class="table css-table">
                            <thead>
                                <tr>
                                    <th scope="col">Rank</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Correct answers</th>
                                    <th scope="col">Final Score</th>
                                    <th scope="col">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playerRow}
                            </tbody>
                        </table>
                        <div class="modal" id="myPlayerModal">   
                            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title">Player Detail</h1>
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                    </div>
                                     
                                    <div class="modal-body">
                                        <div class="d-flex mb-4">
                                            <div class="d-flex flex-column flex-fill ml-3 mr-3">
                                                <div class="d-flex report-detail-player-medal-top">
                                                    <span class="text-bold">Name:</span>
                                                    <span class="text-bold">{this.state.player_choose.name}</span>
                                                </div>
                                                <div class="d-flex report-detail-player-medal-top" style={{justifyContent:"space-between"}}>
                                                    <span class="text-bold">Correct answers:</span>
                                                    <span class="text-bold">{this.state.player_choose.percentCorrect}</span>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-column flex-fill ml-3 mr-3">
                                                <div class="d-flex report-detail-player-medal-top" style={{justifyContent:"space-between"}}>
                                                    <span class="text-bold report-detail">Rank:</span>
                                                    <span class="text-bold">{this.state.player_choose.index+1}</span>
                                                </div>
                                                <div class="d-flex report-detail-player-medal-top" style={{justifyContent:"space-between"}}>
                                                    <span class="text-bold">Total score:</span>
                                                    <span class="text-bold">{this.state.player_choose.totalScore}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <table class="table css-table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Quest No.</th>
                                                    <th scope="col">Text</th>
                                                    <th scope="col">Correct/Incorrect/No answer</th>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">Score</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {player_choose_table}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="questions" class="tab-pane fade">
                        <table class="table css-table">
                            <thead>
                                <tr>
                                    <th scope="col">Question No.</th>
                                    <th scope="col">Type</th>      
                                    <th scope="col">Correct</th>
                                    <th scope="col">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questionRow}
                            </tbody>
                        </table>

                        <div class="modal" id="myQuestionModal">   
                            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title">Question Detail</h1>
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                    </div>
                                     
                                    <div class="modal-body">
                                        <div class="d-flex flex-column m-4">
                                            <span style={{fontSize:"30px",borderBottom:"solid black 1px",fontWeight:"bolder"}}>Question No.{this.state.question_choose.index + 1}</span>
                                            <div class="d-flex m-2">
                                                <img class="kahoots-topic-quest-img" src={this.state.question[this.state.question_choose.index].image} href="no image" />
                    
                                                <div class="d-flex flex-column flex-fill ml-2">
                                                    <span class="mb-1 mt-1" style={{fontSize:"20px",borderBottom:"solid black 1px",fontWeight:"bolder"}}>{this.state.question[this.state.question_choose.index].type} - {this.state.question[this.state.question_choose.index].text}</span>
                                                    <div class="report-detail-question-medal-cor-incor">
                                                        <span>Correct players:</span>
                                                        <span>{this.state.question_choose.correctPlayerCount}</span>
                                                    </div>
                                                    <div class="report-detail-question-medal-cor-incor">
                                                        <span>Incorrect players:</span>
                                                        <span>{this.state.question_choose.inCorrectPlayerCount}</span>
                                                    </div>
                                                    <div class="report-detail-question-medal-cor-incor">
                                                        <span>No answer players:</span>
                                                        <span>{this.state.question_choose.noAnswerPlayerCount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="d-flex flex-fill m-2" style = {{justifyContent:"space-between",borderBottom:"solid black 1px"}}>
                                                    <span>Time limit:</span>
                                                    <span>{this.state.question[this.state.question_choose.index].time}</span>
                                                </div>
                                                <div class="d-flex flex-fill m-2" style = {{justifyContent:"space-between",borderBottom:"solid black 1px"}}>
                                                    <span>Time answered Avg:</span>
                                                    <span>{this.state.question_choose.timeAvg}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <table class="table css-table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Correct/Incorrect/No answer</th>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">Score</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {question_choose_table}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportDetail