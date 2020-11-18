import React from "react";
import PropTypes from "prop-types";
import "./index.css";

Question.propTypes = {
  orderNumber: PropTypes.number,
  question: PropTypes.object,
  questionLength: PropTypes.number,
  handleRemove: PropTypes.func,
  handleDuplicate: PropTypes.func,
  handleClick: PropTypes.func,
};
function Question(props) {
  return (
    <div className="questionBlock">
      <div className="blockHeader">
        <p className="order">{props.orderNumber + 1}</p>
        <p className="qType">&ensp;{props.question.questionType}</p>
      </div>
      <div className="blockBody">
        <div className="col-left">
          <img style={{marginBottom:"5px"}}
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTUuNjk5IDU1LjY5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTUuNjk5IDU1LjY5OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzAxMDAwMjsiIGQ9Ik01MS41MSwxOC4wMDFjLTAuMDA2LTAuMDg1LTAuMDIyLTAuMTY3LTAuMDUtMC4yNDhjLTAuMDEyLTAuMDM0LTAuMDItMC4wNjctMC4wMzUtMC4xDQoJCWMtMC4wNDktMC4xMDYtMC4xMDktMC4yMDYtMC4xOTQtMC4yOTF2LTAuMDAxbDAsMGMwLDAtMC4wMDEtMC4wMDEtMC4wMDEtMC4wMDJMMzQuMTYxLDAuMjkzYy0wLjA4Ni0wLjA4Ny0wLjE4OC0wLjE0OC0wLjI5NS0wLjE5Nw0KCQljLTAuMDI3LTAuMDEzLTAuMDU3LTAuMDItMC4wODYtMC4wM2MtMC4wODYtMC4wMjktMC4xNzQtMC4wNDgtMC4yNjUtMC4wNTNDMzMuNDk0LDAuMDExLDMzLjQ3NSwwLDMzLjQ1MywwSDIyLjE3Nw0KCQljLTMuNjc4LDAtNi42NjksMi45OTItNi42NjksNi42N3YxLjY3NGgtNC42NjNjLTMuNjc4LDAtNi42NywyLjk5Mi02LjY3LDYuNjdWNDkuMDNjMCwzLjY3OCwyLjk5Miw2LjY2OSw2LjY3LDYuNjY5aDIyLjY3Nw0KCQljMy42NzcsMCw2LjY2OS0yLjk5MSw2LjY2OS02LjY2OXYtMS42NzVoNC42NjRjMy42NzgsMCw2LjY2OS0yLjk5MSw2LjY2OS02LjY2OVYxOC4wNjlDNTEuNTI0LDE4LjA0NSw1MS41MTIsMTguMDI1LDUxLjUxLDE4LjAwMXoNCgkJIE0zNC40NTQsMy40MTRsMTMuNjU1LDEzLjY1NWgtOC45ODVjLTIuNTc1LDAtNC42Ny0yLjA5NS00LjY3LTQuNjdWMy40MTR6IE0zOC4xOTEsNDkuMDI5YzAsMi41NzQtMi4wOTUsNC42NjktNC42NjksNC42NjlIMTAuODQ1DQoJCWMtMi41NzUsMC00LjY3LTIuMDk1LTQuNjctNC42NjlWMTUuMDE0YzAtMi41NzUsMi4wOTUtNC42Nyw0LjY3LTQuNjdoNS42NjNoNC42MTR2MTAuMzk5YzAsMy42NzgsMi45OTEsNi42NjksNi42NjgsNi42NjloMTAuNA0KCQl2MTguOTQyTDM4LjE5MSw0OS4wMjlMMzguMTkxLDQ5LjAyOXogTTM2Ljc3NywyNS40MTJoLTguOTg2Yy0yLjU3NCwwLTQuNjY4LTIuMDk0LTQuNjY4LTQuNjY5di04Ljk4NUwzNi43NzcsMjUuNDEyeg0KCQkgTTQ0Ljg1NSw0NS4zNTVoLTQuNjY0VjI2LjQxMmMwLTAuMDIzLTAuMDEyLTAuMDQ0LTAuMDE0LTAuMDY3Yy0wLjAwNi0wLjA4NS0wLjAyMS0wLjE2Ny0wLjA0OS0wLjI0OQ0KCQljLTAuMDEyLTAuMDMzLTAuMDIxLTAuMDY2LTAuMDM2LTAuMWMtMC4wNDgtMC4xMDUtMC4xMDktMC4yMDUtMC4xOTQtMC4yOWwwLDBsMCwwYzAtMC4wMDEtMC4wMDEtMC4wMDItMC4wMDEtMC4wMDJMMjIuODI5LDguNjM3DQoJCWMtMC4wODctMC4wODYtMC4xODgtMC4xNDctMC4yOTUtMC4xOTZjLTAuMDI5LTAuMDEzLTAuMDU4LTAuMDIxLTAuMDg4LTAuMDMxYy0wLjA4Ni0wLjAzLTAuMTcyLTAuMDQ4LTAuMjYzLTAuMDUzDQoJCWMtMC4wMjEtMC4wMDItMC4wNC0wLjAxMy0wLjA2Mi0wLjAxM2gtNC42MTRWNi42N2MwLTIuNTc1LDIuMDk1LTQuNjcsNC42NjktNC42N2gxMC4yNzd2MTAuNGMwLDMuNjc4LDIuOTkyLDYuNjcsNi42Nyw2LjY3aDEwLjM5OQ0KCQl2MjEuNjE2QzQ5LjUyNCw0My4yNiw0Ny40MjksNDUuMzU1LDQ0Ljg1NSw0NS4zNTV6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
              onClick={()=>{props.handleDuplicate(props.orderNumber)}}
              height="15px"
              alt={"duplicate"}
          />
          <img
              src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ0OHB0IiB2aWV3Qm94PSItNjkgMCA0NDggNDQ4LjAwNDQ2IiB3aWR0aD0iNDQ4cHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTI4My40Mjk2ODggNDUuNzE0ODQ0aC03My4xNDA2MjZ2LTE4LjI4NTE1NmMwLTE1LjEyNS0xMi4zMDQ2ODctMjcuNDI5Njg4LTI3LjQyOTY4Ny0yNy40Mjk2ODhoLTU0Ljg1NTQ2OWMtMTUuMTI1IDAtMjcuNDI5Njg3IDEyLjMwNDY4OC0yNy40Mjk2ODcgMjcuNDI5Njg4djE4LjI4NTE1NmgtNzMuMTQ0NTMxYy0xNS4xMjUgMC0yNy40MjU3ODE3NSAxMi4zMDQ2ODctMjcuNDI1NzgxNzUgMjcuNDI5Njg3djQ1LjcxMDkzOGgxOC4yODUxNTU3NXYzMDEuNzE4NzVjMCAxNS4xMjUgMTIuMzAwNzgyIDI3LjQyOTY4NyAyNy40MjU3ODIgMjcuNDI5Njg3aDIxOS40Mjk2ODdjMTUuMTI1IDAgMjcuNDI5Njg4LTEyLjMwNDY4NyAyNy40Mjk2ODgtMjcuNDI5Njg3di0zMDEuNzE4NzVoMTguMjg1MTU2di00NS43MTA5MzhjMC0xNS4xMjUtMTIuMzA0Njg3LTI3LjQyOTY4Ny0yNy40Mjk2ODctMjcuNDI5Njg3em0tMTY0LjU3MDMxMy0xOC4yODUxNTZjMC01LjA0Mjk2OSA0LjA5NzY1Ni05LjE0NDUzMiA5LjE0NDUzMS05LjE0NDUzMmg1NC44NTU0NjljNS4wNDY4NzUgMCA5LjE0NDUzMSA0LjEwMTU2MyA5LjE0NDUzMSA5LjE0NDUzMnYxOC4yODUxNTZoLTczLjE0NDUzMXptMTU1LjQyOTY4NyAzOTMuMTQ0NTMxYzAgNS4wNDY4NzUtNC4wOTc2NTYgOS4xNDQ1MzEtOS4xNDQ1MzEgOS4xNDQ1MzFoLTIxOS40Mjk2ODdjLTUuMDQyOTY5IDAtOS4xNDA2MjUtNC4wOTc2NTYtOS4xNDA2MjUtOS4xNDQ1MzF2LTMwMS43MTg3NWgyMzcuNzE0ODQzem0xOC4yODUxNTctMzIwLjAwMzkwN2gtMjc0LjI4NTE1N3YtMjcuNDI1NzgxYzAtNS4wNDI5NjkgNC4wOTc2NTctOS4xNDQ1MzEgOS4xNDA2MjYtOS4xNDQ1MzFoMjU2YzUuMDQ2ODc0IDAgOS4xNDQ1MzEgNC4xMDE1NjIgOS4xNDQ1MzEgOS4xNDQ1MzF6bTAgMCIvPjxwYXRoIGQ9Im0yMTAuMjg5MDYyIDM4NC4wMDM5MDZjNS4wNTQ2ODggMCA5LjE0MDYyNi00LjA4OTg0NCA5LjE0MDYyNi05LjE0MDYyNXYtMjAxLjE0ODQzN2MwLTUuMDUwNzgyLTQuMDg1OTM4LTkuMTQ0NTMyLTkuMTQwNjI2LTkuMTQ0NTMyLTUuMDU0Njg3IDAtOS4xNDQ1MzEgNC4wOTM3NS05LjE0NDUzMSA5LjE0NDUzMnYyMDEuMTQ4NDM3YzAgNS4wNTA3ODEgNC4wODk4NDQgOS4xNDA2MjUgOS4xNDQ1MzEgOS4xNDA2MjV6bTAgMCIvPjxwYXRoIGQ9Im0xNTUuNDI5Njg4IDM4NC4wMDM5MDZjNS4wNTQ2ODcgMCA5LjE0NDUzMS00LjA4OTg0NCA5LjE0NDUzMS05LjE0MDYyNXYtMjAxLjE0ODQzN2MwLTUuMDUwNzgyLTQuMDg5ODQ0LTkuMTQ0NTMyLTkuMTQ0NTMxLTkuMTQ0NTMyLTUuMDUwNzgyIDAtOS4xNDA2MjYgNC4wOTM3NS05LjE0MDYyNiA5LjE0NDUzMnYyMDEuMTQ4NDM3YzAgNS4wNTA3ODEgNC4wODk4NDQgOS4xNDA2MjUgOS4xNDA2MjYgOS4xNDA2MjV6bTAgMCIvPjxwYXRoIGQ9Im0xMDAuNTc0MjE5IDM4NC4wMDM5MDZjNS4wNTQ2ODcgMCA5LjE0MDYyNS00LjA4OTg0NCA5LjE0MDYyNS05LjE0MDYyNXYtMjAxLjE0ODQzN2MwLTUuMDUwNzgyLTQuMDg1OTM4LTkuMTQ0NTMyLTkuMTQwNjI1LTkuMTQ0NTMyLTUuMDU0Njg4IDAtOS4xNDQ1MzEgNC4wOTM3NS05LjE0NDUzMSA5LjE0NDUzMnYyMDEuMTQ4NDM3YzAgNS4wNTA3ODEgNC4wODk4NDMgOS4xNDA2MjUgOS4xNDQ1MzEgOS4xNDA2MjV6bTAgMCIvPjwvc3ZnPg=="
              onClick={()=>{props.questionLength>1?props.handleRemove(props.orderNumber):console.log("Het")}}
              height="15px"
              alt={"remove"}
          />
        </div>
        <div className="col-right" onClick={()=>props.handleClick(props.orderNumber)}>
          <p className="title">
            {props.question.questionContent !== ""
              ? props.question.questionContent
              : "Type your question"}
          </p>
          <div className="description">
              <p className="timeLimit">{props.question.timeLimit}</p>
              <div className="image">
                <img height={"30px"} src={props.question.image} className="image" alt={"image"}/>
              </div>
            </div>
          <div className="answers">
            {props.question.answers.map((answer) => {
                  return (
                      <div className="choice">
                        <div className="answer"/>
                        <div id={answer.correct ? "correct" : "incorrect"}/>
                      </div>
                  );
                }
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
