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
                    name_quest: "test",
                    num_quest: 1,
                    num_play: 1
                }
            ]
            // kahootlist structure:
            // [{
            // "name_quest":... "string",
            // "num_quest":... int,
            // "num_play":... int
            // }]
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
                <div class="main-content">
                    <div class="container d-flex pt-5 justify-content-center">
                        <div class="col-sm-3">
                            <div class="user-profile container-fluid">
                                <span class="name">{this.state.fullname}</span>
                                <span class="username">
                                    {this.state.username}
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-4 kahoot-list">
                            <h2 class="pt-2">My Kahoots</h2>
                            {this.state.kahootlist.map(each => (
                                <KahootList data={each} />
                            ))}
                            <div class="create-kahoot">
                                <div class="create-kahoot-area">
                                    <div class="create-kahoot-box">
                                        <p class="create-kahoot-text">
                                            Create a new Kahoot
                                        </p>
                                        <Link
                                            to="/creator"
                                            class="create-kahoot-button"
                                        >
                                            Create
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="see-all">
                                <div class="see-all-area">
                                    <Link to="/kahoots" class="see-all-text">
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
