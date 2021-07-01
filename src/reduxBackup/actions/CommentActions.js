import axios from "axios";
import { getSession, useSession } from "next-auth/client";
import {
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_RESET,
  CREATE_COMMENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/allComments";

//clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

//create a comment

export const createComment = (commentData, post_id) => async (dispatch) => {
  try {
    const session = await getSession();

    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/newsfeed/comments/?post_id=${post_id}`,
      commentData,
      {
        headers: {
          Authorization: `token ${session.user.token}`,
        },
      }
    );

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.message,
    });
  }
};
