import React from 'react';
import './Home/Home.css';
import KahootList from "./Home/KahootList/KahootList";
import Clock from "./Home/Time/Clock";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import fake_image from "../../images/reports-logo.png";
import Header from './Header';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullname: "FullName",
            username: "username",
            kahootlist: [
                {   
                    id: 1,
                    name_quest: "test1",
                    num_quest: 1,
                    num_play: 1,
                    image: null
                },
                {   
                    id: 2,
                    name_quest: "test2",
                    num_quest: 2,
                    num_play: 2,
                    image: null
                }
            ],
            reportlist: [
                {
                    id:1,
                    name:"abc",
                    topic:"test1",
                    date:"2016-09-06 11:53:31",
                    image: null
                },
                {
                    id:2,
                    name:"test_report",
                    topic:"test2",
                    date:"2016-09-06 11:53:31",
                    image: null
                }
            ]
            
        };
    }
    componentDidMount() {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
          }
        axios
            .get("localhost:8000/api/home",config)
            .then(res => {
                const data = res.data;
                if (data.fullname) {
                    this.setState({
                        fullname: data.fullname
                    });
                }
                if (data.username) {
                    this.setState({
                        username: data.username
                    });
                }
                if (data.kahootlist) {
                    this.setState({
                        kahootlist: data.kahootlist
                    });
                }
                if (data.reportlist) {
                    this.setState({
                        reportlist: data.reportlist
                    });
                }
            })
            .catch(error => console.log(error));
    }
    route(id){
        return "/user-reports/detail/"+String(id);
    }
    render() {
        // Bao gio xong het thi them
        // if (!localStorage.getItem("token")){
        //     window.alert("Ban chưa dăng nhập");
        //     return(
        //         <Redirect to="/auth/login" />
        //     )
        // }
        const reportShow = this.state.reportlist.map((data,index)=> {
            return(
                <div class = "container mt-2 mb-2">
                    <Link class= "d-flex flex-row home-kahootlist-quest" to={this.route(data.id)}>
                        <img class="home-kahootlist-image" src={data.image} style={{backgroundImage:'url('+fake_image+')'}}>
                        </img>
                        <div class ="home-kahootlist-quest-info">
                            <div class = "home-kahootlist-quest-name">
                                <div class="home-kahootlist-quest-name-area">
                                    <span class="home-kahootlist-quest-name-text">{data.name}</span>
                                </div>
                            </div>
                            <div class="home-kahootlist-num-play">
                                <div class="home-kahootlist-num-play-area">
                                    <span class= "home-kahootlist-num-play-text d-flex justify-content-end">{data.date}</span>    
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })
        return (
            <div>
                <Header />
                <div class="home-main-content container d-flex pt-5 justify-content-center">
                    <div class="col-sm-4">
                        <div class="home-user-profile">
                            <h3 class="mb-3">Welcome back!</h3> 
                            <span class="home-name">{this.state.fullname}</span>
                            <span class="home-username">
                                {this.state.username}
                            </span>
                        </div>

                        <div class="home-kahoot-list mt-5 p-2">
                            <h2 class="pt-2 ">My Reports</h2>
                            {reportShow}
                            <div class="home-see-all">
                                <div class="home-see-all-area">
                                    <Link to="/user-reports" class="home-see-all-text home-link-see-all">
                                        See all
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-sm-4 home-kahoot-list">
                        <h2 class="pt-2">My Kahoots</h2>
                        {this.state.kahootlist.map(each => <KahootList data={each} />)}
                        <div class="home-create-kahoot">
                            <div class="home-create-kahoot-area">
                                <div class="home-create-kahoot-box">
                                    <p class="home-create-kahoot-text">Create a new Kahoot</p>
                                    <Link to="/creator" class="home-create-kahoot-button">Create</Link>
                                </div>
                            </div>
                        </div>
                        <div class = "home-see-all">
                            <div class= "home-see-all-area">
                                <Link to="/kahoots" class="home-see-all-text home-link-see-all">See all</Link>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3 time ml-3">
                    <Clock size={230} timeFormat="24hour" hourFormat="standard" />
                    </div>
                </div>
            </div>
        );
    }
}