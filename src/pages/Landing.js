import { Link } from "react-router-dom"
import main from "../assets/images/main.svg"
import Wrapper from "../assets/wrappers/LandingPage"
import {Logo} from "../components"

const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className='container page'>
            {/* INFO */}
            <div className="info">
                <h1>
                    Job <span>tracking</span> app
                </h1>
                <p>Raclette lomo brunch four loko next level shabby chic palo santo tousled actually tbh bruh hashtag kitsch. Kitsch cupping shabby chic quinoa echo park venmo wayfarers hot chicken jean </p>
                <Link to="/register" className='btn btn-hero'>Login/Register</Link>
            </div>
            <img src={main} alt="job hunt" className='img main-img'/>
        </div>
    </Wrapper>
  )
}

export default Landing