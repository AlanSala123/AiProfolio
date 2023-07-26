// Dashboard.js
import React, { useState } from "react";
import "./SavedTemplates.css"; // Make sure to create this CSS file for styling
import { RiFile2Line } from "react-icons/ri"; // Import the file icon from react-icons library

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

    token ?
    (<div className="entire-saved">
      <div className="top-buttons">
        <div className={`saved-button ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => handleTabClick('saved')}>
          <Link to="/saved-templates" className="saved">
            <Button style={{ color: 'white' }}>My Saved Templates</Button>
          </Link>
        </div>
        <div className={`popular-button ${activeTab === 'popular' ? 'active' : ''}`} onClick={() => handleTabClick('popular')}>
          <Link to="/popular-templates" className="popular">
            <Button style={{ color: 'white' }}>Popular Templates</Button>
          </Link>
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

      <div className="fab">+</div>
    </div>
    </div>

    </div>) : (<></>)

  );
};

export default Dashboard;


// import { Link } from 'react-router-dom';
// import { Button, Container, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// import './SavedTemplates.css';

// export default function SavedTemplates({ user, token }) {
//   // State to keep track of the active button
//   const [activeTab, setActiveTab] = useState('saved');

//   const [portfolios, setPortfolios] = useState({});
//   const params = useParams();

//   // dynamic routing for the grid of portfolios
//   useEffect(() => {
//     axios.post(`localhost:5173/${params.id}`).then((response) => setPortfolios(response.data.portfolio));
//   }, []);

//   // Function to handle tab click
//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="entire-saved">
//       <div className="top-buttons">
//         <div className={`saved-button ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => handleTabClick('saved')}>
//           <Link to="/saved-templates" className="saved">
//             <Button style={{ color: 'white' }}>My Saved Templates</Button>
//           </Link>
//         </div>
//         <div className={`popular-button ${activeTab === 'popular' ? 'active' : ''}`} onClick={() => handleTabClick('popular')}>
//           <Link to="/popular-templates" className="popular">
//             <Button style={{ color: 'white' }}>Popular Templates</Button>
//           </Link>
//         </div>
//       </div>
//       <div className="search-with-create-delete">
//         <div className="searchbar">
//           <input type="text" placeholder="Search..." />
//         </div>
//         <div className="createNew">
//           <Link to="/Drag-Drop">
//             <Button>Create New</Button>
//           </Link>
//         </div>
//         <div className="delete">
//           <Button>Delete</Button>
//         </div>
//       </div>
//       <div className="template-grid">
//         <Container className="classesContainer" maxWidth="md">
//           <Grid container spacing={4}>
//             {/* Replace this section with the mapped portfolios */}
//             {/* For demonstration purposes, we repeat the same card multiple times */}
//             {Array.from({ length: 6 }).map((_, index) => (
//               <Grid item xs={12} sm={6} md={6} key={index}>
//                 <Card className="classesCard">
//                   <CardMedia
//                     className="classesMedia"
//                     image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWy7sgEpvc86GGVJpLnyIN-LciOQ0udRjL3BX1cEAsFQ&s"
//                     title="Image title"
//                   />
//                   <CardContent className="classesContent">
//                     <Typography gutterBottom variant="h5" component="h2">
//                       Heading
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary" component="p">
//                       This is a Portfolio, and here the portfolio will be displayed.
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button size="small" color="primary">
//                       View
//                     </Button>
//                     <Button size="small" color="primary">
//                       Edit
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </div>
//     </div>
//   );
// }
