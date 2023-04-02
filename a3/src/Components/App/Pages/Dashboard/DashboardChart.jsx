
import React, { Component, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useRef } from 'react';
import Chart from 'chart.js/auto'


const DashboardChart = () => {


    const chartRef = useRef(null);


    const dataRef = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];

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
                        labels: dataRef.map(row => row.year),
                        datasets: [
                            {
                                label: 'Acquisitions by year',
                                data: dataRef.map(row => row.count)
                            }
                        ]
                    }
                })
        }
        chart();
    }, [])


    return (
        <div id="dashboard-chart-container">
            <div>
                <h2>Bar Example</h2>
                <canvas ref={chartRef} id="chart-rendering">
                </canvas >
            </div>
        </div>
    )
}


export default DashboardChart;