import React, { useState } from 'react';

import './stylePlayer.css';
import Logo from '../.././images/logo_kahoot.png';

function PinInput(props) {

    const handleInput = (e) => {
        this.props.setInput(e.target.value);
    }

    const handleToggle = () => {
        
    }

    return (
        <div className="animation-color play">
            <div className="play-logo">
                <img src={Logo} width="300px" height="100px" />
            </div>
            <form className="play-form">
                <input type="text" placeholder="Game PIN" className="play-input" onChange={handleInput()}></input>
                <button type="submit" className="play-submit" onClick={handleToggle()}>Enter</button>
            </form>
        </div>
    );
}

export default PinInput;