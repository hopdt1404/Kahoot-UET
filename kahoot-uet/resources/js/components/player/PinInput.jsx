import React from 'react';

import './stylePlayer.css';
import Logo from '../.././images/logo_kahoot.png';

function PinInput() {
    return (
        <div className="animation-color play">
            <div className="play-logo">
                <img src={Logo} width="300px" height="100px" />
            </div>
            <form className="play-form">
                <input type="text" placeholder="Game PIN" className="play-input"></input>
                <button type="submit" className="play-submit">Enter</button>
            </form>
        </div>
    );
}

export default PinInput;