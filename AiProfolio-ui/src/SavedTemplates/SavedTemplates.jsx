// Dashboard.js
import React, { useState, useEffect } from "react";
import "./SavedTemplates.css"; // Make sure to create this CSS file for styling
import { RiFile2Line } from "react-icons/ri"; // Import the file icon from react-icons library
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  // Assuming you have an array of portfolios from the backend
  

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchAllPortfolios = async () => {
      try {
        const res = await axios.get("http://localhost:3001/product/fetchAll", {
          withCredentials: true,
        });
        setPortfolios(res?.data)

      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPortfolios();
  }, []);

  useEffect(() => {
    console.log(portfolios);
  }, [portfolios]);
  

  //  const filteredPortfolios = portfolios.filter((portfolio) =>
  //    portfolio.title.toLowerCase().includes(searchQuery.toLowerCase())
  //  );

  

  return (
    <div className="MainContainer">
      <div className="dashboard">
        <div className="header">
          <h1>Portfolio Dashboard</h1>
        </div>

        {/* <div className="slideshow-container">
          <h2 className="Popular-Title">Popular Templates</h2>
          <div className="slideshow">
            <div
              className="slides-container"
            >
              {dummyPopularTemplates.map((template) => (
                <div key={template.id} className="slide">
                  <RiFile2Line className="file-icon" color="#5cab72" />
                  <h3>{template.title}</h3>
                  <p>{template.description}</p>
                </div>
              ))}
              {dummyPopularTemplates.map((template) => (
                <div key={template.id} className="slide">
                  <RiFile2Line className="file-icon" color="#5cab72" />
                  <h3>{template.title}</h3>
                  <p>{template.description}</p>
                </div>
              ))}
              {dummyPopularTemplates.map((template) => (
                <div key={template.id} className="slide">
                  <RiFile2Line className="file-icon" color="#5cab72" />
                  <h3>{template.title}</h3>
                  <p>{template.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}
        <div className="card-container">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="card"
              style={{backgroundColor: JSON.parse(portfolio?.template_code)?.portfolio?.header?.background?.color}}
              onClick={()=>{navigate(`/view/${portfolio.id}`)}}
            >
              <RiFile2Line className="file-icon" color="#5cab72" />
              <p
              style={{color: JSON.parse(portfolio?.template_code)?.portfolio?.header?.foreground?.subtitle?.fontColor}}
              >{portfolio?.id}</p>
              <h2
              style={{color: JSON.parse(portfolio?.template_code)?.portfolio?.header?.foreground?.title?.fontColor}}
              >
                {JSON.parse(portfolio.resume_data).user.name}
              </h2>
              <h2
              style={{color: JSON.parse(portfolio.template_code)?.portfolio?.header?.foreground?.subtitle?.fontColor}}
              >
                {JSON.parse(portfolio.resume_data).jobAspiration}
              </h2>
            </div>
          ))}
          {/* Add more cards here */}
        </div>
        <div
          onClick={() => {
            navigate("/create");
          }}
          className="fab"
        >
          +
        </div>
      </div>
    </div>
  );

};

export default Dashboard;
