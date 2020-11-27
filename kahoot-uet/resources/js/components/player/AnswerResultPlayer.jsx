import React, { useState } from "react";

import { Check2All, DashCircle, X } from "react-bootstrap-icons";
import IndexPlayer from "./IndexPlayer";

function AnswerResultPlayer() {
    const [isCorrect, setIsCorrect] = useState(false);
    const labelCorrect = ["Great!", "So cool!", "やった！"];
    const labelIncorrect = [
        "Nothing worth having comes easy!",
        "Great try!",
        "頑張れ。。。"
    ];

    return (
        <div>
            <IndexPlayer />
            {isCorrect == true ? (
                <div className="lobby-main answer-result-correct">
                    <div className="text-1">Correct!</div>
                    <div>
                        <Check2All
                            color="white"
                            className="icons-svg check-logo"
                        />
                    </div>
                    <div className="result-point">+300</div>
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