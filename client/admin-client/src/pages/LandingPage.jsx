import HeaderBox from "../components/HeaderBox"
import RotatingText from "../components/RotatingText"
import Spline from '@splinetool/react-spline'

const LandingPage = () => {
    const loggedIn = {firstName: 'Jeremy'};
    return (
        <section className="home-landing"> 
            <section className="home-content">
                <nav className="header-menu">
                    <a href="/register">Sign Up</a>
                    <a href="/login">Sign in</a>
                </nav>
                <HeaderBox type="greeting" title="Data Lab" user={loggedIn?.firstName || 'Guest'} subtext="Unlock precision and excellence."/>   
                <section className="home-content-items">
                    <section className='home-content'>
                        <RotatingText/>
                        <h2> How we prep your data:</h2>
                    </section>
                    <Spline scene="https://prod.spline.design/b9qq0GUsLimXYwY8/scene.splinecode"/>
                </section>
            </section>
            <Spline scene="https://prod.spline.design/4gIyW5KqBIJJ1fYp/scene.splinecode"/>
        </section>
    )
}

export default LandingPage
