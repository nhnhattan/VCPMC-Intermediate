import {
  FETCH_TYPE_CONTRACT_REQUEST,
  FETCH_TYPE_CONTRACT_ERROR,
  FETCH_TYPE_CONTRACT_SUCCESS,
} from "../constants/typeContractConstans";

import { TypeContractType } from "../../Types/TypeContractType";

type ActionProps = {
  type: string;
  message: string;
  typeContractData: TypeContractType;
};

const initState = {
  roleData: [],
};

const typeContractReducer = (state = initState, action: ActionProps) => {
  switch (action.type) {
    case FETCH_TYPE_CONTRACT_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_TYPE_CONTRACT_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        typeContractData: action.typeContractData,
      };
    case FETCH_TYPE_CONTRACT_ERROR:
      return {
        ...state,
        requesting: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default typeContractReducer;
