import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCoins, faChartLine, faHome } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onSearch }) => (
  <header className="header">
    <Link to="/" className="headerLogo">
      <div className="headerTitle">
        <FontAwesomeIcon icon={faChartLine} /> Crypto
      </div>
    </Link>
    <div className="headerIcons">
      <Link to="/" className="headerIcon">
        <FontAwesomeIcon icon={faHome} title="Home" />
      </Link>
      <Link to="/favorites" className="headerIcon">
        <FontAwesomeIcon icon={faHeart} title="Favorites" />
      </Link>
      <Link to="/crypto" className="headerIcon">
        <FontAwesomeIcon icon={faCoins} title="Crypto List" />
      </Link>
    </div>
  </header>
);

export default Header;
