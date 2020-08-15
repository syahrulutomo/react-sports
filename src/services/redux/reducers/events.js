import * as actionTypes from '../actions/action-types';

const initialState = {
  list: [],
  loading: false,
};

const getLastEventsStart = (state) => {
  return { ...state, loading: true };
};

const getLastEventsSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    list: action.list,
  };
};

const getLastEventsFail = (state) => {
  return { ...state, loading: false };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LAST_EVENTS_START: return getLastEventsStart(state, action);
    case actionTypes.GET_LAST_EVENTS_SUCCESS: return getLastEventsSuccess(state, action);
    case actionTypes.GET_LAST_EVENTS_FAIL: return getLastEventsFail(state, action);
    default: return state;
  }
};

export default reducer;
