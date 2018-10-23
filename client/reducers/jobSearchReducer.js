import * as types from '../actions/actionTypes';

const initialState = {
  data: null
}

const jobSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TEST_DATA:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

export default jobSearchReducer