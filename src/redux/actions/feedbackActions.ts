import {
  FETCH_FEEDBACK_ERROR,
  FETCH_FEEDBACK_REQUEST,
  FETCH_FEEDBACK_SUCCESS,
} from "../constants/feedbackConstans";

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
import { FeedBackType } from "../../Types/FeedbackType";

type dispatchProps = { type: string };

const loadFeedbacks = async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCH_FEEDBACK_REQUEST });
    const feedbackDoc = collection(db, "feedbacks");
    const dbGetDocs = await getDocs(feedbackDoc);
    const dataFeedbacks = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_FEEDBACK_SUCCESS,
      feedbackData: dataFeedbacks,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_FEEDBACK_ERROR,
      message: error,
    });
  }
};

export { loadFeedbacks };
