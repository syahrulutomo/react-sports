import * as actionTypes from '../actions/action-types';

const initialState = {
  list: [],
  loading: false,
  detail: {},
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

const getDetailLeagueStart = (state) => {
  return { ...state, loading: true };
};

const getDetailLeagueSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    detail: action.detail,
  };
};

const getDetailLeagueFail = (state) => {
  return { ...state, loading: false };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LEAGUES_START: return getLeaguesStart(state, action);
    case actionTypes.GET_LEAGUES_SUCCESS: return getLeaguesSuccess(state, action);
    case actionTypes.GET_LEAGUES_FAIL: return getLeaguesFail(state, action);
    case actionTypes.GET_DETAIL_LEAGUE_START: return getDetailLeagueStart(state, action);
    case actionTypes.GET_DETAIL_LEAGUE_SUCCESS: return getDetailLeagueSuccess(state, action);
    case actionTypes.GET_DETAIL_LEAGUE_FAIL: return getDetailLeagueFail(state, action);
    default: return state;
  }
};

export default reducer;
