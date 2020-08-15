import axios from '../../libs/axios';
import * as actionTypes from './action-types';

export const getLeaguesStart = () => {
  return {
    type: actionTypes.GET_LEAGUES_START,
  };
};

export const getLeaguesSuccess = (list) => {
  return {
    type: actionTypes.GET_LEAGUES_SUCCESS,
    list,
  };
};

export const getLeaguesFail = (error) => {
  return {
    type: actionTypes.GET_LEAGUES_FAIL,
    error,
  };
};

export const fetchLeagues = () => {
  return async (dispatch) => {
    dispatch(getLeaguesStart());
    try {
      const result = await axios.get('/1/all_leagues.php');
      dispatch(getLeaguesSuccess(result.data.leagues.slice(0,30)));
    } catch (error) {
      dispatch(getLeaguesFail(error));
    }
  };
};

export const getDetailLeagueStart = () => {
  return {
    type: actionTypes.GET_DETAIL_LEAGUE_START,
  };
};

export const getDetailLeagueSuccess = (detail) => {
  return {
    type: actionTypes.GET_DETAIL_LEAGUE_SUCCESS,
    detail,
  };
};

export const getDetailLeagueFail = (error) => {
  return {
    type: actionTypes.GET_DETAIL_LEAGUE_FAIL,
    error,
  };
};

export const fetchLeagueDetails = (id) => {
  return async (dispatch) => {
    dispatch(getDetailLeagueStart());
    try {
      const result = await axios.get('/1/lookupleague.php?id='+id);
      dispatch(getDetailLeagueSuccess(result.data.leagues[0]));
    } catch (error) {
      dispatch(getDetailLeagueFail(error));
    }
  };
};
