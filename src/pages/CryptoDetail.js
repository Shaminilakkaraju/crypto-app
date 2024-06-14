import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCryptoDetails, fetchCryptoHistory } from '../services/apiService';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import Chart from 'chart.js/auto'; 
import 'chartjs-adapter-date-fns';

const CryptoDetail = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [history, setHistory] = useState({ dates: [], prices: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartContainer = useRef(null); 
  const chartInstance = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const detailsData = await fetchCryptoDetails(id);
        setCrypto(detailsData);
        const historyData = await fetchCryptoHistory(id);
        setHistory(historyData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cryptocurrency details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (crypto && chartContainer.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartContainer.current, {
        type: 'line',
        data: {
          labels: history.dates,
          datasets: [{
            label: 'Price',
            data: history.prices,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `Price: ₹${context.raw.toFixed(2)}`,
              },
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `₹${value.toFixed(2)}`,
              },
            },
          },
        },
      });
    }
  }, [crypto, history]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      {crypto && (
        <>
          <Typography variant="h3" component="h1" gutterBottom>{crypto.name}</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card className="card">
                <CardContent className="cardContent">
                  <Typography variant="h5" gutterBottom>Cryptocurrency Details</Typography>
                  <Typography variant="body1" gutterBottom><strong>Symbol:</strong> {crypto.symbol}</Typography>
                  <Typography variant="body1" gutterBottom><strong>Price:</strong> ₹{crypto.current_price}</Typography>
                  <Typography variant="body1" gutterBottom><strong>Market Cap:</strong> ₹{crypto.market_cap}</Typography>
                  <Typography variant="body1" gutterBottom><strong>24h High:</strong> ₹{crypto.high_24h}</Typography>
                  <Typography variant="body1" gutterBottom><strong>24h Low:</strong> ₹{crypto.low_24h}</Typography>
                  <Typography variant="body1" gutterBottom><strong>24h Change:</strong> {crypto.price_change_percentage_24h}%</Typography>
                  <Typography variant="body1" gutterBottom><strong>Total Volume:</strong> ₹{crypto.total_volume}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className="card">
                <CardContent className="cardContent">
                  <Typography variant="h6" gutterBottom>Price Chart (Last 30 Days)</Typography>
                  <div className="chartContainer">
                    <canvas ref={chartContainer} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default CryptoDetail;
