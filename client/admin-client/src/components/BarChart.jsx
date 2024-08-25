import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register necessary components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const BarChartComponent = () => {
  // Manually create data if Utils is not defined or imported
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Fully Rounded',
        data: [30, 50, 80, 20, 100, 90, 60],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
      {
        label: 'Small Radius',
        data: [20, 40, 70, 30, 90, 60, 40],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    cutout: '60%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className='line-chart'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartComponent;
