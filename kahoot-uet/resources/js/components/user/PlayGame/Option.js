import React from "react";
import "./playgame.css";
import OptionImg from "../../../images/option_img.svg";
import ClassicMode from "../../../images/option-single-mode.svg";
import TeamMode from "../../../images/option-team-mode.svg";

import { Link } from 'react-router-dom';

function Option() {
    return (
        <div class="option-root">
            <div className="option-body">
                <div class="option-img">
                    <img src={OptionImg} alt="option img" />
                </div>
                <div className="option-game">
                    <div className="option-name-topic">
                        <div className="option-name-topic-text">Name Topic</div>
                    </div>
                    <div className="option-mode-game">
                        <div className="classic-mode style-mode">
                            <img
                                src={ClassicMode}
                                alt="Classic mode"
                                className="mode-img"
                            />
                            <div className="mode-text">
                                <p>Player vs Player</p>
                            </div>
                            {/* must edit */}
                            <Link to='/play-game/lobby/1'>
                                <button className="mode-button green-button" >Classic</button>
                            </Link>
                        </div>
                        <div className="team-mode style-mode">
                            <img
                                src={TeamMode}
                                alt="Team mode"
                                className="mode-img"
                            />
                            <div className="mode-text">Team vs Team</div>
                            {/* must edit */}
                            <Link to='/play-game/lobby/2'>
                                <button className="mode-button blue-button">
                                    Team mode
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* must edit */}
                    <div class="dropdown show option-game-options">
                        <span className="dropdown-toggle test" href="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</span>
                        <div
                            class="dropdown-menu" aria-labelledby="dropdownMenuLink"
                        >
                            <a class="dropdown-item" href="#">
                                Action
                            </a>
                            <a class="dropdown-item" href="#">
                                Another action
                            </a>
                            <a class="dropdown-item" href="#">
                                Something else here
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Option;
