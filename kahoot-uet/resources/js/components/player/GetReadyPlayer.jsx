import React, { useState, useEffect } from "react";
import IndexPlayer from "./IndexPlayer";

function GetReadyPlayer() {
    const [counter, setCounter] = useState(5);
    const [labelCounter, setLabelCounter] = useState("");

    useEffect(() => {
        counter > 1 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    useEffect(() => {
        switch (counter) {
            case 5:
                setLabelCounter("Ready...");
                break;
            case 4:
                setLabelCounter("Ready...");
                break;
            case 3:
                setLabelCounter("Ready...");
                break;
            case 2:
                setLabelCounter("Set...");
                break;
            case 1:
                setLabelCounter("Go!");
                break;
            default:
                break;
        }
    }, [counter]);

    return (
        <div>
            <IndexPlayer />
            <div className="lobby-main get-ready-main">
                <div className="text-1">Question 1</div>
                <div className="get-ready-countdown">
                    <div className="counter">{counter}</div>
                </div>
                <div className="text-2">{labelCounter}</div>
            </div>
        </div>
    );
}

export default GetReadyPlayer;