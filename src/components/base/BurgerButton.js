import React from 'react';
import PropTypes from 'prop-types';

export const BurgerButton = (props) => {
  const { active, handleClick } = props;

  const classStyle = active ? 'burger-button-active' : 'burger-button'; 

  return (
    <div style={{ width: '40px', height: '40px', position: 'relative', top: '50%' }} onClick={handleClick}>
      <div className={classStyle}/>
    </div>
  );
}

BurgerButton.propTypes = {
  active: PropTypes.bool,
  handleClick: PropTypes.func
}