import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import CryptoList from './pages/CryptoList';
import CryptoDetail from './pages/CryptoDetail';
import Favorites from './pages/Favorites';
import { Container } from '@mui/material';
import './styles.css';

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const handleSearch = (query) => {
  };

  return (
    <Router>
      <div className="app-container">
        <Header onSearch={handleSearch} />
        <Container className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crypto" element={<CryptoList favorites={favorites} setFavorites={setFavorites} />} />
            <Route path="/crypto/:id" element={<CryptoDetail />} />
            <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
          </Routes>
        </Container>
        <Footer /> 
      </div>
    </Router>
  );
};

export default App;
