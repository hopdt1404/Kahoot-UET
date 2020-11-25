import React from "react";
import IndexPlayer from "./IndexPlayer";

function StartPlayer() {
    return (
        <div>
            <IndexPlayer />
            <div className="lobby-main start-main">
                <div className="text-1">Get Ready!</div>
                <div className="loader"></div>
                <div className="text-2">Loading...</div>
            </div>
        </div>
    );
}

export default StartPlayer;
