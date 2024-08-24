import HeaderBox from "../components/HeaderBox"
import TotalBalanceBox from "../components/TotalBalanceBox"
import DashboardLayout from "../components/DashboardLayout"
import BarChartComponent from "../components/BarChart"
import RevenueDistributionChart from "../components/RevenueDistributionChart"
import SalesDistributionChart from "../components/SalesDistributionChart"
import SalesTrendChart from "../components/SalesTrendChart"
import axios from "axios"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import LineChart from "../components/LineChart"

const AdminPage = () => {
    const loggedIn = {firstName: 'Jeremy'};
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [salesDistribution, setSalesDistribution] = useState({});
    const [revenueDistribution, setRevenueDistribution] = useState({});
    const [numberOfSales, setNumberOfSales] = useState({});

    const currentDate = new Date();
    const lastWeekDate = new Date();
    lastWeekDate.setDate(currentDate.getDate() - 7);
    const currentDateString = currentDate.toISOString().split("T")[0];
    const lastWeekDateString = lastWeekDate.toISOString().split("T")[0];
 
    async function getAdminDetails() {
        axios.get("http://localhost:3000/api/v1/admins/personal-information", {
            headers: {
                Authorization: `Bearer ${location.state.token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setEmail(response.data.email)
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
            }
        })
        .catch(response => {
            if (response.status === 401) {
                navigate("/login")
            } else if (response.status === 403) {
                alert("Access denied")
            }
        })
    }

    async function getSalesDistribution() {
        axios.get(`http://localhost:3000/api/v1/analytics/sales-distribution/${currentDateString}`, {
            headers: {
                Authorization: `Bearer ${location.state.token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setSalesDistribution(response.data);
            }
        })
        .catch(response => {
            if (response.status === 401) {
                navigate("/login")
            } else if (response.status === 403) {
                alert("Access denied")
            }
        })
    }

    async function getRevenueDistribution() {
        axios.get(`http://localhost:3000/api/v1/analytics/revenue-distribution/${currentDateString}`, {
            headers: {
                Authorization: `Bearer ${location.state.token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setRevenueDistribution(response.data);
            }
        })
        .catch(response => {
            if (response.status === 401) {
                navigate("/login")
            } else if (response.status === 403) {
                alert("Access denied")
            }
        })
    }

    async function getNumberOfSales() {
        axios.get(`http://localhost:3000/api/v1/analytics/number-of-sales?start=${lastWeekDateString}&end=${currentDateString}`, {
            headers: {
                Authorization: `Bearer ${location.state.token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setNumberOfSales(response.data);
            }
        })
        .catch(response => {
            if (response.status === 401) {
                navigate("/login")
            } else if (response.status === 403) {
                alert("Access denied")
            }
        })
    }

    useEffect(() => {
        getAdminDetails();
        getSalesDistribution();
        getRevenueDistribution();
        getNumberOfSales();
    }, [])

    return (
        <DashboardLayout>
            <section className="home">
                <div className="home-content">
                    <HeaderBox type="greeting" title="Welcome" user={loggedIn?.firstName || 'Guest'} subtext="Access and manage your account."/>   
                    <div className="home-content-items">
                        <RevenueDistributionChart distribution={revenueDistribution}/>
                        <SalesDistributionChart distribution={salesDistribution}/>
                    </div>
                    <div className="home-content-items"> 
                        <SalesTrendChart distribution={numberOfSales}/>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    )
}

export default AdminPage
