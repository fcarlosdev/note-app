import { ADD_NOTE } from "../constants/action-types";

export const addNote = (payload) => {
  return { type: ADD_NOTE, payload };
};
