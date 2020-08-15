import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { PartialHeader } from '../components/partials';
import {
  HomeView, FindLeagueView
} from '../views/public';
import { PublicRoute } from './components';

export function Routes() {
  return (
    <BrowserRouter basename="/">
      <PartialHeader />
      <Switch>
        <PublicRoute exact path="/" component={HomeView} />
        <PublicRoute path="/find" component={FindLeagueView} />
      </Switch>
    </BrowserRouter>
  );
}
