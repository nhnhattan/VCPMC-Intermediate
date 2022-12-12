import { combineReducers } from "redux";
import userReducer from "./userReducer";

type UserType = {
  id: string;
  username: string;
  password: string;
};
type ActionProps = {
  type: string;
  message: string;
  users: UserType;
  currentUser: UserType;
};

const reducer = combineReducers({
  users: userReducer,
});
export type State = ReturnType<typeof reducer>;

export default (state: any, action: ActionProps) => reducer(state, action);
