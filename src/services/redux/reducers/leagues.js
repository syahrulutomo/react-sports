import * as actionTypes from '../actions/action-types';

const initialState = {
  list: [],
  loading: false,
};

const getLeaguesStart = (state) => {
  return { ...state, loading: true };
};

const getLeaguesSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    list: action.list,
  };
};

const getLeaguesFail = (state) => {
  return { ...state, loading: false };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LEAGUES_START: return getLeaguesStart(state, action);
    case actionTypes.GET_LEAGUES_SUCCESS: return getLeaguesSuccess(state, action);
    case actionTypes.GET_LEAGUES_FAIL: return getLeaguesFail(state, action);
    default: return state;
  }
};

export default reducer;
