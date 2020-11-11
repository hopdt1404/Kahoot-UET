import React from "react";
import "../user.css";
import {
    CaretDownFill,
    BarChartFill,
    CaretRight,
    Pencil,
    Trash
} from "react-bootstrap-icons";
import Header from "./Header";

//import Data from API (test!!!!!!!!!!!!!!)
import DataReport from "./Reports/testShowReport.json";

function Reports() {
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
                            <th scope="col">Num</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status game</th>
                            <th scope="col">Date</th>
                            <th scope="col">Game mode</th>
                            <th scope="col">No. of players</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>test1</td>
                            <td>Finished</td>
                            <td>Oct 14 2020, 10:32 pm</td>
                            <td>Single</td>
                            <td>5</td>
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
                                        <a class="dropdown-item" href="#">
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
                                        </a>
                                        <a class="dropdown-item" href="#">
                                            <CaretRight
                                                color="gray"
                                                className="icons-svg"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    marginRight: "10px"
                                                }}
                                            />
                                            Play Again
                                        </a>
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
                        <tr>
                            <th scope="row">2</th>
                            <td>test2</td>
                            <td>Finished</td>
                            <td>Oct 14 2020, 10:32 pm</td>
                            <td>Team mode</td>
                            <td>522222</td>
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
                                        <a class="dropdown-item" href="#">
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
                                        </a>
                                        <a class="dropdown-item" href="#">
                                            <CaretRight
                                                color="gray"
                                                className="icons-svg"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    marginRight: "10px"
                                                }}
                                            />
                                            Play Again
                                        </a>
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
                        <tr>
                            <th scope="row">3</th>
                            <td>test3</td>
                            <td>Finished</td>
                            <td>Oct 14 2020, 10:32 pm</td>
                            <td>Single</td>
                            <td>1115</td>
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
                                        <a class="dropdown-item" href="#">
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
                                        </a>
                                        <a class="dropdown-item" href="#">
                                            <CaretRight
                                                color="gray"
                                                className="icons-svg"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    marginRight: "10px"
                                                }}
                                            />
                                            Play Again
                                        </a>
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
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Reports;
