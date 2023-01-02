import {
  FETCH_TYPE_CONTRACT_REQUEST,
  FETCH_TYPE_CONTRACT_ERROR,
  FETCH_TYPE_CONTRACT_SUCCESS,
} from "../constants/typeContractConstans";

import { TypeContractType } from "../../Types/TypeContractType";
import { CycleControlType } from "../../Types/CycleControlType";
type warningDataType = [
  {
    id: string,
    dayWarning: number
  }
]
type ActionProps = {
  type: string;
  message: string;
  typeContractData: TypeContractType;
  warningData: warningDataType;
  cycleData: CycleControlType;
};

const initState = {
  typeContractData: [],
  warningData: [],
  cycleData: []
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
        warningData: action.warningData,
        cycleData: action.cycleData
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
