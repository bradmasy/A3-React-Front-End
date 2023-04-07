
import React, { Component, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useRef } from 'react';
import Chart from 'chart.js/auto'
import { useState } from 'react';
import "./GraphChart.css"

const GraphChart = ({ graphData }) => {


    const chartRef = useRef(null);

    console.log(graphData)

    let dataRef = [];


    const options = {
        plugins: {
            title: {
                display: true,
                text: "Unique-Users By Date"
            }

        },
        responsive: true,
        maintainAspectRatio: false
    };

    useEffect(() => {
        const chart = async () => {


            let graphTitle;
            let dataSet;
            let type;
            let newOptions;

            const buildDataSet = async () => {
                switch (graphData.title) {
                    case "unique-users":
                        graphTitle = "Unique Users Sign Up By Date";
                        dataSet = {
                            labels: graphData.data.map((row, i) => row._id),
                            datasets: [
                                {
                                    label: 'Amount of Users',
                                    data: graphData.data.map((row, i) => row.count)
                                }
                            ]
                        }

                        break;
                    case "top-api-users":
                        console.log("here");
                        type = "bar"
                        graphTitle = "Top API Users"
                        dataSet = {
                            labels: graphData.data.map((row, i) => row.username),
                            datasets: [
                                {
                                    label: 'Amount of Users',
                                    data: graphData.data.map((row, i) => row.accessedLength)
                                }
                            ]

                        }

                        newOptions = {
                            animation: false,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    enabled: false
                                },
                                title: {
                                    display: true,
                                    text: graphTitle
                                }
                            }
                        }
                        break;
                    case "top-users-for-each-endpoint":
                        type = "bar"
                        graphTitle = "Top API Paths"
                        dataSet = {
                            labels: graphData.data.map((row, i) => row._id),
                            datasets: [
                                {
                                    label: 'Amount of Users',
                                    data: graphData.data.map((row, i) => row.count)
                                }
                            ]

                        }

                        newOptions = {
                            animation: false,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    enabled: false
                                },
                                title: {
                                    display: true,
                                    text: graphTitle
                                }
                            }
                        }
                        break;
                    case "400-errors":
                        graphTitle = "400 Errors";
                        type = "scatter";
                        dataSet =
                        {
                            labels: graphData.data.map((row, i) => row.date.split("T")[0]),
                            datasets: [
                                {
                                    label: 'Amount of Users',
                                    data: graphData.data.map(e => ({
                                        x: e.date.split("T")[0],
                                        y: e.errorNumber
                                    }))


                                }
                            ]
                        }
                        
                        newOptions = {
                            scales: {
                                x: {
                                    type: 'linear',
                                    position: 'bottom'
                                },
                                y: {
                                    type: "linear",
                                    position: "left"
                                },
                                plugins: {
                                    legend: {
                                        display: false
                                    },
                                    tooltip: {
                                        enabled: false
                                    }}

                                }
                            }
                        break;
                            default:
                        break;
                        }
                }

                await buildDataSet();
                console.log(dataSet)



                const chartContainer = document.getElementById("chart-rendering");

                if (chartContainer && chartContainer.chart) {
                    chartContainer.chart.destroy(); // Destroy the previous chart instance
                }

                chartContainer.chart = new Chart(chartRef.current,
                    {
                        type: type,

                        options: newOptions,

                        data: dataSet
                    })
            }
            chart();
        }, [graphData])


    return (
        <div id="dashboard-chart-container">
            <div>
                <canvas ref={chartRef} id="chart-rendering">
                </canvas >
            </div>
        </div>
    )
}


export default GraphChart;