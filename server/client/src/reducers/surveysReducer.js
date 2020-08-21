import { FETCH_SURVEYS, DELETE_SURVEY } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;

    case DELETE_SURVEY:
      return state.filter((surveys) => surveys._id !== action.payload);

    default:
      return state;
  }
};
