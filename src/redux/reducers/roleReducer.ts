import {
  FETCH_ROLE_REQUEST,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLE_ERROR,
} from "../constants/roleConstans";

import { RoleType } from "../../Types/RoleType";
type ActionProps = {
  type: string;
  message: string;
  roleData: RoleType;
};

const initState = {
  roleData: [],
};

const roleReducer = (state = initState, action: ActionProps) => {
  switch (action.type) {
    case FETCH_ROLE_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_ROLE_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        roleData: action.roleData,
      };
    case FETCH_ROLE_ERROR:
      return {
        ...state,
        requesting: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default roleReducer;
