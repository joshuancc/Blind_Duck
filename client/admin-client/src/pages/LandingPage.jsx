import HeaderBox from "../components/HeaderBox"
import RotatingText from "../components/RotatingText"
import Spline from '@splinetool/react-spline'
import LandingCard from "../components/LandingCard"
import"../styles/styles.css";
import'../styles/CardGrid.css';
import blueShell from "../assets/blue-shell.png";
import orangeSlime from "../assets/orange-slime.png";
import blackFisf from "../assets/black_fish.png";
import HackedEffectWord from "../components/HackedEffectWord";
import SmallHackedEffectWord from '../components/SmallHackedEffectWord';
import CompanyDescription from "../components/CompanyDescription";
const LandingPage = () => {
    const loggedIn = {firstName: 'Jeremy'};
    return (
        <section className="home-landing"> 
        <section className="home-content">
            <div className="header-menu">
            <SmallHackedEffectWord /> 
            <a href="/register">Sign Up</a>
                <a href="/login">Sign in</a>
                
                </div>
                <section className="home-content-items">
                    <section className='home-content'>

                        <RotatingText/> 
                          </section>
                    
                    <Spline scene="https://prod.spline.design/b9qq0GUsLimXYwY8/scene.splinecode"  />
      
                </section>

                <CompanyDescription/>

       </section>
       <section  className="home-content-items">                
        <LandingCard text="Great insight" subtext="provided us with precise and reliable data analysis. Their attention to detail and commitment to delivering results on time is truly impressive." imageSrc={blueShell} />
        <LandingCard text="Quick and simple" subtext="Alexander has been a game changer for how we manage and analyze our data. Would highly recommend to anyone looking for a quick and easy to use data analytics solution." imageSrc={orangeSlime} />
        <LandingCard text="Unmatched!" subtext="Our company has been using Data Lab Alexander for a year now and we haven't looked back since. It is hands down one of the best data analytics solution on the market today." imageSrc={blackFisf} />

      </section>

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
