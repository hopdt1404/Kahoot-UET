import React, { useState } from "react";
import "./user.css";
import {
    CaretDownFill,
    BarChartFill,
    CaretRight,
    Pencil,
    Trash
} from "react-bootstrap-icons";
import Header from "./Header";
import { Link } from "react-router-dom";
//import Data from API (test!!!!!!!!!!!!!!)
import DataReport from "./Reports/testShowReport.json";
import axios from "axios";

function route(id) {
    return "user-reports/detail/" + String(id);
}
function Reports() {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      }
    const [data, setData] = useState(DataReport);
    axios.get("httlp://localhost:3000/api/user-reports",config)
    .then(res => {
        const getData = res.data;
        if (getData.reportList){
            setData(getData.reportList);
        }
    })
    const [curpage, setCurpage] = useState(1);
    const perpage = 4;
    const totalpage = Math.ceil(data.length / perpage);
    const rend = data.slice((curpage - 1) * perpage, curpage * perpage);
    let firstbtn = null;
    let prevpagebtn = null;
    let lastbtn = null;
    let nextpagebtn = null;
    let curpagebtn = null;
    if (totalpage !== 0) {
        if (curpage !== 1) {
            firstbtn = (
                <li class="page-item">
                    <button
                        class="page-link"
                        href="#"
                        onClick={() => setCurpage(1)}
                    >
                        First Page
                    </button>
                </li>
            );
        }

        if (curpage !== 1) {
            prevpagebtn = (
                <li class="page-item">
                    <button
                        class="page-link"
                        href="#"
                        onClick={() => setCurpage(curpage - 1)}
                    >
                        {curpage - 1}
                    </button>
                </li>
            );
        }

        if (curpage !== totalpage) {
            lastbtn = (
                <li class="page-item">
                    <button
                        class="page-link"
                        href="#"
                        onClick={() => setCurpage(totalpage)}
                    >
                        Last Page
                    </button>
                </li>
            );
        }

        if (curpage !== totalpage) {
            nextpagebtn = (
                <li class="page-item">
                    <button
                        class="page-link"
                        href="#"
                        onClick={() => setCurpage(curpage + 1)}
                    >
                        {curpage + 1}
                    </button>
                </li>
            );
        }
        curpagebtn = (
            <li class="page-item active" id="cur">
                <button class="page-link">{curpage}</button>
            </li>
        );
    }

    const rendtable = rend.map((each, index) => {
        return (
            <tr>
                <th scope="row">{(curpage - 1) * perpage + index + 1}</th>
                <td>{each.name}</td>
                <td>{each.statusGame}</td>
                <td>{each.date}</td>
                <td>{each.gameMode}</td>
                <td>{each.numberOfPlayers}</td>
                <td>
                    <div class="dropdown">
                        <button
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{
                                border: "none",
                                backgroundColor: "white"
                            }}
                        >
                            <CaretDownFill
                                color="black"
                                className="icons-svg"
                            />
                        </button>

                        <div
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <Link class="dropdown-item" to={route(each.id)}>
                                <BarChartFill
                                    color="gray"
                                    className="icons-svg"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        marginRight: "10px"
                                    }}
                                />
                                Open report
                            </Link>
                            <a class="dropdown-item" href="#">
                                <Pencil
                                    color="gray"
                                    className="icons-svg"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        marginRight: "10px"
                                    }}
                                />
                                Rename
                            </a>
                            <a class="dropdown-item" href="#">
                                <Trash
                                    color="gray"
                                    className="icons-svg"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        marginRight: "10px"
                                    }}
                                />
                                Delete
                            </a>
                        </div>
                    </div>
                </td>
            </tr>
        );
    });
    return (
        <div>
            <Header />
            <div class="reports-body">
                <form
                    class="form-inline"
                    style={{ float: "right", margin: "20px" }}
                >
                    <input
                        class="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button
                        class="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
                <table class="table css-table">
                    <thead>
                        <tr>
                            <th scope="col">Num </th>
                            <th scope="col">Name</th>
                            <th scope="col">Status game</th>
                            <th scope="col">Date</th>
                            <th scope="col">Game mode</th>
                            <th scope="col">No. of players</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>{rendtable}</tbody>
                </table>
                <ul
                    class="pagination justify-content-center"
                    style={{ margin: "20px 0" }}
                >
                    {firstbtn}
                    {prevpagebtn}
                    {curpagebtn}
                    {nextpagebtn}
                    {lastbtn}
                </ul>
            </div>
        </div>
    );
}

export default Reports;
