import React from 'react';
import "./Kahoots/Kahoots.css";
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Person, Star,Search ,Tools, StarFill} from 'react-bootstrap-icons';
import Header from './Header';
import fake_image from "../../images/reports-logo.png";

export default class Kahoots extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            kahootlist:[
                {   
                    id:1,
                    name: "test1",
                    numquest: 1,
                    numplay: 1,
                    isPuclic: false,
                    isFavorite: false,
                    time: 1,
                    image:fake_image
                    
                },
                {
                    id:2,
                    name: "test3",
                    numquest: 10,
                    numplay: 3,
                    isPuclic: true,
                    isFavorite: false,
                    time: 2,
                    image:fake_image
                },
                {
                    id:3,
                    name: "test4",
                    numquest: 4,
                    numplay: 5,
                    isPuclic: false,
                    isFavorite: true,
                    time: 3,
                    image:fake_image
                },
                {
                    id:4,
                    name: "test2",
                    numquest: 4,
                    numplay: 5,
                    isPuclic: true,
                    isFavorite: true,
                    time: 10,
                    image:fake_image
                },
                {
                    id:5,
                    name: "test5",
                    numquest: 4,
                    numplay: 5,
                    isPuclic: true,
                    isFavorite: true,
                    time: 7,
                    image:fake_image
                },
                {
                    id:7,
                    name: "test7",
                    numquest: 4,
                    numplay: 5,
                    isPuclic: true,
                    isFavorite: false, 
                    time: 4,
                    image:fake_image
                },
                {
                    id:6,
                    name: "test6",
                    numquest: 4,
                    numplay: 5,
                    isPuclic: true,
                    isFavorite: true,
                    time: 1,
                    image:fake_image
                }
            ],
            select:[{}],
            curpage:1,
            perpage:3,
            search:"",
            sort:""
        };
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
        this.onResetBtnClick = this.onResetBtnClick.bind(this);
        this.onSearchBtnClick = this.onSearchBtnClick.bind(this);
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
            select : this.state.kahootlist,
            sort:"Recent"
           }
        )
        this.menuselect("mykahoots")
    }
    menuselect(select){
        this.refs.mykahoots.style.backgroundColor = "white";
        this.refs.favorite.style.backgroundColor = "white";
        if (select === "mykahoots") {
            this.refs.mykahoots.style.backgroundColor = "lightblue";
        }
        else {
            this.refs.favorite.style.backgroundColor = "lightblue";
        }
    }
    sortselect(select){
        this.setState({
            sort: select
        })
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
            curpage: 1,
        })
        this.sortselect("Recent");
    }
    onOldestBtnClick(){
        this.setState({
            select: this.state.select.sort(this.sortrecent.bind(this)).reverse(),
            curpage: 1
        })
        this.sortselect("Oldest");
    }
    onNameAscBtnClick() {
        this.setState({
            select: this.state.select.sort(this.sortname),
            curpage: 1
        })
        this.sortselect("A->Z");
    }
    onNameDescBtnClick(){
        this.setState({
            select: this.state.select.sort(this.sortname).reverse(),
            curpage: 1
        })
        this.sortselect("Z->A");
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
        this.menuselect("favorite");
    }
    onKahootBtnClick(){
        this.setState({
            select: this.state.kahootlist,
            curpage: 1
        })
        this.menuselect("mykahoots");
    }
    onResetBtnClick(){
        this.refs.searchinput.value = "";
        this.setState({
            select: this.state.kahootlist,
            search:"",
            curpage: 1
        })
        this.menuselect("mykahoots");
        this.sortselect("Recent");
    }
    onSearchBtnClick(){
        let searchText = this.refs.searchinput.value;
        let arr = [];
        for (let topic of this.state.kahootlist){
            if (topic.name.toLowerCase().indexOf(searchText.toLowerCase())+1) {
                arr.push(topic);
            }
        }
        this.setState({
            search: searchText,
            select: arr,
            curpage: 1
        })
        this.sortselect("Recent");
    }
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
    route(id){
        return "kahoots/detail/"+String(id);
    }
    favoriteOff(id){
        // axios("http://localhost:3000/favoriteOn",{topicId:id})
        // .then(res => {

        // })
        let newKahootlist = this.state.kahootlist;
        let check=0;
        while (newKahootlist[check].id != id){
            check+= 1
        }
        newKahootlist[check].isFavorite = false;
        this.setState({
            kahootlist:newKahootlist
        })
    }
    favoriteOn(id){
        // axios("http://localhost:3000/favoriteOn",{topicId:id})
        // .then(res => {

        // })
        let newKahootlist = this.state.kahootlist;
        let check=0;
        while (newKahootlist[check].id != id){
            check+= 1
        }
        newKahootlist[check].isFavorite = true;
        this.setState({
            kahootlist:newKahootlist
        })
    }
    render(){
        const {select,curpage,perpage,sort} = this.state;
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
                fav = <StarFill color="orange" size="40px" onClick={() => this.favoriteOff(data.id)}/>
            }
            else {
                fav = <Star size = "40px" onClick={() => this.favoriteOn(data.id)}/>
            }
            
            return (
                <div class="kahoots-kahoot-box row">
                    <Link to={this.route(data.id)} class="kahoots-image-box" style={{backgroundImage:'url('+data.image+')'}}>
                            <div class="kahoots-num-quest">
                                <span class="kahoots-num-quest-text"> {data.numquest} Q </span>
                            </div>
                    </Link>
                    <div class="kahoots-quest-info flex-fill">
                        <div class = "kahoots-quest-name">
                            <div class="kahoots-quest-name-area">
                                <Link to={this.route(data.id)} class="kahoots-quest-name-text">{data.name}</Link>
                            </div>
                            {fav}
                        </div>
                        <div class="kahoots-num-play d-flex">
                            <div class="kahoots-is-public">
                                <span class="kahoots-public-text">{public_text}</span>
                            </div>
                            <div class="kahoots-num-play-area ">
                                <div class= "kahoots-time-play">
                                    <span class="kahoots-time-text">{data.time} day {'('}s{')'} ago {'-'}</span>
                                    <span class= "kahoots-num-play-text">{data.numplay} Play{'('}s{')'}</span>
                                </div>
                                    
                            </div>
                        </div>
                        <div class="kahoots-play-box d-flex justify-content-end">
                            <button class="btn btn-primary">
                                <Link to="#" class="kahoots-play-text">Play</Link>
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
            <div>
                <Header />
                <div class="row" style={{background:' rgb(242, 242, 242)',minHeight:'100vh'}}>
                    <div class="col-sm-3 kahoots-menu">
                        <div class="kahoots-menu-content">
                            <div class="kahoots-text-menu" ref = "mykahoots" onClick={this.onKahootBtnClick}>
                                <Person />
                                <span>My Kahoots</span>
                            </div>
                            <div class="kahoots-text-menu" ref = "favorite" onClick ={this.onFavoriteClick}>
                                <Star />
                                <span>Favorites</span>
                            </div>
                            <div class="kahoots-text-menu kahoots-notuse">
                                <Tools />
                                <span>Share With Me</span>
                            </div>
                            <div class="kahoots-text-menu kahoots-notuse">
                                <Tools />
                                <span>My Drafts</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-9">
                        <div class="kahoots-main-content">
                            <div class="kahoots-search-area">
                                <div class="kahoots-search-box">
                                    <input type="text" placeholder="Search..." ref="searchinput" style={{width:'500px'}}/>
                                    <button class="kahoots-search-button" style={{background:'green'}} onClick ={this.onSearchBtnClick}>
                                        <Search color="white"/>
                                    </button>
                                    <button class="btn btn-success" onClick ={this.onResetBtnClick}> Clear Search </button>
                                </div>
                                <div class="kahoots-sort row">
                                    <div class="kahoots-kahoots-text-area">
                                        <span class="kahoots-kahoots-text">My kahoots</span>
                                    </div>
                                    <div class="kahoots-sort-box">
                                        <div class="kahoots-sort-text-area">
                                            <span class="kahoots-sort-text">Sort by:</span>
                                        </div>
                                        <button class="btn btn-outline-info" ref = "recent" onClick={this.onRecentBtnClick}>Recent</button>
                                        <button class="btn btn-outline-info" ref = "oldest" onClick={this.onOldestBtnClick}>Oldest</button>
                                        <button class="btn btn-outline-info" ref = "nameasc" onClick={this.onNameAscBtnClick}>A-{'>'}Z</button>
                                        <button class="btn btn-outline-info" ref = "namedesc"onClick={this.onNameDescBtnClick}>Z-{'>'}A</button>
                                    </div>
                                </div>
                            </div>
                            <div class="kahoots-list-area">
                                <div class="kahoots-total-area row">
                                    <span class="d-flex">Total {'('}{select.length}{')'}</span>
                                    <span class="kahoots-sort-by">Sort by: {sort}</span>
                                </div>
                                <div class="kahoots-kahoots-list">
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
            </div>
        )
    }
}
