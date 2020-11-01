import React from 'react';
import "./Kahoots/Kahoots.css";
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Person, Star,Search ,Tools, StarFill} from 'react-bootstrap-icons';
export default class Kahoots extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            kahootlist:[
                {
                    name: "test1",
                    numquest: 1,
                    numplay: 1,
                    isPuclic: false,
                    isFavorite: false,
                    time: 1
                    
                },
                {
                    name: "test3",
                    numquest: 10,
                    numplay: 3,
                    isPuclic: true,
                    isFavorite: false,
                    time: 2
                },
                {
                    name: "test4",
                    numquest: 4,
                    numplay: 5,
                    isPuclic: false,
                    isFavorite: true,
                    time: 3
                },
                {
                    name: "test2",
                    numquest: 4,
                    numplay: 5,
                    isPuclic: true,
                    isFavorite: true,
                    time: 10
                },
                {
                    name: "test5",
                    numquest: 4,
                    numplay: 5,
                    isPuclic: true,
                    isFavorite: true,
                    time: 7
                },
                {
                    name: "test7",
                    numquest: 4,
                    numplay: 5,
                    isPuclic: true,
                    isFavorite: false, 
                    time: 4
                },
                {
                    name: "test6",
                    numquest: 4,
                    numplay: 5,
                    isPuclic: true,
                    isFavorite: true,
                    time: 1
                }
            ],
            select:[{}],
            curpage:1,
            perpage:3,
            search:""
        };
        this.menu_ref =  React.createRef();
        this.sort_ref = React.createRef();
        this.onFirstBtnClick = this.onFirstBtnClick.bind(this);
        this.onPrevBtnClick = this.onPrevBtnClick.bind(this);
        this.onNextBtnClick = this.onNextBtnClick.bind(this);
        this.onLastBtnClick = this.onLastBtnClick.bind(this);
        this.onRecentBtnClick = this.onRecentBtnClick.bind(this);
        this.onOldestBtnClick = this.onOldestBtnClick.bind(this);
        this.onNameAscBtnClick = this.onNameAscBtnClick.bind(this);
        this.onNameDescBtnClick = this.onNameDescBtnClick.bind(this);
        this.onFavoriteClick = this.onFavoriteClick.bind(this);
        this.onKahootBtnClick = this.onKahootBtnClick.bind(this);
        // this.onResetBtnClick = this.onResetBtnClick.bind(this);
        // this.onSearchBtnClick = this.onSearchBtnClick.bind(this);
    }
    componentDidMount(){
        axios.get('/kahoots')
        .then(res => {
            const data = res.data;
            if (data.kahootlist){
                this.setState({
                    kahootlist: data.kahootlist
                });
            }
        }
        )
        .catch(error => console.log(error));
        this.setState(
           {kahootlist: this.state.kahootlist.sort(this.sortrecent),
            select : this.state.kahootlist}
        )
    }
    onPrevBtnClick(){
        this.setState({
            curpage: this.state.curpage - 1
        })
    }
    onNextBtnClick(){
        this.setState({
            curpage: this.state.curpage + 1
        })
    }
    onFirstBtnClick(){
        this.setState({
            curpage: 1
        })
    }
    onLastBtnClick(){
        this.setState({
            curpage: Math.ceil(this.state.select.length/this.state.perpage)
        })
    }
    onRecentBtnClick(){
        this.setState({
            select: this.state.select.sort(this.sortrecent),
            curpage: 1
        })
    }
    onOldestBtnClick(){
        this.setState({
            select: this.state.select.sort(this.sortrecent.bind(this)).reverse(),
            curpage: 1
        })
    }
    onNameAscBtnClick() {
        this.setState({
            select: this.state.select.sort(this.sortname),
            curpage: 1
        })
    }
    onNameDescBtnClick(){
        this.setState({
            select: this.state.select.sort(this.sortname).reverse(),
            curpage: 1
        })
    }
    onFavoriteClick(){
        let arr = [];
        for (let topic of this.state.kahootlist){
            if (topic.isFavorite) {
                arr.push(topic);
            }
        }
        this.setState({
            select: arr,
            curpage: 1,
        })
    }
    onKahootBtnClick(){
        this.setState({
            select: this.state.kahootlist,
            curpage: 1
        })
    }
    // onResetBtnClick = () => {
    //     this.setState({
    //         select: this.state.kahootlist,
    //         find:""
    //     })
    // }
    // onSearchBtnClick = () => {

    // }
    sortrecent(a,b){ // return newest
        return (a.time - b.time);
    }
    sortname(a,b){ // return a->z
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    }
    render(){
        const {select,curpage,perpage} = this.state;
        const lastrend = curpage * perpage;
        const firstrend= lastrend - perpage;
        const rend = select.slice(firstrend,lastrend);
        const topic=rend.map((data,index) => {
            let public_text = null;
            if (data.isPuclic === true) {
                public_text = "Public";
            }
            else {
                public_text = "Private";
            }
            let fav = null;
            if (data.isFavorite === true) {
                fav = <StarFill color="orange" size="40px"/>
            }
            else {
                fav = <Star size = "40px"/>
            }
            return (
                <div class="kahoot-box row">
                    <a class="image-box" href="/">
                            <div class="num-quest">
                                <span class="num-quest-text"> {data.numquest} Q </span>
                            </div>
                    </a>
                    <div class="quest-info">
                        <div class = "quest-name">
                            <div class="quest-name-area">
                                <a href="/" class="quest-name-text">{data.name}</a>
                            </div>
                            {fav}
                        </div>
                        <div class="num-play d-inline-flex">
                            <div class="is-public d-flex justify-content-start">
                                <span class="public-text">{public_text}</span>
                            </div>
                            <div class="num-play-area d-flex justify-content-end">
                                <div class= "d-flex justify-content-end">
                                    <span class="time-text">{data.time} day {'('}s{')'} ago {'-'}</span>
                                    <span class= "num-play-text">{data.numplay} Play{'('}s{')'}</span>
                                </div>
                                    
                            </div>
                        </div>
                        <div class="play-box d-flex justify-content-end">
                            <button class="btn btn-primary">
                                <Link to="#" class="play-text">Play</Link>
                            </button> 
                        </div>
                    </div>
                </div>
            )}
        );
        const totalpage = Math.ceil(select.length / perpage);       
        let firstbtn = null;
        let prevpagebtn = null;
        let lastbtn = null;
        let nextpagebtn = null;
        let curpagebtn = null;
        if (totalpage !== 0){
            if (curpage !== 1 ) {
                firstbtn = <li class="page-item"><button class="page-link" href="#" onClick={this.onFirstBtnClick}>First Page</button></li>
            }
            
            if (curpage !== 1 ) {
                prevpagebtn = <li class="page-item"><button class="page-link" href="#" onClick={this.onPrevBtnClick}>{curpage-1}</button></li>
            }

            
            if (curpage !== totalpage) {
                lastbtn = <li class="page-item"><button class="page-link" href="#" onClick={this.onLastBtnClick}>Last Page</button></li>
            }
            
            if (curpage !== totalpage) {
                nextpagebtn = <li class="page-item"><button class="page-link" href="#" onClick={this.onNextBtnClick}>{curpage+1}</button></li>
            }
            curpagebtn = <li class="page-item active" id ="cur"><button class="page-link">{curpage}</button></li>
        }
        return(
            <div class="row" style={{background:' rgb(242, 242, 242)',minHeight:'100vh'}}>
                <div class="col-sm-3 menu">
                    <div class="menu-content">
                        <div class="text-menu" id = "mykahoots" onClick={this.onKahootBtnClick}>
                            <Person />
                            <span>My Kahoots</span>
                        </div>
                        <div class="text-menu" id = "myfavorite" onClick ={this.onFavoriteClick}>
                            <Star />
                            <span>Favorites</span>
                        </div>
                        <div class="text-menu notuse">
                            <Tools />
                            <span>Share With Me</span>
                        </div>
                        <div class="text-menu notuse">
                            <Tools />
                            <span>My Drafts</span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-9">
                    <div class="main-content">
                        <div class="search-area">
                            <div class="search-box">
                                <input type="text" placeholder="Search..." id="search-input" style={{width:'500px'}}/>
                                <button class="search-button" style={{background:'green'}}>
                                    <Search color="white"/>
                                </button>
                            </div>
                            <div class="sort row">
                                <div class="kahoots-text-area">
                                    <span class="kahoots-text">My kahoots</span>
                                </div>
                                <div class="sort-box">
                                    <div class="sort-text-area">
                                        <span class="sort-text">Sort by:</span>
                                    </div>
                                    <button class="btn btn-primary" onClick={this.onRecentBtnClick}>Recent</button>
                                    <button class="btn btn-secondary" onClick={this.onOldestBtnClick}>Oldest</button>
                                    <button class="btn btn-success" onClick={this.onNameAscBtnClick}>A-{'>'}Z</button>
                                    <button class="btn btn-info" onClick={this.onNameDescBtnClick}>Z-{'>'}A</button>
                                </div>
                            </div>
                        </div>
                        <div class="list-area">
                            <div class="total-area">
                                <span class="total-text">Total {'('}{select.length}{')'}</span>
                            </div>
                            <div class="kahoots-list">
                                {topic}
                                <ul class="pagination justify-content-center" style={{margin:'20px 0'}}>
                                {firstbtn}
                                {prevpagebtn}
                                {curpagebtn}
                                {nextpagebtn}
                                {lastbtn}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}