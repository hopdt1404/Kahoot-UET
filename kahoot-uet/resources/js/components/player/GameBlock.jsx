// show 4 answers

import React from "react";

import { TriangleFill, SquareFill } from "react-bootstrap-icons";
import IndexPlayer from "./IndexPlayer";

function GameBlock() {
    return (
        <div>
            <IndexPlayer />
            <div class="game-block-main">
                <div class="row justify-content-md-center text-center">
                    <div class="col-md-5 common-button game-block-red">
                        {/* <span className="triangle"></span> */}
                    </div>
                    <div class="col-md-5 common-button game-block-blue">
                        {/* <span className="rhombus-1"></span> */}
                    </div>
                    <div class="col-md-5 common-button game-block-yellow">
                        {/* <span className="circle"></span> */}
                    </div>
                    <div class="col-md-5 common-button game-block-green">
                        {/* <span className="square"></span> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameBlock;
