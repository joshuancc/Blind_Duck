import TestComponent from "../components/TestComponent"
import test_image from "../assets/test_image.webp"
import HeaderBox from "../components/HeaderBox"
import {Menu} from "antd";
const LandingPage = () => {
    const loggedIn ={firstName: 'Jeremy', lastName:'Ng'}
    return (
        
        <main className="flex h-screen w-full font-inter"> 
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox type="greeting" title="Welcome" user={loggedIn?.firstName || 'Guest'} subtext="Access and manage your account."/> 
                </header>
            </div>

        </section>
        </main>
    )
}

export default LandingPage
