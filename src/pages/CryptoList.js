import React, { useEffect, useState } from 'react';
import { fetchCryptos } from '../services/apiService';
import { Link } from 'react-router-dom';
import SearchCrypto from '../components/SearchCrypto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Container, Grid, Button, Typography, Card, CardContent, CircularProgress, Alert } from '@mui/material';

const CryptoList = ({ favorites, setFavorites }) => {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCryptos = async () => {
      try {
        const data = await fetchCryptos();
        setCryptos(data);
        setFilteredCryptos(data);
      } catch (err) {
        setError('Failed to fetch cryptocurrencies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getCryptos();
  }, []);

  const handleSearch = (query) => {
    const filtered = cryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCryptos(filtered);
  };

  const handleAddFavorite = (crypto) => {
    if (!favorites.some(fav => fav.id === crypto.id)) {
      setFavorites([...favorites, crypto]);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>Cryptocurrency List</Typography>
      <SearchCrypto onSearch={handleSearch} />
      <Grid container spacing={3}>
        {filteredCryptos.map(crypto => (
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
                  color="primary"
                  onClick={() => handleAddFavorite(crypto)}
                  startIcon={<FontAwesomeIcon icon={faStar} />}
                  className="button"
                >
                  Add to Favorites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CryptoList;
