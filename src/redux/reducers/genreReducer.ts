import {
  FETCH_GENRES_REQUEST,
  FETCH_GENRES_ERROR,
  FETCH_GENRES_SUCCESS
} from "../constants/genresConstans";

import { GenreType } from "../../Types/GenreType";

type ActionProps = {
  type: string;
  message: string;
  genresData: GenreType;
};

const initState = {
  genresData: [],
};

const genresReducer = (state = initState, action: ActionProps) => {
  switch (action.type) {
    case FETCH_GENRES_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_GENRES_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        genresData: action.genresData,
      };
    case FETCH_GENRES_ERROR:
      return {
        ...state,
        requesting: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default genresReducer;
