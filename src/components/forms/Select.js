import React from 'react';
import PropTypes from 'prop-types';
import arrowDown from '../../assets/images/keyboard_arrow_down-24px.svg';

export const Select = (props) => {
  const { data, style, value, handleChange, label } = props;

  return (
    <select className="custom-select" value={value} onChange={handleChange} style={{ backgroundImage: `url(${arrowDown})`, ...style }}>
      <option key="not a value" value="">{label}</option>
      {
        data.length > 0 ?
        data.map((d, idx) => {
          return (
            <option key={idx} value={d.value}>{d.label}</option>
          )
        }) : ''
      }
    </select>
  );
};

Select.propTypes = {
  data: PropTypes.array.isRequired,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.string,
  handleChange: PropTypes.func,
  label: PropTypes.string.isRequired
}
