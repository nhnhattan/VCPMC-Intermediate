import {
  FETCH_TYPE_CONTRACT_REQUEST,
  FETCH_TYPE_CONTRACT_ERROR,
  FETCH_TYPE_CONTRACT_SUCCESS,
} from "../constants/typeContractConstans";

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
import { TypeContractType } from "../../Types/TypeContractType";

type dispatchProps = { type: string };

const loadTypeContracts = async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCH_TYPE_CONTRACT_REQUEST });
    const typeContractDoc = collection(db, "typecontracts");
    const q = query(typeContractDoc, orderBy("key", "asc"));
    const dbGetDocs = await getDocs(q);
    const dataRoles = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_TYPE_CONTRACT_SUCCESS,
      typeContractData: dataRoles,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_TYPE_CONTRACT_ERROR,
      message: error,
    });
  }
};

export { loadTypeContracts };
