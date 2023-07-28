import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHouse, faBolt, faLocationDot } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
            <ul className="social_icon">
                <li><a href="#"><FontAwesomeIcon icon={faHouse}/></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faBolt}/></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faLocationDot}/></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faEnvelope}/></a></li>
            </ul>
            <ul className="menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <p> ©2023 AiProfolio | All Rights Reserved </p>
        </footer>
    )
}