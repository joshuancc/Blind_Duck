import HeaderBox from "../components/HeaderBox"
import RotatingText from "../components/RotatingText"
import Spline from '@splinetool/react-spline'
import LandingCard from "../components/LandingCard"
import"../styles/styles.css";
import'../styles/CardGrid.css';
const LandingPage = () => {
    const loggedIn = {firstName: 'Jeremy'};
    return (
        <section className="home-landing"> 
        <section className="home-content">
            <div className="header-menu">
                <a href="/register">Sign Up</a>
                <a href="/login">Sign in</a>
                </div>
            <HeaderBox type="greeting" title="Data Lab" user={loggedIn?.firstName || 'Guest'} subtext="Unlock precision and excellence."/>  
                <section className="home-content-items">
                    <section className='home-content'>
                        <RotatingText/> 
                    </section>
                    
                    <Spline scene="https://prod.spline.design/b9qq0GUsLimXYwY8/scene.splinecode"  />
      
                </section>
       </section>
       <section  className="home-content-items"> <LandingCard text="We are The lab techn" subtext="Award wininnging team "/>  <LandingCard/> <LandingCard/>  </section>

       <section>
      <Spline
        scene="https://prod.spline.design/qEsToCChwA7wnLyn/scene.splinecode" 
      /></section>
                    <h2> How we prep your data:</h2>

                    <Spline
        scene="https://prod.spline.design/4gIyW5KqBIJJ1fYp/scene.splinecode" 
        />

        </section>
    )
}

export default LandingPage
