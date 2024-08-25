import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueDistributionChart = ({ distribution }) => {

    const data = {
        datasets: [{
            data: Object.values(distribution),
            backgroundColor: ['#0747b6', '#2265d8',      'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)']

        }],
        labels: Object.keys(distribution),

    }

    const plugins = { legend: { display: false } }
    const  options = {
        cutout: '60%',
        plugins: {
            legend: {
                display: true, // Show the legend
                position: 'top', // Position of the legend (top, left, bottom, right)
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw;
                        return `${label}: ${value}`;
                    }
                }
            }
        }
    };

    return (
        <div className="Chart-Card">
        <Doughnut data={data} options={options}/>
        </div>
    )
}

export default RevenueDistributionChart;
