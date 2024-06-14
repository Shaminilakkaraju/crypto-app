import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt  } from '@fortawesome/free-solid-svg-icons';

const Favorites = ({ favorites, setFavorites }) => {
  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Favorite Cryptocurrencies
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="h6">No favorite cryptocurrencies added yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map(crypto => (
            <Grid item key={crypto.id} xs={12} md={6} lg={4}>
              <Card className="card">
                <CardContent className="cardContent">
                  <Link to={`/crypto/${crypto.id}`} className="link">
                    <Typography variant="h5" component="h2" className="crypto-name">{crypto.name}</Typography>
                  </Link>
                  <Typography className="crypto-detail">Price: ₹{crypto.current_price}</Typography>
                  <Typography className="crypto-detail">Market Cap: ₹{crypto.market_cap}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFavorite(crypto.id)}
                    startIcon={<FontAwesomeIcon icon={faTrashAlt} />}
                    className="button"
                  >
                    Remove from Favorites
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
