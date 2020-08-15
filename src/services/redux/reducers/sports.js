import * as actionTypes from '../actions/action-types';

const initialState = {
  list: [],
  loading: false,
};

const getSportsStart = (state) => {
  return { ...state, loading: true };
};

const getSportsSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    list: action.list,
  };
};

const getSportsFail = (state) => {
  return { ...state, loading: false };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SPORTS_START: return getSportsStart(state, action);
    case actionTypes.GET_SPORTS_SUCCESS: return getSportsSuccess(state, action);
    case actionTypes.GET_SPORTS_FAIL: return getSportsFail(state, action);
    default: return state;
  }
};

export default reducer;
