import React, { useState } from "react";
import NavBar from "../../../Navigation/NavBar";
import "./Graph.css";
import GraphChart from "./GraphChart";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const getTokens = (headers) => {
    const splitHeader = headers.split(" ");
    return [splitHeader[1], splitHeader[3]];
}

const verifyAdmin = async (headers) => {
    const requestHeader = {
        "authorization": headers.authorization,
        "Content-Type": "application/json"
    }
    // make request to backend
    const response = await axios.get("http://localhost:5000/api/v1/verify-admin", { headers: requestHeader });
    console.log(response)
    return response.data;
}


const Graph = ({ headers, type }) => {

    const nav = useNavigate();
    
    const [admin, setAdmin] = useState({});
    const [userData, setUserData] = useState([]);
    const [graphData, setGraphData] = useState({});

    useEffect(() => {
        const verifyAdminPage = async () => {
            let token = await verifyAdmin(headers);
            console.log(token);
            setAdmin(token);
        }
        verifyAdminPage();
    }, [])

    console.log(headers);

    useEffect(() => {
        const accessDB = async (query) => {
            const requestHeader = {
                "authorization": headers.authorization,
                "Content-Type": "application/json"
            }
            const response = await axios.get(`http://localhost:5000/api/v1/db-info/${query}`, { headers: requestHeader });
            console.log(response.data);
            const data = "period" in response.data.data ? { title: type, period: response.data.data.period, data: response.data.data.users } : { title: type, data: response.data.data.users };
            setUserData(data);
            setGraphData(response.data.data);
        }

        accessDB(type);

    }, [admin])

    useEffect(() => {
        const setGraphInfo = async () => {



        };

        setGraphInfo();
    }, [admin, userData])

    return (
        <div id="dashboard-container">
            <NavBar />
            <div id="title">
                    <h1>Analytics</h1>
                </div>
            <div id="chart-container">
            
                <div id="chart-container-row">

                    <div id="chart-container-final">
                        <GraphChart graphData={userData} />
                    </div>
                </div>
                <div id="back-button">
                    <button onClick={ e =>{
                        nav("/reports", {headers: headers})
                    }}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Graph;