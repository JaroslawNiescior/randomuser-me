import { FETCH_API } from '../actions/types';

const fetchApiReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_API:
      return action.payload;

    default:
      return state;
  }
};

export default fetchApiReducer;
