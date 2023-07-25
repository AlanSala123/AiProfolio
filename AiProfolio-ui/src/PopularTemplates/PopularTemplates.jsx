import { Link } from 'react-router-dom';
import { Button, Container, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './PopularTemplates.css';

export default function PopularTemplates({ user, token }) {
  // State to keep track of the active button
  const [activeTab, setActiveTab] = useState('saved');

  const [portfolios, setPortfolios] = useState({});
  const params = useParams();

  // dynamic routing for the grid of portfolios
  useEffect(() => {
    axios.post('http://localhost:5173/popular-templates').then((response) => setPortfolios(response.data.portfolio));
  }, []);

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    token ? (
      <div className="entire-saved">
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
        <div className="search-with-create-delete">
          <div className="searchbar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="createNew">
            <Button>Create New</Button>
          </div>
        </div>
        <div className="template-grid">
          <Container className="classesContainer" maxWidth="md">
            <Grid container spacing={4}>
              {/* Replace this section with the mapped portfolios */}
              {/* For demonstration purposes, we repeat the same card multiple times */}
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Card className="classesCard">
                    <CardMedia
                      className="classesMedia"
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWy7sgEpvc86GGVJpLnyIN-LciOQ0udRjL3BX1cEAsFQ&s"
                      title="Image title"
                    />
                    <CardContent className="classesContent">
                      <Typography gutterBottom variant="h5" component="h2">
                        Heading
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        This is a Portfolio, and here the portfolio will be displayed.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </div>
    ) : (
      <></>
    )
  );
}
