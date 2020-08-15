import axios from '../../libs/axios';
import * as actionTypes from './action-types';

export const getTeamsStart = () => {
  return {
    type: actionTypes.GET_TEAMS_START,
  };
};

export const getTeamsSuccess = (list) => {
  return {
    type: actionTypes.GET_TEAMS_SUCCESS,
    list,
  };
};

export const getTeamsFail = (error) => {
  return {
    type: actionTypes.GET_TEAMS_FAIL,
    error,
  };
};

export const fetchTeamsInLeague = (league) => {
  return async (dispatch) => {
    dispatch(getTeamsStart());
    try {
      const result = await axios.get('/1/search_all_teams.php?l='+league);
      dispatch(getTeamsSuccess(result.data.teams));
    } catch (error) {
      dispatch(getTeamsFail(error));
    }
  };
};
