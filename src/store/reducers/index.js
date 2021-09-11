import {
  ADD_NOTE,
  CHANGE_VIEW,
  DELETE_NOTE,
  ADD_LABEL,
} from "../constants/action-types";

const initialState = {
  notes: [],
  tags: ["css","web","golang","python"],
  listView: "row",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case CHANGE_VIEW: {
      return { ...state, listView: action.payload };
    }
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((n) => n.id !== action.payload.id),
      };
    case ADD_LABEL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default rootReducer;
