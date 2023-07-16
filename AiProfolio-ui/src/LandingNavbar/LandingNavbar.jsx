import "./LandingNavbar.css"
import { Link } from 'react-router-dom';

//Landing Page Navbar
export default function LandingNavbar() {
    return (
      <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <span className="Ai">Ai</span>
          <span>Profolio</span>
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="navbar-items">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/testimonials">Testimonials</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="navbar-SignIn">Sign In</Link>
        <Link to="/register" className="navbar-Register">Register</Link>
      </div>
    </nav>
    )
} 