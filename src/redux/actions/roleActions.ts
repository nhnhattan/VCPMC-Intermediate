import {
  FETCH_ROLE_REQUEST,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLE_ERROR,
} from "../constants/roleConstans";

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

// Types
import { UserType } from "../../Types/UserType";

type dispatchProps = { type: string };

const loadRoles = async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCH_ROLE_REQUEST });
    const rolesDoc = collection(db, "roles");
    const dbGetDocs = await getDocs(rolesDoc);
    const dataRoles = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_ROLE_SUCCESS,
      roleData: dataRoles,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_ROLE_ERROR,
      message: error,
    });
  }
};

export { loadRoles };

