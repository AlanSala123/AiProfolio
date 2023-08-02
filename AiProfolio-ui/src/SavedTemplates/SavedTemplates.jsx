// Dashboard.js
import React, { useState } from "react";
import "./SavedTemplates.css"; // Make sure to create this CSS file for styling
import { RiFile2Line } from "react-icons/ri"; // Import the file icon from react-icons library
import { useNavigate } from "react-router-dom";

const Dashboard = ({user}) => {
  // Assuming you have an array of portfolios from the backend
  const portfolios = [
    { id: 1, title: "Portfolio 1", description: "This is portfolio 1" },
    { id: 2, title: "Portfolio 2", description: "This is portfolio 2" },
    { id: 3, title: "Portfolio 1", description: "This is portfolio 1" },
    { id: 4, title: "Portfolio 2", description: "This is portfolio 2" },
    { id: 5, title: "Portfolio 1", description: "This is portfolio 1" },
    { id: 6, title: "Portfolio 2", description: "This is portfolio 2" },
    { id: 7, title: "Portfolio 1", description: "This is portfolio 1" },
    { id: 8, title: "test 2", description: "This is portfolio 2" },
    // Add more portfolios as needed
  ];
  const dummyPopularTemplates = [
    { id: 1, title: "Template 1", description: "This is template 1" },
    { id: 2, title: "Template 2", description: "This is template 2" },
    { id: 3, title: "Template 3", description: "This is template 3" },
    { id: 4, title: "Template 4", description: "This is template 4" },
    { id: 5, title: "Template 5", description: "This is template 5" },
    { id: 6, title: "Template 6", description: "This is template 6" },
    { id: 7, title: "Template 7", description: "This is template 7" },
    { id: 8, title: "Template 8", description: "This is template 8" },
    { id: 9, title: "Template 9", description: "This is template 9" },
    // Add more dummy templates as needed
  ];

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPortfolios = portfolios.filter((portfolio) =>
    portfolio.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="MainContainer">
      <div className="dashboard">
        <div className="header">
          <h1>Portfolio Dashboard</h1>
        </div>
        <div className="slideshow-container">
          <h2 className="Popular-Title">Popular Templates</h2>
          <div className="slideshow">
            {/* Wrapper div for sliding effect */}
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
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="card-container">
          {filteredPortfolios.map((portfolio) => (
            <div key={portfolio.id} className="card">
              <RiFile2Line className="file-icon" color="#5cab72" />
              <h3>{portfolio.title}</h3>
              <p>{portfolio.description}</p>
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
