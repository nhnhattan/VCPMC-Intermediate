import {
  FETCH_GENRES_ERROR,
  FETCH_GENRES_REQUEST,
  FETCH_GENRES_SUCCESS,
} from "../constants/genresConstans";

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
import { GenreType } from "../../Types/GenreType";

type dispatchProps = { type: string };

const loadGenres = async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCH_GENRES_REQUEST });
    const genresDoc = collection(db, "genres");
    const q = query(genresDoc, orderBy("key", "asc"));

    const dbGetDocs = await getDocs(q);
    const dataGenres = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_GENRES_SUCCESS,
      genresData: dataGenres,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_GENRES_ERROR,
      message: error,
    });
  }
};

export { loadGenres };
