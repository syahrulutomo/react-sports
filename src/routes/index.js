import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { PartialHeader } from '../components/partials';
import {
  HomeView,
} from '../views/public';
import { PublicRoute } from './components';

export function Routes() {
  return (
    <BrowserRouter basename="/">
      <PartialHeader />
      <Switch>
        <PublicRoute exact path="/" component={HomeView} />
      </Switch>
    </BrowserRouter>
  );
}
