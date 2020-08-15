import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />}
    />
  );
}

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]).isRequired,
};
