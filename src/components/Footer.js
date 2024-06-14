import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCoins, faHome } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
      <Typography variant="body2" color="textSecondary" align="center">
          <Link to="/" className="footer-link">
          <FontAwesomeIcon icon={faHome} title="Home" />
          </Link>{' '}
          |{' '}
          <Link to="/crypto" className="footer-link">
          <FontAwesomeIcon icon={faCoins} title="Crypto List" />
          </Link>{' '}
          |{' '}
          <Link to="/favorites" className="footer-link">
          <FontAwesomeIcon icon={faHeart} title="Favorites" />
          </Link>
        </Typography>
          © {new Date().getFullYear()} Crypto App. All rights reserved.
      </Container>
    </footer>
  );
};

export default Footer;
