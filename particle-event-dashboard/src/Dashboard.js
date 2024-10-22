// Dashboard.js

import React, { useState, useRef, useEffect } from 'react';

import {
    Chart,
    LineController,
    BarController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  // Register the necessary controllers and elements
  Chart.register(
    LineController,
    BarController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

const ChartComponent = () => {
    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);
    const lineChartInstanceRef = useRef(null);
    const barChartInstanceRef = useRef(null);

    const [protonCollisionData, setProtonCollisionData] = useState({ labels: [], data: [] });
    const [previousProtonCollisionData, setPreviousProtonCollisionData] = useState({ labels: [], data: [] });

    const [inputData, setInputData] = useState({
        protonCollision: '',
        previousProtonCollision: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        const protonCollisionValues = inputData.protonCollision.split(',').map(num => Number(num.trim()));
        const previousProtonCollisionValues = inputData.previousProtonCollision.split(',').map(num => Number(num.trim()));

        const particleData = {
            name: "Proton Collision",  // Updated name
            protonCollisionData: protonCollisionValues.join(','),
            previousProtonCollisionData: previousProtonCollisionValues.join(',')
        };

        // Save to backend only when the submit button is clicked
        await fetch('http://localhost:8080/api/particle/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(particleData)
        });

        // Update chart data after submission
        setProtonCollisionData({
            labels: Array.from({ length: protonCollisionValues.length }, (_, i) => `Month ${i + 1}`),
            data: protonCollisionValues
        });
        setPreviousProtonCollisionData({
            labels: Array.from({ length: previousProtonCollisionValues.length }, (_, i) => `Month ${i + 1}`),
            data: previousProtonCollisionValues
        });
    };

    useEffect(() => {
        // Logic for rendering charts goes here
        if (protonCollisionData.data.length > 0 && previousProtonCollisionData.data.length > 0) {
            // Clear previous chart instances
            if (lineChartInstanceRef.current) lineChartInstanceRef.current.destroy();
            if (barChartInstanceRef.current) barChartInstanceRef.current.destroy();

            if (lineChartRef.current) {
                const lineCtx = lineChartRef.current.getContext('2d');
                lineChartInstanceRef.current = new Chart(lineCtx, {
                    type: 'line',
                    data: {
                        labels: protonCollisionData.labels,
                        datasets: [
                            {
                                label: 'Proton Collision Data',
                                data: protonCollisionData.data,
                                borderColor: '#2a9d8f',
                                borderWidth: 2
                            },
                            {
                                label: 'Previous Proton Collision',
                                data: previousProtonCollisionData.data,
                                borderColor: '#e76f51',
                                borderWidth: 2
                            }
                        ]
                    }
                });
            }

            if (barChartRef.current) {
                const barCtx = barChartRef.current.getContext('2d');
                barChartInstanceRef.current = new Chart(barCtx, {
                    type: 'bar',
                    data: {
                        labels: protonCollisionData.labels,
                        datasets: [
                            {
                                label: 'Proton Collision Data',
                                data: protonCollisionData.data,
                                backgroundColor: '#2a9d8f'
                            },
                            {
                                label: 'Previous Proton Collision',
                                data: previousProtonCollisionData.data,
                                backgroundColor: '#e76f51'
                            }
                        ]
                    }
                });
            }
        }
    }, [protonCollisionData, previousProtonCollisionData]);

    return (
        <div className="dashboard">
            <h2>Particle Data Visualization</h2>
            <div>
                <h3>Proton Collision Data</h3>
                <input
                    type="text"
                    name="protonCollision"
                    placeholder="Enter proton collision data (comma-separated)"
                    value={inputData.protonCollision}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <h3>Previous Proton Collision Data</h3>
                <input
                    type="text"
                    name="previousProtonCollision"
                    placeholder="Enter previous proton collision data (comma-separated)"
                    value={inputData.previousProtonCollision}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleSubmit}>Submit</button>

            <div className="chart-placeholder">
                <h3>Line Chart</h3>
                <canvas ref={lineChartRef} width={600} height={400} />
            </div>
            <div className="chart-placeholder">
                <h3>Bar Chart</h3>
                <canvas ref={barChartRef} width={600} height={400} />
            </div>
        </div>
    );
};

export default ChartComponent;
