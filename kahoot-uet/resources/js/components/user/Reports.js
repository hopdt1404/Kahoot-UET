import React, { useState,useEffect } from "react";
import "./user.css";
import {
    CaretDownFill,
    BarChartFill,
    CaretRight,
    Pencil,
    Trash,
    ClipboardData
} from "react-bootstrap-icons";
import Header from "./Header";
import { Link } from "react-router-dom";
//import Data from API (test!!!!!!!!!!!!!!)
import DataReport from "./Reports/testShowReport.json";
import axios from "axios";

function route(id) {
    return "user-reports/detail/" + String(id);
}
function sortrecent(a,b){ // return newest
    let x = Date.parse(a.created_at);
    let y = Date.parse(b.created_at);
    return ( y-x );
}
function Reports() {
    const [data, setData] = useState(DataReport.sort(sortrecent));
    const [reportchoose,setReportChoose] = useState(0);
    const [newname,setNewName] =useState("");
    const config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      }
    useEffect(() => {
        axios.get("http://localhost:3000/api/auth/report",config)
            .then(res => {
                const getData = res.data;
                if (getData.reports){
                    setData(getData.reports.sort(sortrecent));
                }
            })
    }, [])

    
    function renameReport(){
        // axios rename
        let postdata={
            report_id:reportchoose,
            name:newname
        }
        axios.patch("http://localhost:3000/api/auth/report/rename",postdata,config)
        .then(res => {
            console.log(res);
        })
        let check = 0;
        while (data[check].id != reportchoose) {
            check += 1;
        }
        data[check].name=newname;
        setNewName("");
    }
    function deleteReport(){
        //axios delete
        let postdata={
            report_id:reportchoose
        }
        axios.patch("http://localhost:3000/api/auth/report/delete",postdata,config)
        .then(res => {
            console.log(res);
        })
        let check = 0;
        while (data[check].id != reportchoose) {
            check += 1;
        }
        data.splice(check,1);
        setReportChoose(0);
    }
    function exportReport(id){
        //axios export
        let postdata={
            report_id:reportchoose
        };
        axios.get("http://localhost:3000/api/auth/export",{
            config,
            params:{
                "report_id":reportchoose
            },
                responseType: 'blob'

        })
        .then(res => {
            return res.data;
        })

    }

    
    const [curpage, setCurpage] = useState(1);
    const perpage = 4;
    const totalpage = Math.ceil(data.length / perpage);
    let rend = data.slice((curpage - 1) * perpage, curpage * perpage);

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
                <td>{each.created_at}</td>
                <td>{each.number_player}</td>
                <td>
                    <div class="dropdown">
                        <button
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expandedreport_id="false"
                            style={{
                                border: "none",
                                backgroundColor: "white"
                            }}
                            onClick={e => setReportChoose(each.id)}>
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
                            <button class="dropdown-item" data-toggle="modal" data-target="#rename">
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
                            </button>
                            <button class="dropdown-item" data-toggle="modal" data-target="#delete" >
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
                            </button>
                            <button class="dropdown-item" onClick={e => exportReport(each.id)}>
                                <ClipboardData
                                    color="gray"
                                    className="icons-svg"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        marginRight: "10px"
                                    }}
                                />
                                Export report
                            </button>
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
                            <th scope="col">Created at</th>
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
            <div class="modal" id="rename">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Rename</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            <div class="d-flex m-3">
                                <div class="d-flex flex-fill">
                                    <span>New Name:</span>
                                    <input type="text" class="flex-fill" id="newname" onChange={e => setNewName(e.target.value)}/>
                                </div>
                                <button class="btn btn-success" data-dismiss="modal" onClick={e => renameReport()}>Rename</button>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal" id="delete">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Delete</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            <div class="d-flex m-3">
                                <div class="d-flex justify-content-center">
                                    <span>Are you sure to want to delete this Report?</span>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button class="btn btn-success" data-dismiss="modal" onClick={e => deleteReport()}>Corfirm</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;