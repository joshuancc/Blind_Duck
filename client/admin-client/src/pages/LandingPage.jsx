import TestComponent from "../components/TestComponent"
import test_image from "../assets/test_image.webp"
import HeaderBox from "../components/HeaderBox"
import TotalBalanceBox from "../components/TotalBalanceBox"
import DashboardLayout from "../components/DashboardLayout"
import BarChartComponent from "../components/BarChart"
const TestPage = () => {
    const loggedIn ={firstName: 'Jeremy'};
    return (
        <DashboardLayout>
        <section
         className="home">
            <div className="home-content">
            <HeaderBox type="greeting" title="Welcome" user={loggedIn?.firstName || 'Guest'} subtext="Access and manage your account."/>   
            <div className="home-content-items">
                <header className="home-header">
                    <HeaderBox type="greeting" title="Welcome" user={loggedIn?.firstName || 'Guest'} subtext="Access and manage your account."/>   
                    <TotalBalanceBox accounts={[]} totalBanks={1} totalBalance={1250.68}/>

                </header>
                <BarChartComponent/>
                <BarChartComponent/>
                </div>
            </div>


        </section></DashboardLayout>
    )
}

export default TestPage
