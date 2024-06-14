import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const Home = () => (
  <Container className="home-container">
    <Typography variant="h3" component="h1" gutterBottom>
      Welcome to Crypto App
    </Typography>
    <div className="home-buttons">
      <Button variant="contained" color="primary" className="home-button" component={Link} to="/crypto">
        View Cryptocurrencies
      </Button>
      <Button variant="contained" color="secondary" className="home-button" component={Link} to="/favorites">
        View Favorites
      </Button>
    </div>
  </Container>
);

export default Home;
