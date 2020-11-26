import React from "react";
import IndexPlayer from "./IndexPlayer";

function LobbyPlayer() {
    return (
        <div>
            <IndexPlayer />
            <div className="lobby-main">
                <h1 className="text-1">You're in!</h1>
                <h3 className="text-2">See you nickname on screen?</h3>
            </div>
        </div>
    );
}

export default LobbyPlayer;
