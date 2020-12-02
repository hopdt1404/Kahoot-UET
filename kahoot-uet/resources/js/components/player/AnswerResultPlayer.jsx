import React, { useState } from "react";

import { Check2All, DashCircle, X } from "react-bootstrap-icons";
import IndexPlayer from "./IndexPlayer";

function AnswerResultPlayer(props) {
    const isCorrect = props.location.data.isCorrect;
    const question = props.location.data.question;
    const player = props.location.data.player;
    const playerId = props.location.data.id;
    const length = props.location.data.length;
    const score = props.location.data.score;
    const roomId = props.location.data.roomId;
    const orderNumber = props.location.data.orderNumber;
    const labelCorrect = ["Great!", "So cool!", "やった！"];
    const labelIncorrect = [
        "Nothing worth having comes easy!",
        "Great try!",
        "頑張れ。。。"
    ];

    return (
        <div>
            <IndexPlayer roomId={roomId}
                player={player}
                length={length}
                indexNumber={orderNumber}
                score={score}/>
            {isCorrect == true ? (
                <div className="lobby-main answer-result-correct">
                    <div className="text-1">Correct!</div>
                    <div>
                        <Check2All
                            color="white"
                            className="icons-svg check-logo"
                        />
                    </div>
                    <div className="result-point">{`+${score}`}</div>
                    <div className="text-2">
                        {
                            labelCorrect[
                                Math.floor(Math.random() * labelCorrect.length)
                            ]
                        }
                    </div>
                </div>
            ) : (
                <div className="lobby-main answer-result-incorrect">
                    <div className="text-1">Incorrect!</div>
                    <div>
                        <X color="white" className="icons-svg check-logo" />
                    </div>
                    <div className="result-point">+0</div>
                    <div className="text-2">
                        {
                            labelIncorrect[
                                Math.floor(
                                    Math.random() * labelIncorrect.length
                                )
                            ]
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnswerResultPlayer;
