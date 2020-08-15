import axios from '../../libs/axios';
import * as actionTypes from './action-types';

export const getLastEventsStart = () => {
  return {
    type: actionTypes.GET_LAST_EVENTS_START,
  };
};

export const getLastEventsSuccess = (list) => {
  return {
    type: actionTypes.GET_LAST_EVENTS_SUCCESS,
    list,
  };
};

export const getLastEventsFail = (error) => {
  return {
    type: actionTypes.GET_LAST_EVENTS_FAIL,
    error,
  };
};

export const fetchLastEvents = (id) => {
  return async (dispatch) => {
    dispatch(getLastEventsStart());
    try {
      const result = await axios.get('/1/eventspastleague.php?id='+id);
      dispatch(getLastEventsSuccess(result.data.events));
    } catch (error) {
      dispatch(getLastEventsFail(error));
    }
  };
};
