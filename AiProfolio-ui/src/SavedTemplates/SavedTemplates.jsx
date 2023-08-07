// Dashboard.js
import React, { useState, useEffect } from "react";
import "./SavedTemplates.css"; // Make sure to create this CSS file for styling
import { RiFile2Line } from "react-icons/ri"; // Import the file icon from react-icons library
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
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
      }
    };
    fetchAllPortfolios();
  }, []);

  useEffect(() => {
  }, [portfolios]);

  const deletePortfolio = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/product/portfolio/${id}`, { withCredentials: true });
      setPortfolios(prevPortfolios => prevPortfolios.filter(portfolio => portfolio.id !== id));
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <div className="MainContainer">
      <div className="dashboard">
        <div className="header">
          <h1>Portfolio Dashboard</h1>
        </div>
        <div className="card-container">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="card"
              style={{background: JSON.parse(portfolio?.template_code)?.header?.background?.background}}
              onClick={() => navigate(`/view/${portfolio.id}`)}
            >
              <RiFile2Line className="file-icon" color="#5cab72" />
              <h2
                style={{color: JSON.parse(portfolio?.template_code)?.header?.title?.color}}
              >
                {JSON.parse(portfolio.resume_data).user.name}
              </h2>
              <h2
                style={{color: JSON.parse(portfolio?.template_code)?.header?.subtitle?.color}}
              >
                {JSON.parse(portfolio.resume_data).jobAspiration}
              </h2>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click event from triggering the onClick of the parent div
                  deletePortfolio(portfolio.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
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
