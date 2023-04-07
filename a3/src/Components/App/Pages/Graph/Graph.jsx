import React, { useState } from "react";
import NavBar from "../../../Navigation/NavBar";
import "./Graph.css";
import GraphChart from "./GraphChart";
import { useEffect } from "react";
import axios from "axios";

const getTokens = (headers)=>{
    const splitHeader = headers.split(" ");
    return [splitHeader[1], splitHeader[3]];
}

const verifyAdmin = async (headers) =>{
    // const access = tokens[0];
    // const refresh = tokens[1];

    const requestHeader ={
        "authorization": headers.authorization,
        "Content-Type": "application/json"
    }
    // make request to backend
    const response = await axios.get("http://localhost:5000/api/v1/verify-admin", { headers:requestHeader });
    console.log(response)
    return response.data;
}


const Graph = ({headers,type}) => {
    const [admin, setAdmin] = useState({});
    const [userData, setUserData] = useState([]);
    const [graphData, setGraphData] = useState({});

    useEffect(() => {
        const verifyAdminPage = async ()=>{
            let token = await verifyAdmin(headers);
            console.log(token);
            setAdmin(token);
        }
        verifyAdminPage();
    },[])

    console.log(headers);

    useEffect(()=>{
        const accessDB = async (query)=>{
            const requestHeader ={
                "authorization": headers.authorization,
                "Content-Type": "application/json"
            }
            const response = await axios.get(`http://localhost:5000/api/v1/db-info/${query}`, { headers:requestHeader });
            console.log(response.data.data.users);
            setUserData({title: type, data: response.data.data.users});
            setGraphData(response.data.data);
        }

        accessDB(type);

    },[admin])

    useEffect(()=>{
        const setGraphInfo = async () => {
            

     
        };

        setGraphInfo();
    },[admin,userData])

    return (
        <div id="dashboard-container">
            <NavBar />
            <div id="chart-container">
                <div id="chart-container-row">
                    <div id="chart-container-final">
                    <GraphChart graphData={userData} />

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Graph;