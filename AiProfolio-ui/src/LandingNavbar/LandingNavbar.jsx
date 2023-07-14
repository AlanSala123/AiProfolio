import "./LandingNavbar.css"

export default function LandingNavbar() {
    return (
        <div className="box">
        <div className="navbar-wrapper">
          <div className="navbar">
            <div className="text-wrapper">Testimonials</div>
            <div className="div">Contact</div>
            <div className="text-wrapper-2">Home</div>
            <div className="text-wrapper-3">About</div>
            <div className="text-wrapper-4">Services</div>
            <div className="ai-profolio">
              <span className="span">Ai</span>
              <span className="text-wrapper-5">Profolio</span>
            </div>
            <div className="overlap">
            <a href="/Register">
            <div className="rectangle" />
              <div className="text-wrapper-6">Register</div> 
            </a>
            </div>
            <div className="overlap-group">
            <div className="rectangle" />
              <div className="sign-in">
                <span className="text-wrapper-7">Sign</span>
                <span className="text-wrapper-8">{" "}In<br /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
} 