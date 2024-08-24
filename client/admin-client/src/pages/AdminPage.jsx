import HeaderBox from "../components/HeaderBox"
import TotalBalanceBox from "../components/TotalBalanceBox"
import DashboardLayout from "../components/DashboardLayout"
import BarChartComponent from "../components/BarChart"

const AdminPage = () => {
    const loggedIn = {firstName: 'Jeremy'};

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
