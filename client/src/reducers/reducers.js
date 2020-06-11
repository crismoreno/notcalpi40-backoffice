import {
  FETCH_PROJECTS_BEGIN,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
} from '../actions';

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.projects,
      };
    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default reducers;