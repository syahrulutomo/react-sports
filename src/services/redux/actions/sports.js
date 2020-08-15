import axios from '../../libs/axios';
import * as actionTypes from './action-types';

export const getSportsStart = () => {
  return {
    type: actionTypes.GET_SPORTS_START,
  };
};

export const getSportsSuccess = (list) => {
  return {
    type: actionTypes.GET_SPORTS_SUCCESS,
    list,
  };
};

export const getSportsFail = (error) => {
  return {
    type: actionTypes.GET_SPORTS_FAIL,
    error,
  };
};

export const fetchSports = () => {
  return async (dispatch) => {
    dispatch(getSportsStart());
    try {
      const result = await axios.get('/1/all_sports.php');
      dispatch(getSportsSuccess(result.data.sports));
    } catch (error) {
      dispatch(getSportsFail(error));
    }
  };
};
