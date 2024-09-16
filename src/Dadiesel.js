import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Line, Pie, Bar } from 'react-chartjs-2'; // Import chart components
import { Chart, registerables } from 'chart.js'; // Register the charts

// Register chart.js components
Chart.register(...registerables);

function Dadiesel() {
  const [totalQty, setTotalQty] = useState(0);
  const [vehicleUtilization, setVehicleUtilization] = useState([]);
  const [dailyUtilization, setDailyUtilization] = useState([]);
  const [holderUtilization, setHolderUtilization] = useState({});
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    // Fetch the data from the JSON server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/DIESEL'); // Updated API endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data = await response.json();

        // Calculate total qty
        const total = _.sumBy(data, item => Number(item.qty));
        setTotalQty(total);

        // Group by vehicle type and calculate diesel utilization
        const groupedByType = _.groupBy(data, 'type');
        const utilization = _.map(groupedByType, (items, type) => ({
          type,
          qty: _.sumBy(items, item => Number(item.qty))
        }));

        // Sort the utilization data by qty in descending order
        const sortedUtilization = _.orderBy(utilization, ['qty'], ['desc']);
        setVehicleUtilization(sortedUtilization);

        // Daily utilization (group by date)
        const groupedByDate = _.groupBy(data, 'date');
        const dailyData = _.map(groupedByDate, (items, date) => ({
          date,
          qty: _.sumBy(items, item => Number(item.qty))
        }));
        setDailyUtilization(_.orderBy(dailyData, ['date'])); // Sort by date

        // Holder utilization (group by holder for pie chart)
        const groupedByHolder = _.groupBy(data, 'dept');
        const holderData = _.mapValues(groupedByHolder, (items) => _.sumBy(items, item => Number(item.qty)));
        setHolderUtilization(holderData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading while fetching
  }

  if (error) {
    return <div>Error: {error}</div>;  // Show error if fetching fails
  }

  // Line Chart Data (Daily Utilization)
  const lineChartData = {
    labels: dailyUtilization.map(item => item.date),
    datasets: [
      {
        label: 'Daily Fuel Utilization (liters)',
        data: dailyUtilization.map(item => item.qty),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      }
    ]
  };

  // Pie Chart Data (Holder Utilization)
  const pieChartData = {
    labels: Object.keys(holderUtilization),
    datasets: [
      {
        label: 'Holder Utilization',
        data: Object.values(holderUtilization),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverOffset: 4
      }
    ]
  };

  // Bar Chart Data (Vehicle Type Distribution)
  const barChartData = {
    labels: vehicleUtilization.map(item => item.type),  // Vehicle types
    datasets: [
      {
        label: 'Diesel Utilization by Vehicle Type (liters)',
        data: vehicleUtilization.map(item => item.qty),  // Quantities per vehicle type
        backgroundColor: 'rgba(54, 162, 235, 0.6)',  // Bar color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    },
    indexAxis: 'x', // Display horizontal bars
  };

  return (
    <div>
      
      <header className="App-header">
        <h1>Total Diesel Quantity</h1>
        <p>The total quantity of diesel is: <strong>{totalQty}</strong> liters</p>
        <p>The total cost of diesel is: Rs. <strong>{totalQty*95}</strong> </p>
        <div class="row">
  <div class="col"><h2>Diesel Utilization by Vehicle Type</h2>
    <div style={{ width: '80%', margin: '0 auto', height: '300px', overflow: 'auto', border: '1px solid #eeeeee', padding: '10px' }}>
          {/* Table showing vehicle utilization */}
          <table style={{ width: '100%', textAlign: 'center' }}>
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Diesel Utilization (liters)</th>
              </tr>
            </thead>
            <tbody>
              {vehicleUtilization.map(({ type, qty }) => (
                <tr key={type}>
                  <td>{type}</td>
                  <td>{qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
  <div class="col"><h2>Daily Fuel Utilization</h2>
        <div style={{ width: '80%', margin: '0 auto', height: '400px' }}>
          <Line data={lineChartData} />
        </div></div>
  <div class="w-100"></div>
  <div class="col">{/* Pie chart showing holder utilization */}
        <h2>Fuel Utilization by Holder</h2>
        <div style={{ width: '50%', margin: '0 auto', height: '400px' }}>
          <Pie data={pieChartData} />
        </div></div>
  <div class="col">{/* Bar chart showing distribution of diesel utilization by vehicle type */}
        <h2>Diesel Utilization by Vehicle Type (Bar Chart)</h2>
        <div style={{ width: '80%', margin: '0 auto', height: '400px' }}>
          <Bar data={barChartData} options={barChartOptions} />
        </div></div>
</div>

        
        
        
        

        

        

        
      </header>
    </div>
  );
}

export default Dadiesel;
