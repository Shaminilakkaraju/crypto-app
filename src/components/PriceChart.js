import React, { useEffect, useState } from 'react';
import { fetchCryptoHistory } from '../services/apiService';
import { Line } from 'react-chartjs-2';
import { CircularProgress, Alert } from '@mui/material';

const PriceChart = ({ id }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCryptoHistory = async () => {
      try {
        const data = await fetchCryptoHistory(id);
        setChartData({
          labels: data.dates,
          datasets: [
            {
              label: 'Price',
              data: data.prices,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
            },
          ],
        });
      } catch (err) {
        setError('Failed to fetch historical data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getCryptoHistory();
  }, [id]);

  const options = {
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
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PriceChart;
