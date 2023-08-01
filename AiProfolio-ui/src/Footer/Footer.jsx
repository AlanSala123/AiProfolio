import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faHouse, faBolt, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer-container">
            <div id="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
            <ul className="social_icon">
                <li><a href="#"><FontAwesomeIcon icon={faHouse}/></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faBolt}/></a></li>
                <li><a href="https://www.google.com/maps/place/Salesforce+Tower/@37.7897484,-122.3998086,17z/data=!3m2!4b1!5s0x808580621f881883:0x28d9d7af1999c538!4m6!3m5!1s0x808580636b2ad2d5:0x272fc1d712ad2912!8m2!3d37.7897442!4d-122.3972337!16s%2Fm%2F0s8wy91?entry=ttu"><FontAwesomeIcon icon={faLocationDot}/></a></li>
                <li><Link to="register"><FontAwesomeIcon icon={faRightToBracket}/></Link></li>
            </ul>
            <ul className="menu">
                <li><a href="#">Home</a></li>
                <li><a href="/#our-services">Services</a></li>
                <li><a href="/#team">Team</a></li>
            </ul>
            <p> ©2023 AiProfolio | All Rights Reserved </p>
        </footer>
    )
}