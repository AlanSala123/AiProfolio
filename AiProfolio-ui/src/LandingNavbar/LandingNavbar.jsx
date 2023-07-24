import "./LandingNavbar.css"
import { Link } from 'react-router-dom';

//Landing Page Navbar
export default function LandingNavbar({ token, handleLogout }) {
  return (
    <nav className="navbar">
      {
        token ?  <div className="navbar-left">
        <Link to="/saved-templates" className="navbar-brand">
          <span className="Ai">Ai</span>
          <span>Profolio</span>
        </Link>
      </div> : <div className="navbar-left">
        <Link to="/#hero" className="navbar-brand">
          <span className="Ai">Ai</span>
          <span>Profolio</span>
        </Link>
        </div>
      }
      {
        token ? <></> :  <div className="navbar-center">
        <ul className="navbar-items">
          <li><a href="/#hero">Home</a></li>
          <li><a href="/#our-services">Services</a></li>
          <li><a href="#about-us-container">About</a></li>
          <li><a href="#entire-container">Contact</a></li>
        </ul>
      </div>
      }
      {
        token ? <div className="navbar-right">
          <Link to="/" className="navbar-SignOut" onClick={handleLogout}> Sign Out </Link>
        </div> : <div className="navbar-right">
          <Link to="/login" className="navbar-SignIn">Sign In</Link>
          <Link to="/register" className="navbar-Register">Register</Link>
        </div>
      }
    </nav>
  )
} 