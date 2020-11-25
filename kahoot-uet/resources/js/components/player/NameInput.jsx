import React from 'react';

import './stylePlayer.css';
import Logo from '../.././images/logo_kahoot.png';

function NameInput() {
    return (
        <div className="animation-color play">
            <div className="play-logo">
                <img src={Logo} width="300px" height="100px" />
            </div>
            <form className="play-form">
                <input type="text" placeholder="Your Name" className="play-input"></input>
                <button type="submit" className="play-submit">Ok, Go!</button>
            </form>
        </div>
    );
}

export default NameInput;