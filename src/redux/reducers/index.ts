import { combineReducers } from "redux";
import userReducer from "./userReducer";
import roleReducer from "./roleReducer";
import feedbackReducer from "./feedbackReducer";
import genresReducer from "./genreReducer";

import typeContractReducer from "./typeContractReducer";
import { UserType } from "../../Types/UserType";
import { RoleType } from "../../Types/RoleType";
import { FeedBackType } from "../../Types/FeedbackType";
import { TypeContractType } from "../../Types/TypeContractType";
import { GenreType } from "../../Types/GenreType";
import { RecordType } from "../../Types/RecordType";
import recordReducer from "./recordReducer";

type ActionProps = {
  type: string;
  message: string;
  users: UserType;
  currentUser: UserType;
  roleData: RoleType;
  feedbackData: FeedBackType;
  typecontracts: TypeContractType;
  genresData: GenreType;
  recordsData: RecordType
};

const reducer = combineReducers({
  users: userReducer,
  roles: roleReducer,
  feedbacks: feedbackReducer,
  typeContracts: typeContractReducer,
  genresData: genresReducer,
  recordsData: recordReducer,
});

export type State = ReturnType<typeof reducer>;

export default (state: any, action: ActionProps) => reducer(state, action);
