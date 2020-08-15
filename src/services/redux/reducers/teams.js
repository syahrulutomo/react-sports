import * as actionTypes from '../actions/action-types';

const initialState = {
  list: [],
  loading: false,
};

const getTeamsStart = (state) => {
  return { ...state, loading: true };
};

const getTeamsSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    list: action.list,
  };
};

const getTeamsFail = (state) => {
  return { ...state, loading: false };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TEAMS_START: return getTeamsStart(state, action);
    case actionTypes.GET_TEAMS_SUCCESS: return getTeamsSuccess(state, action);
    case actionTypes.GET_TEAMS_FAIL: return getTeamsFail(state, action);
    default: return state;
  }
};

export default reducer;
