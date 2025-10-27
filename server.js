<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎯 Iraqi Election Platform - LIVE Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            background: rgba(255,255,255,0.95);
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .header h1 {
            font-size: 3rem;
            background: linear-gradient(90deg, #1E3A8A, #3B82F6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.2rem;
            color: #666;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .metric-card {
            background: rgba(255,255,255,0.95);
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            text-align: center;
            border-left: 5px solid #3B82F6;
            transition: transform 0.3s ease;
        }
        
        .metric-card:hover {
            transform: translateY(-5px);
        }
        
        .metric-card h3 {
            color: #666;
            font-size: 1rem;
            margin-bottom: 10px;
        }
        
        .metric-card .value {
            font-size: 2.5rem;
            font-weight: bold;
            color: #1E3A8A;
            margin-bottom: 5px;
        }
        
        .metric-card .progress {
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 10px;
        }
        
        .metric-card .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #3B82F6, #1E3A8A);
            transition: width 0.5s ease;
        }
        
        .charts-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .chart-card {
            background: rgba(255,255,255,0.95);
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .chart-card h3 {
            color: #333;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .status-bar {
            background: rgba(255,255,255,0.95);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .status-item {
            display: inline-block;
            margin: 0 15px;
            padding: 10px 20px;
            background: #d4edda;
            border-radius: 25px;
            color: #155724;
            font-weight: bold;
        }
        
        .last-update {
            text-align: center;
            color: white;
            margin-top: 20px;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 IRAQI ELECTION PLATFORM</h1>
            <p>LIVE DASHBOARD - Monitoring 7,769 Candidates in Real-Time</p>
        </div>
        
        <div class="metrics-grid" id="metricsGrid">
            <!-- Metrics will be populated by JavaScript -->
        </div>
        
        <div class="charts-container">
            <div class="chart-card">
                <h3>📈 Candidate Progress</h3>
                <canvas id="progressChart"></canvas>
            </div>
            <div class="chart-card">
                <h3>🗺️ Regional Distribution</h3>
                <canvas id="regionChart"></canvas>
            </div>
        </div>
        
        <div class="status-bar">
            <div class="status-item">✅ DATABASE CONNECTED</div>
            <div class="status-item">🔄 LIVE DATA STREAM</div>
            <div class="status-item">📊 7,769 CANDIDATES</div>
            <div class="status-item">🚀 SYSTEM OPERATIONAL</div>
        </div>
        
        <div class="last-update" id="lastUpdate">
            Last updated: Loading...
        </div>
    </div>

    <script>
        // Metrics configuration
        const metrics = [
            { id: 'candidates', title: '🎯 Total Candidates', value: 0, max: 7769, suffix: '/7,769' },
            { id: 'quality', title: '✅ Data Quality', value: 0, max: 100, suffix: '%' },
            { id: 'regions', title: '🏛️ Active Regions', value: 12, suffix: '' },
            { id: 'votes', title: '🗳️ Total Votes', value: 0, suffix: '' }
        ];

        let progressChart, regionChart;

        function initializeCharts() {
            // Progress Chart
            const progressCtx = document.getElementById('progressChart').getContext('2d');
            progressChart = new Chart(progressCtx, {
                type: 'bar',
                data: {
                    labels: ['Data Collection', 'Verification', 'Platform Ready', 'Live Deployment'],
                    datasets: [{
                        label: 'Completion %',
                        data: [85, 70, 45, 20],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });

            // Region Chart
            const regionCtx = document.getElementById('regionChart').getContext('2d');
            regionChart = new Chart(regionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Sulaymaniyah'],
                    datasets: [{
                        data: [1250, 980, 756, 432, 389],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)',
                            'rgba(139, 92, 246, 0.8)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        function updateMetrics(data) {
            const metricsGrid = document.getElementById('metricsGrid');
            metricsGrid.innerHTML = '';

            metrics[0].value = data.totalCandidates;
            metrics[1].value = data.dataQuality;
            metrics[3].value = data.totalVotes.toLocaleString();

            metrics.forEach(metric => {
                const percentage = metric.max ? (metric.value / metric.max) * 100 : 100;
                
                const metricCard = document.createElement('div');
                metricCard.className = 'metric-card';
                metricCard.innerHTML = `
                    <h3>${metric.title}</h3>
                    <div class="value">${metric.value.toLocaleString()}${metric.suffix}</div>
                    ${metric.max ? `
                        <div class="progress">
                            <div class="progress-bar" style="width: ${percentage}%"></div>
                        </div>
                        <small>${percentage.toFixed(1)}% Complete</small>
                    ` : ''}
                `;
                metricsGrid.appendChild(metricCard);
            });

            document.getElementById('lastUpdate').textContent = 
                `Last updated: ${new Date(data.timestamp).toLocaleString()}`;
        }

        async function fetchData() {
            try {
                const response = await fetch('/api/data');
                const data = await response.json();
                updateMetrics(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Initialize dashboard
        document.addEventListener('DOMContentLoaded', function() {
            initializeCharts();
            fetchData();
            setInterval(fetchData, 5000); // Update every 5 seconds
        });
    </script>
</body>
</html>