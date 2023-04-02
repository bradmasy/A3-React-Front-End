import React from "react";
import "./Reports.css"
import NavBar from "../../../Navigation/NavBar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Reports = () => {
    return (

        <div>
            <NavBar />
            <div id="reports-container">
                <div id="reports-container-row">
                    <div id="reports-container-blocks">

                        <div className="report-link-div">
                            <div className="report-name">
                                <Link to="/unique-users">Unique Users Report  </Link>
                            </div>
                        </div>
                        <div className="report-link-div">
                            <div className="report-name">
                                <Link to="/top-api-users"> Top API Users Report</Link>
                            </div>
                        </div>
                        <div className="report-link-div">
                            <div className="report-name">
                                <Link to="/top-users-for-each-endpoint">Top Users For Each Endpoint Report</Link>
                            </div>
                        </div>
                        <div className="report-link-div">
                            <div className="report-name">
                                <Link to="/400-errors"> 400 Errors Report</Link>
                            </div>
                        </div>
                        <div className="report-link-div">
                            <div className="report-name">
                                <Link to="/recent-errors">Recent 400/500 Errors Report</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Reports;