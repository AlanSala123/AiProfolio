import "./OurServices.css"

export default function OurServices() {
    return (
        <div className="our-services">
        <h2 className="section-title"> Services</h2>
        <h2 className="section-heading">Taking your career to the next level</h2>
        <div className="services-container">
          <div className="service">
            <img src="path/to/service1.jpg" alt="Service 1" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis, lectus et tincidunt fringilla.</p>
          </div>
          <div className="service">
            <img src="path/to/service2.jpg" alt="Service 2" />
            <p>Phasellus aliquam massa quis nisi tincidunt, ac bibendum lacus consequat.</p>
          </div>
          <div className="service">
            <img src="path/to/service3.jpg" alt="Service 3" />
            <p>Vestibulum euismod, libero ac convallis volutpat, elit justo dictum sapien.</p>
          </div>
        </div>
      </div>
    )
}