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
      dispatch(getLeaguesSuccess(result.data.leagues));
    } catch (error) {
      dispatch(getLeaguesFail(error));
    }
  };
};
