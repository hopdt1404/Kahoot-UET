import {Link} from 'react-router-dom';
import React from 'react';
import "./KahootList.css";
export default class KahootList extends React.Component{
    route(id){
        return "kahoots/detail/"+String(id);
    }
    render(){
        return (
            <div class = "container mt-2 mb-2">
                <Link class= "d-flex flex-row home-kahootlist-quest" to={this.route(this.props.data.id)}>
                    <div class="home-kahootlist-image" style={{backgroundImage:'url('+this.props.data.image+')'}}>
                        <div class="home-kahootlist-num-quest">
                            <span class="home-kahootlist-num-quest-text">{this.props.data.num_quest}Q</span>
                        </div>
                    </div>
                    <div class ="home-kahootlist-quest-info">
                        <div class = "home-kahootlist-quest-name">
                            <div class="home-kahootlist-quest-name-area">
                                <span class="home-kahootlist-quest-name-text">{this.props.data.name_quest}</span>
                            </div>
                        </div>
                        <div class="home-kahootlist-num-play">
                            <div class="home-kahootlist-num-play-area">
                                <span class= "home-kahootlist-num-play-text d-flex justify-content-end">{this.props.data.num_play} plays</span>    
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}