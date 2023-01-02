import {
  FETCH_RECORDS_ERROR,
  FETCH_RECORDS_REQUEST,
  FETCH_RECORDS_SUCCESS,
} from "../constants/recordConstans";

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

type dispatchProps = { type: string };

const loadRecord = async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCH_RECORDS_REQUEST });
    const recordDoc = collection(db, "records");
    const q = query(recordDoc, orderBy("dateAdd", "asc"));

    const dbGetDocs = await getDocs(recordDoc);
    const dataRecords = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_RECORDS_SUCCESS,
      recordsData: dataRecords,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_RECORDS_ERROR,
      message: error,
    });
  }
};

export { loadRecord };
