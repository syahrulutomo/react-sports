import React from 'react';
import PropTypes from 'prop-types';

export function Section({ children, style }) {
  return <section className="section--default" style={style}>{children}</section>;
}

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.func,
    PropTypes.object,
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
