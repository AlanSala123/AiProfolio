// Dashboard.js
import React, { useState } from "react";
import "./SavedTemplates.css"; // Make sure to create this CSS file for styling
import { RiFile2Line } from "react-icons/ri"; // Import the file icon from react-icons library
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Assuming you have an array of portfolios from the backend
  const portfolios = [
    { id: 1, title: "Portfolio 1", description: "This is portfolio 1" },
    { id: 2, title: "Portfolio 2", description: "This is portfolio 2" },
    { id: 3, title: "Portfolio 1", description: "This is portfolio 1" },
    { id: 4, title: "Portfolio 2", description: "This is portfolio 2" },
    { id: 5, title: "Portfolio 1", description: "This is portfolio 1" },
    { id: 6, title: "Portfolio 2", description: "This is portfolio 2" },
    { id: 7, title: "Portfolio 1", description: "This is portfolio 1" },
    { id: 8, title: "test 2", description: "This is portfolio 2" }
    // Add more portfolios as needed
  ];

  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPortfolios = portfolios.filter((portfolio) =>
    portfolio.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

<div className="MainContainer">
<div className="dashboard">
<div className="header">
<img
src="https://www.gstatic.com/images/branding/product/2x/docs_48dp.png"
alt="Google Docs Logo"
className="logo"
/>
<h1>Portfolio Dashboard</h1>
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
<div onClick={()=>{navigate('/create')}}className="fab">+</div>
</div>
</div>


  )
};

export default Dashboard;
