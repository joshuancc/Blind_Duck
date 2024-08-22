import HeaderBox from "../components/HeaderBox"
import TotalBalanceBox from "../components/TotalBalanceBox"
import DashboardLayout from "../components/DashboardLayout"
import SmallSidebar from "../components/SmallSideBar"
const FoodAppPage = () => {
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
        <SmallSidebar/>

        </section></DashboardLayout>
    )
}

export default FoodAppPage
