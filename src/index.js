import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import sportsReducer from './services/redux/reducers/sports';
import eventsReducer from './services/redux/reducers/events';
import leaguesReducer from './services/redux/reducers/leagues';

import { Routes } from './routes';

import 'normalize.css';
import './assets/styles/index.scss';

import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  sports: sportsReducer,
  events: eventsReducer,
  leagues: leaguesReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();
