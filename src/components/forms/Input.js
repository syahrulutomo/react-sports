import React from 'react';
import PropTypes from 'prop-types';

export const Input = (props) => {
  const { value, handleChange, style, placeholder} = props;
  return (
    <div className="custom-input" style={style}>
      <input className="custom-input-input" type="text" placeholder={placeholder} onChange={handleChange} value={value}/>
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  placeholder: PropTypes.string
}
