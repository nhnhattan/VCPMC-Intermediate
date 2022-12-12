import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  LOGIN,
} from "../constants/userConstans";

import {
  doc,
  getDocs,
  getDoc,
  collection,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Dispatch } from "redux";

type UserType = {
  id: string;
  username: string;
  password: string;
};

type dispatchProps = { type: string };
const loadUsers = async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCH_USER_REQUEST });
    const userDoc = collection(db, "users");
    const dbGetDocs = await getDocs(userDoc);
    const dataUsers = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_USER_SUCCESS,
      users: dataUsers,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_USER_ERROR,
      message: error,
    });
  }
};

const userLogin = (user?: UserType | null) => async (dispatch: Dispatch) => {
  dispatch({
    type: LOGIN,
    currentUser: user,
  });
};

const userLogout = (user?: UserType | null) => async (dispatch: Dispatch) => {
  dispatch({
    type: LOGIN,
    currentUser: null,
  });
};

export { loadUsers, userLogin, userLogout };
