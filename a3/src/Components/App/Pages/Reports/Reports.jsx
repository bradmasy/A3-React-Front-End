import React, { useEffect } from "react";
import "./Reports.css"
import NavBar from "../../../Navigation/NavBar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Reports = ({ headers }) => {

    const [user, setUser] = useState({});
    const checkingAdmin = async () => {
        const API_URL = "http://localhost:5000/api/v1/verify-admin";

        console.log(headers.authorization)

        const splitHeader = headers.authorization.split(" ");

        const header = {
            "authorization": `Bearer ${splitHeader[1]} Refresh ${splitHeader[3]}`,
            "Content-Type": "application/json"

        }

        const response = await axios.get(API_URL, { headers: header });
        console.log(response.data);
        setUser(response.data);
    }


    useEffect(() => {
        const checkIfAdmin = async () => {
            await checkingAdmin();
        }
        checkIfAdmin();
    }, [])

    return (

        <div>
            <NavBar />
            <div id="reports-container">
                <div id="reports-container-row">
                    <div id="username">
                        <h1> Welcome, {user.username}!</h1>
                    </div>
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