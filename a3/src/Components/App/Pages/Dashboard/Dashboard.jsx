import React from "react";
import NavBar from "../../../Navigation/NavBar";
import "./Dashboard.css";
import DashboardChart from "./DashboardChart";
import { useEffect } from "react";



const Dashboard = () => {

    useEffect(()=>{
        const verify = async () => {

        };

        verify();
    },[])

    return (
        <div id="dashboard-container">
            <NavBar />
            <div id="chart-container">
                <div id="chart-container-row">
                    <div id="chart-container-final">
                    <DashboardChart />

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Dashboard;