import {
  FETCH_TYPE_CONTRACT_REQUEST,
  FETCH_TYPE_CONTRACT_ERROR,
  FETCH_TYPE_CONTRACT_SUCCESS,
  FETCH_WARNINGWORK_ERROR,
  FETCH_WARNINGWORK_REQUEST,
  FETCH_WARNINGWORK_SUCCESS
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
    const dataTypeContracts = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const warningWorkDoc = collection(db, "warningwork");
    const dbGetDocsWarn = await getDocs(warningWorkDoc);
    const dataWarning = await dbGetDocsWarn.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const cycleDoc = collection(db, "CycleControl");
    const dbGetDocsCycles = await getDocs(cycleDoc);
    const dataCycles = await dbGetDocsCycles.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    
    dispatch({
      type: FETCH_TYPE_CONTRACT_SUCCESS,
      typeContractData: dataTypeContracts,
      warningData: dataWarning,
      cycleData: dataCycles
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
