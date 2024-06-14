import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCoins, faChartLine } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onSearch }) => (
  <header className="header">
    <Link to="/" className="headerLogo">
      <div className="headerTitle"> <FontAwesomeIcon icon={faChartLine}/> Crypto </div>
    </Link>
    <div className="headerIcons">
      <Link to="/favorites">
        <FontAwesomeIcon icon={faHeart} className="headerIcon" />
      </Link>
      <Link to="/crypto">
        <FontAwesomeIcon icon={faCoins} className="headerIcon" />
      </Link>
    </div>
  </header>
);

export default Header;
