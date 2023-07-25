import "./SavedTemplates.css"
import { Link } from 'react-router-dom'
import { Typography, CssBaseline, Card, CardActions, CardContent, CardMedia, Grid, Container, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function SavedTemplates({ user, token }) {
    
    const [portfolios, setPortfolios] = useState({});
    const params = useParams();

    //dynamic routing for the grid of portfolios
    useEffect(() => {
        axios.post(`localhost:5173/${params.id}`)
            .then(response => setPortfolios(response.data.portfolio))
    }, [])

    //TODO: map through portfolios useState objects and display them in the frontend(that is going to happen down in the grid)

    return (
        <div className="entire-saved">
            <div className="top-buttons">
                <div className="saved-button">
                    <Link to="/saved-templates" className="saved"> My Saved Templates </Link>
                </div>
                <div className="popular-button">
                    <Link to="/popular-templates" className="popular"> Popular Templates </Link>
                </div>
            </div>
            <div className="search-with-create-delete">
                <div className="searchbar">
                    <input type="text" placeholder="Search..." />
                </div>
                <div className="createNew">
                    <button> Create New </button>
                </div>
                <div className="delete">
                    <button> Delete </button>
                </div>
            </div>
            <div className="template-grid">
                <Container className="classesContainer" maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
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
                                    <Button size="small" color="primary">
                                        Edit
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        {/* Add more Grid items for additional cards if needed */}
                    </Grid>
                </Container>

            </div>
        </div>
    )
}