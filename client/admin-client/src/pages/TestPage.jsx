import TestComponent from "../components/TestComponent"
import test_image from "../assets/test_image.webp"
import HeaderBox from "../components/HeaderBox"
import TotalBalanceBox from "../components/TotalBalanceBox"
import DashboardLayout from "../components/DashboardLayout"
import CardGrid from "../components/CardGrid"
import RotatingText from "../components/RotatingText"
import Spline from '@splinetool/react-spline'
import BarChart from "../components/BarChart"
const TestPage = () => {
    const loggedIn ={firstName: 'Jeremy'};
    return (
        <section className="home-landing"> 
            <section className="home-content">
                
            <div class="header-menu">
			<a href="#">HOME</a>
			<a href="#">Sample </a>
			<a href="#">Login</a>
			<a href="#"></a>
		</div>
            <HeaderBox type="greeting" title="Data Lab" user={loggedIn?.firstName || 'Guest'} subtext="Unlock precision and excellence."/>   
                <section className="home-content-items">
                    <section className='home-content'>
                        <RotatingText/>
                 
                    <h2> How we prep your data:</h2>
                    </section>
                    
                    <Spline
        scene="https://prod.spline.design/b9qq0GUsLimXYwY8/scene.splinecode" 
      />
             
                </section>
       </section>
                    <Spline
        scene="https://prod.spline.design/4gIyW5KqBIJJ1fYp/scene.splinecode" 
        />

        </section>
    )
}

export default TestPage
