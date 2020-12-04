import React from "react";
import "./index.css";
import useState from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { Redirect, Route } from "react-router";
import {
    setSummary
} from "../../actions/summary";
import {Link} from 'react-router-dom';
function Header() {
    const [state, setState] = React.useState({ title: "", description: "" });
    const [showModal, setShowModal] = React.useState(false);
    const [exitClick, setExitClick] = React.useState(false);
    const summary = useSelector(state => state.summary);
    const questionList = useSelector(state => state.list.qlist);
    const dispatch = useDispatch();

    const handleExit = () => {
        setExitClick(true);
    };
    const handleSummary = () => {
        const action = setSummary(state);
        dispatch(action);
    }
    const handleSubmit = () => {
        console.log(JSON.stringify({ questionList, summary }));
        console.log("Submit");
        Axios.post('http://127.0.0.1:8000/api/auth/topic/create',{
              summary,questionList
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    };
    return (
        <div className="header00">
            <div className="header">
                <div className="left">
                    <img
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA4NzggMzEzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA4NzggMzEzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxODYuNiw4NiAxNDkuNyw3MS45IDc3LjcsMTQwLjUgNzcuNyw1NC44IDM1LjEsNjUuNiAzNS4xLDI2NyA3Ny43LDI2OC41IDc3LjQsMTk4IDEwMy42LDE3Mi43IAoJCTEzMS4zLDI2OC41IDE2OSwyNjguNSAxMzQuMywxNDMuNSAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9Ijc5Ny4zLDI1NC4yIDc4Ni45LDI3OC44IDgwOS4zLDI5NC4yIDgzMS4zLDI4MS4xIDgyMS45LDI1NC4yIAkiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03NDIuOCwyMTMuOGMwLDAtMTEuNiw2LjgtMjQsNi44Yy0xMi41LDAtMTIuNy02LjEtMTIuNy02LjFsLTMuMy03Ny4xbDM5LjgtMi4ydi0yNS41bC00MC45LTIuOGwwLjYtNTIuMQoJCUw2NzMuOCw0M1YxMDJsLTMxLjgtMS4xbDYuMSw0MS45aDI1LjdsMC43LDM4LjFjMS41LDQsMi43LDgsMy40LDEyLjFjMS43LDguNiwxLjgsMTcuNywwLjQsMjYuM2MtMC42LDMuNy0xLjYsNy40LTIuOSwxMS4yCgkJbDAuMiwxMi4xYzAsMC00LDM1LjgsNTAuNywyNy43YzAsMCwxNy4xLTUuMSwxNi41LTE3LjFWMjEzLjh6Ii8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9Ijg0Mi45LDU1LjIgNzY3LjYsNDAuOCA4MTMuOSwyNDAgCSIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3Ny42LDExMC40bDkuOSwyNi4xYzI0LjgtMTQuOSwzOC43LDAsMzguNywwbC0wLjIsMTYuN2MtNzMuOCwxMy01NS4xLDgxLjMtNTUuMSw4MS4zCgkJYzcuNSwyNi44LDMxLjgsMjUuOSwzMS44LDI1LjlIMjU4bDEuMS0xMjQuM0MyNTAuNSw3OC4zLDE3Ny42LDExMC40LDE3Ny42LDExMC40eiBNMjI2LjEsMjM2LjVjLTQ4LjUsOC43LTI5LjQtNjUuNiwwLjktNTUKCQlDMjI2LjksMTg3LjcsMjI2LjEsMjM2LjUsMjI2LjEsMjM2LjV6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjMwLDIzMi45QzYzMCwyMzIuOSw2MzAsMjMyLjksNjMwLDIzMi45QzYzMCwyMzIuOSw2MzAsMjMyLjksNjMwLDIzMi45eiIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzMCwyMzIuOUM2MzAsMjMyLjksNjMwLDIzMi45LDYzMCwyMzIuOUM2MzAsMjMyLjksNjMwLDIzMi45LDYzMCwyMzIuOXoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02MzAsMjMyLjlDNjMwLDIzMi45LDYzMCwyMzIuOSw2MzAsMjMyLjlDNjMwLDIzMi45LDYzMCwyMzIuOSw2MzAsMjMyLjl6Ii8+Cgk8Zz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTIwLjIsMTY1Yy00LjktMzkuNi0yNC42LTkxLjktNjguOC0xMDAuM2MtMy45LTguNS0yLjQtMTQuNCw1LjUtMTcuNGMtMS41LTAuNi02LjctMi43LTkuNC0zLjcKCQkJYy0yLTIuOC0xMC40LDEwLjUtMTIuNSwyMC4yYy05LjUsMC44LTE4LDguMy0yNS42LDIwYy0yMS45LDMzLjMtMzcuOSwxMDkuNy0zMC4zLDE1MC41YzIuNSwyNC40LDM4LDMwLjksNjIuNiwyMgoJCQljMC43LTAuOSw4LjQsMy43LDE4LjUsMy44YzE2LjUsMS41LDQ3LjUtMTAuMSw1NC4yLTI4LjljMS4zLTIuNiwxLjgtMy44LDAuMS02LjljLTYuNy0xOC42LTUuMi0zOC43LDQuNy01NS4yCgkJCUM1MjAuMywxNjcuNCw1MjAuOCwxNjcuNCw1MjAuMiwxNjV6IE00NzIuOCwxNjkuOWw4LjksMTdoMGwtMTkuMy0wLjNMNDcyLjgsMTY5Ljl6IE00NTIuNCwxMzkuNGMyMC4xLDEuMiwxOC40LDI4LjYsMCwyOS4xCgkJCUM0MzIuMywxNjcuMyw0MzQsMTM5LjksNDUyLjQsMTM5LjR6IE00OTcuOSwyMDQuMWMtMC4zLDYuNy0xLjcsMTQuMy02LjQsMjAuNGMtMSwwLjktNSw2LjYtNC4xLDIuMWMwLTIuNiwwLjItNS45LDAuMS01LjYKCQkJYy0wLjgsMC05LjEsMC0xMC42LDBjLTEuMS0xLDAuOCwxMi4yLTEuMywxMS40Yy0yMiw1LjUtNTEuMS03LjktNjMuMy0zNC4zYzMuOCwwLDM5LjQsMCw0Mi41LDBjMC42LTEuMiwwLDcuNywwLjIsMTAuOQoJCQljLTAuMSwwLjksMCwwLjMsMS43LDAuNGMzLjcsMCwxMS41LDAsMTEuNiwwYzAsMCwwLTEyLDAtMTEuM2MwLjgsMCwyNi0xLjIsMjktMS4zQzQ5OC4xLDE5Ni4yLDQ5Ny44LDIwMC42LDQ5Ny45LDIwNC4xegoJCQkgTTQ5MS42LDE2OC41Yy0yMC4xLTEuMi0xOC40LTI4LjYsMC0yOS4xQzUxMS43LDE0MC42LDUxMCwxNjguMSw0OTEuNiwxNjguNXoiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzY2LjYsMjAxLjZjMC42LTEyLjQsMi4xLTI1LjgsNC41LTM5LjJsLTEuMS03LjljLTUuNy01Ny42LTI2LjgtNTcuOC02Ni41LTQ1LjNsLTAuNy05MC4zbC0zNi4zLDkuNQoJCQlsNS45LDIyMy4ybDM1LjgsMS4zbC0yLTExNS4zYzcuOS0zLjUsMzMuOC0xMC42LDM0LjcsMTcuOGwzLjUsNDAuNmwyLjQsNTcuMWgyOC40Yy0zLjItNC42LTUuNS0xMC44LTYuOS0xOC43CgkJCUMzNjYuNiwyMjUuNCwzNjYuMSwyMTQuNCwzNjYuNiwyMDEuNnoiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjY4LjEsMjAwLjVjLTEuMy0yNS4zLTI0LjgtNDUuOC01MC45LTQ0LjljMS40LTguOS0zLjgtMTktOS44LTI2LjNjLTAuOC0wLjUtMS4zLTMuMi0zLjItMi4xCgkJCWMtMy44LDEuNS03LjksMi45LTEyLjYsNC41YzAuNiwwLjIsMS41LDAuNSwyLjgsMS4yYzUuMiwyLjIsOCw4LjcsNS45LDE0LjdjLTIuMSw0LjUtMS44LDQuNy0yLjgsNC4xYzIuNC0yLjksMi4xLTEuOCwxLDAuNgoJCQljLTI5LjctMTMuNy02Ny4zLDQuMy03NS4zLDM1LjNjLTE1LDYxLjQsNjUsODguMSwxMTIuNyw3MS4zQzY1OC41LDI1MC42LDY3MC45LDIyMi45LDY2OC4xLDIwMC41eiBNNTkyLjIsMjAyLjQKCQkJYzIuNy00LjIsMi45LDUuOSw0LjUsOS43YzAuNiwyLjIsMSwzLjIsMS41LDYuMWMtMC41LTAuMS0wLjktMC4yLTIuNS0wLjZjLTUuMi0xLjMtOS4zLTIuNC0xNS0zLjcKCQkJQzU4NC4zLDIxMC40LDU4OC42LDIwNiw1OTIuMiwyMDIuNHogTTU2MS42LDE4MS42YzMtMy4xLDYuOS03LjEsMTAuMi0xMC4zYzIuNCw4LjksNC45LDE4LjMsNy4zLDI3LjUKCQkJQzU0NSwxODkuMSw1NDguNiwxOTYuMSw1NjEuNiwxODEuNnogTTYzMCwyMzIuOWMtMTIuMiwyMy01Mi41LDE2LjktNzEuMiwyLjhjLTQuNy0yLTE3LTE5LjgtMTEuNy0yMy4zYzUuMywxLjMsOS42LDIuNCwxNS40LDMuOAoJCQljMTIuMywzLDIzLjMsNS42LDM1LjYsOC44YzAuNCwyLjYtMS40LDUuOC0xLjksOS40YzIsMC44LDQuNywxLjIsNy43LDJjMS45LDAuMywyLjEsMC45LDUuMSwxLjFjMS40LTIuNCwwLjctNi40LDIuNy05CgkJCUM2MTcuMywyMjkuOSw2MjQuMiwyMzEuNyw2MzAsMjMyLjl6IE02MTEuOSwyMDYuN2MtOC42LTAuNSwxLjEtNC45LDMuNy04LjljMTIuOC0xMi40LDEyLjctMTIuOCwxMy0xMS41CgkJCWMtOC43LDcuMS00LjksMy42LTAuMy0xLjJDNjM3LDIyMiw2NDAuOSwyMTIsNjExLjksMjA2Ljd6Ii8+Cgk8L2c+CjwvZz4KPC9zdmc+Cg=="
                        alt="logo"
                    />
                    <div
                        className="settings"
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        <div className="title">
                            {summary.title !== ""
                                ? summary.title
                                : "Enter kahoot title..."}
                        </div>
                        <div className="sbutton">Settings</div>
                    </div>

                    <span className="status" hidden={true}>
                        {summary.saveLocation !== ""
                            ? summary.saveLocation
                            : "Save to ..."}
                    </span>
                </div>

                <div className="right">
                    <div className="preview">Preview</div>
                    <button
                        className="exit submit"
                        onClick={() => {
                            handleExit();
                        }}
                    >
                        Exit
                    </button>
                    <Link to="/kahoots">
                    <button
                        onClick={() => {
                            handleSubmit();
                        }}
                        className="done submit"
                    >
                        Done
                    </button>
                    </Link>
                    
                </div>
            </div>
            {showModal && (
                <div className="modal">
                    <div
                        className="modalBg"
                        onClick={() => {
                            setShowModal(false);
                        }}
                    ></div>
                    <div className="modalContent">
                        <h2>Kahoot summary</h2>
                        <label htmlFor="title">Title</label>
                        <input
                            className="title"
                            name="title"
                            type="text"
                            placeholder="Enter kahoot title"
                            onBlur={e =>
                                setState({ ...state, title: e.target.value })
                            }
                            defaultValue={summary.title}
                            autoFocus
                        />
                        <label htmlFor="description">
                            Description<span>(Optional)</span>
                        </label>
                        <textarea
                            className="description"
                            name="description"
                            onBlur={e =>
                                setState({
                                    ...state,
                                    description: e.target.value
                                })
                            }
                            defaultValue={summary.description}
                        />
                        <div className="submit-summary">
                            <button
                                className="cancel"
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button className="done" onClick={()=>{setShowModal(false);handleSummary()}}>Done</button>
                        </div>
                    </div>
                </div>
            )}
            {exitClick && <Redirect to="/" />}
        </div>
    );
}

export default Header;
