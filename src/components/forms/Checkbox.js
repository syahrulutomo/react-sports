import React from 'react';
import PropTypes from 'prop-types';

export const Checkbox = (props) => {
  const { style, id, value, handleChange, label, disabled } = props;

  return (
    <label htmlFor={id} className="custom-checkbox" style={style}>{label}
      <input id={id} className="custom-checkbox-checkbox" type="checkbox" checked={value} onChange={handleChange} disabled={disabled} />
      {
        disabled ?
        <span className="checkmark" style={{ backgroundColor: '#C5C5C5' }} /> :
        <span className="checkmark" />
      }
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
