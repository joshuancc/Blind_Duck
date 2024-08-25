import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SalesTrendChart = ({ distribution }) => {
    const data = {
        labels: Object.keys(distribution),
        datasets: [
            {
                label: "Total sales",
                data: Object.values(distribution),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1
            }
        ]
    }

    const options = {
        responsive: true
    };

    return (
        <div className="Chart-Card">
            <Line data={data} options={options} />
        </div>
    )
}

export default SalesTrendChart;
