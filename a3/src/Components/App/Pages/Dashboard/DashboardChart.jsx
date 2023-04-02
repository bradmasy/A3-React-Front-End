
import React, { Component, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useRef } from 'react';
import Chart from 'chart.js/auto'
import { useState } from 'react';

const DashboardChart = ({graphData}) => {


    const chartRef = useRef(null);

    console.log(graphData)

    let dataRef = [];
    graphData.forEach( e => {
        let dataObject = {
            date: e.dateSignedUp
        }

        dataRef.push(dataObject);
    })


    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    useEffect(() => {
        const chart = async () => {

            const chartContainer = document.getElementById("chart-rendering");

            if (chartContainer && chartContainer.chart) {
                chartContainer.chart.destroy(); // Destroy the previous chart instance
              }

              chartContainer.chart = new Chart(chartRef.current,
                {
                    type: 'bar',
                    title:"hello",
                    options: {
                        animation: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: false
                            }
                        }
                    },
                    data: {
                        labels: dataRef.map(row => row.date),
                        datasets: [
                            {
                                label: 'Acquisitions by year',
                                data: dataRef.map((row ,i) => i)
                            }
                        ]
                    }
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


export default DashboardChart;