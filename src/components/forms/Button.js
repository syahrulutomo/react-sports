import React from 'react';
import PropTypes from 'prop-types';
import search from '../../assets/images/search-white-18dp.svg';


export const Button = (props) => {
  const { title, handleClick } = props;

  return (
    <button className="custom-button" onClick={handleClick}>
      {title}
      <img src={search} alt="search icon"/>
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

