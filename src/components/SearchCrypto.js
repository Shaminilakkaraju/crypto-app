import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TextField, InputAdornment } from '@mui/material';

const SearchCrypto = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const delayedSearch = debounce(onSearch, 300);

  const handleChange = (event) => {
    setQuery(event.target.value);
    delayedSearch(event.target.value);
  };

  return (
    <TextField
      type="text"
      placeholder="Search Cryptocurrency"
      value={query}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <FontAwesomeIcon icon={faSearch} />
          </InputAdornment>
        ),
      }}
      fullWidth
      margin="normal"
    />
  );
};

export default SearchCrypto;
