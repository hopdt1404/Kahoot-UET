import React from "react";
import "./Home/Home.css";
import KahootList from "./Home/KahootList/KahootList";
import Clock from "./Home/Time/Clock";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "FullName",
            username: "username",
            kahootlist: [
                {   
                    id: 1,
                    name_quest: "test1",
                    num_quest: 1,
                    num_play: 1
                },
                {   
                    id: 2,
                    name_quest: "test2",
                    num_quest: 2,
                    num_play: 2
                }
            ]
            
        };
    }
    componentDidMount() {
        axios
            .get("/")
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
            })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                <Header />
                <div class="home-main-content">
                    <div class="container d-flex pt-5 justify-content-center">
                        <div class="col-sm-3">
                            <div class="home-user-profile container-fluid">
                                <span class="home-name">{this.state.fullname}</span>
                                <span class="home-username">
                                    {this.state.username}
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-4 home-kahoot-list">
                            <h2 class="pt-2">My Kahoots</h2>
                            {this.state.kahootlist.map(each => (
                                <KahootList data={each} />
                            ))}
                            <div class="home-create-kahoot">
                                <div class="home-create-kahoot-area">
                                    <div class="home-create-kahoot-box">
                                        <p class="home-create-kahoot-text">
                                            Create a new Kahoot
                                        </p>
                                        <Link
                                            to="/creator"
                                            class="home-create-kahoot-button"
                                        >
                                            Create
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="home-see-all">
                                <div class="home-see-all-area">
                                    <Link to="/kahoots" class="home-see-all-text">
                                        See all
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 time ml-3">
                            <Clock
                                size={230}
                                timeFormat="24hour"
                                hourFormat="standard"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
