import React from "react";
import IndexPlayer from "./IndexPlayer";

function AnswerSentPlayer() {
    return (
        <div>
            <IndexPlayer />
            <div className="lobby-main answer-sent-main">
                <div className="loader answer-sent-loader"></div>
                <div className="text-2">Checking Result!</div>
            </div>
        </div>
    );
}

export default AnswerSentPlayer;
