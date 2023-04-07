
import React, { Component, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useRef } from 'react';
import Chart from 'chart.js/auto'
import { useState } from 'react';
import "./GraphChart.css"

const GraphChart = ({ graphData }) => {


    const chartRef = useRef(null);

    console.log(graphData)

    useEffect(() => {

        const chart = async () => {

            let graphTitle;
            let dataSet;
            let type;
            let newOptions;

            const buildDataSet = async () => {
                console.log(graphData.title)

                switch (graphData.title) {

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
                            scales:{
                                yAxes: [{
                                    scaleLabel: {
                                      display: true,
                                      labelString: 'My Y Axis Label'
                                    }
                                  }]
                            },
                            plugins: {
                                legend: {
                                    display: true
                                },
                                tooltip: {
                                    enabled: true
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
                                    title:"Amount",
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
                        type = "line";
                        dataSet = {
                            labels: graphData.data.map((row, i) => row._id),
                            datasets: [
                                {
                                    label: "Amount of Uses",
                                    data: graphData.data.map(e => ({
                                        x: e._id,
                                        y: e.count
                                    }))
                                }
                            ]
                        };
                        newOptions = {
                            scales: {
                                yAxes: [{
                                  ticks: {
                                    beginAtZero: true
                                  },
                                  scaleLabel: {
                                    display: true,
                                    labelString: 'Label of Y-axis'
                                  }
                                }]
                              },
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
                        };
                        break;
                    case "recent-errors":
                        graphTitle = `Recent Errors from ${graphData.period.start.split("T")[0]} to ${graphData.period.end.split("T")[0]}`;
                        console.log("here");
                        type = "bar"
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
                    case "unique-users":
                        console.log(graphData)
                        console.log("here unique");
                      //  chartContainer.chart.destroy();
                        graphTitle = "Unique Users Sign Up By Date";

                        dataSet = {
                            labels: graphData.data.map((date, i) => date._id),
                            datasets: [
                                {
                                    label: "users",
                                    data: graphData.data.map((r, i) => r.count)
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
                    default:
                        break;
                }
            }

            await buildDataSet().then(() => {


                const chartContainer = document.getElementById("chart-rendering");
           
                if (graphData.title == "unique-users" || chartContainer && chartContainer.chart) {
                    console.log("destroying...")
                    chartContainer.chart.destroy(); // Destroy the previous chart instance
                }

                chartContainer.chart = new Chart(chartRef.current,
                    {
                        type: type,

                        options: newOptions,

                        data: dataSet,
                        id: `${type}`
                    })

            });
            console.log(dataSet)




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