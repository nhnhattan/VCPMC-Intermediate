import {
  FETCH_FEEDBACK_ERROR,
  FETCH_FEEDBACK_REQUEST,
  FETCH_FEEDBACK_SUCCESS,
} from "../constants/feedbackConstans";
import { FeedBackType } from "../../Types/FeedbackType";

type ActionProps = {
  type: string;
  message: string;
  feedbackData: FeedBackType;
};

const initState = {
  roleData: [],
};

const feedbackReducer = (state = initState, action: ActionProps) => {
  switch (action.type) {
    case FETCH_FEEDBACK_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_FEEDBACK_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        feedbackData: action.feedbackData,
      };
    case FETCH_FEEDBACK_ERROR:
      return {
        ...state,
        requesting: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default feedbackReducer;
