import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  LOGIN, LOGOUT
} from "../constants/userConstans";
type UserType = {
  id: string;
  username: string;
  password: string;
};
type ActionProps = {
  type: string;
  message: string;
  users: UserType;
  currentUser?: UserType | null;
};
const initState = {
  request: false,
  success: false,
  message: null,
  users: [
    {
      id: "",
      username: "",
      password: "",
    },
  ],
  currentUser: null,
};

const userReducer = (state = initState, action: ActionProps) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        users: action.users,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        requesting: false,
        message: action.message,
      };
    case LOGIN:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
