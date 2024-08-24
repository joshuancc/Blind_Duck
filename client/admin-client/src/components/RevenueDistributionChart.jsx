import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueDistributionChart = ({ distribution }) => {
    const data = {
        datasets: [{data: Object.values(distribution)}],
        labels: Object.keys(distribution)
    }

    const plugins = { legend: { display: false } }
    const options = {cutout: '60%', plugins: plugins}

    return (
        <Doughnut data={data} options={options}/>
    )
}

export default RevenueDistributionChart;
