import React from 'react';
import PropTypes from 'prop-types';

export const ThumbnailLoader = (props) => {
  const { style } = props;
  return (
    <div className="thumbnail-loader" style={style}/>
  );
}

ThumbnailLoader.propTypes = {
  style: PropTypes.object
};

