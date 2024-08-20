import TestComponent from "../components/TestComponent"
import test_image from "../assets/test_image.webp"
import HeaderBox from "../components/HeaderBox"
import TotalBalanceBox from "../components/TotalBalanceBox"
import DashboardLayout from "../components/DashboardLayout"
const TestPage = () => {
    const loggedIn ={firstName: 'Jeremy'};
    return (
        <DashboardLayout>
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox type="greeting" title="Welcome" user={loggedIn?.firstName || 'Guest'} subtext="Access and manage your account."/> 
                </header>
            </div>
        <TotalBalanceBox accounts={[]} totalBanks={1} totalBalance={1250.68}/>
        
        </section></DashboardLayout>
    )
}

export default TestPage
