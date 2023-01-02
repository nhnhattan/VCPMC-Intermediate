import {
  FETCH_RECORDS_ERROR,
  FETCH_RECORDS_REQUEST,
  FETCH_RECORDS_SUCCESS,
} from "../constants/recordConstans";

import { RecordType } from "../../Types/RecordType";

type ActionProps = {
  type: string;
  message: string;
  recordsData: RecordType;
};

const initState = {
  recordsData: [],
};

const recordReducer = (state = initState, action: ActionProps) => {
  switch (action.type) {
    case FETCH_RECORDS_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_RECORDS_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        recordsData: action.recordsData,
      };
    case FETCH_RECORDS_ERROR:
      return {
        ...state,
        requesting: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default recordReducer;
