import * as types from '../actions/actionTypes';
import data from '../data.json'

const initialState = {
  data: data,
  loggedIn: false
}

const jobSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TEST_DATA:
      return {
        ...state,
        data: action.payload
      };
    case types.SET_LOGGED_IN:
    return {
      ...state,
      loggedIn: !state.loggedIn
    };
    default:
      return state;
  }
}

export default jobSearchReducer