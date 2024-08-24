import HeaderBox from "../components/HeaderBox"
import TotalBalanceBox from "../components/TotalBalanceBox"
import DashboardLayout from "../components/DashboardLayout"
import BarChartComponent from "../components/BarChart"
import axios from "axios"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

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
        const currentDate = new Date().toISOString().split("T")[0];
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
                        <header className="home-header">
                            <TotalBalanceBox accounts={[]} totalBanks={1} totalBalance={1250.68}/>
                        </header>
                        <BarChartComponent/>
                    </div>
                    <div className="home-content-items"> 
                        <BarChartComponent/>
                        <BarChartComponent/>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    )
}

export default AdminPage
