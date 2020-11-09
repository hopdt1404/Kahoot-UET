
import React from 'react';
import "./KahootList.css";
export default class KahootList extends React.Component{
    render(){
        return (
            <div class = "container mt-2 mb-2">
                <a class= "d-flex flex-row quest" href="/">
                    <div class="image">
                        <div class="num-quest">
                            <span class="num-quest-text">{this.props.data.num_quest}Q</span>
                        </div>
                    </div>
                    <div class ="quest-info">
                        <div class = "quest-name">
                            <div class="quest-name-area">
                                <span class="quest-name-text">{this.props.data.name_quest}</span>
                            </div>
                        </div>
                        <div class="num-play">
                            <div class="num-play-area">
                                <span class= "num-play-text d-flex justify-content-end">{this.props.data.num_play} plays</span>    
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}