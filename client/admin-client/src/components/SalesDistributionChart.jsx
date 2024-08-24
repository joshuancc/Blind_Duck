import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const SalesDistributionChart = ({ distribution }) => {
  const data = {
    labels: Object.keys(distribution),
    datasets: [
      {
        data: Object.values(distribution),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      }
    ]
  }

  const options = {
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      }
    }
  }

  return (
    <div className="line-chart">
      <Bar data={data} options={options}/>
    </div>
  )
}

export default SalesDistributionChart;
