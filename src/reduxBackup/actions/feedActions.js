import axios from "axios";
import { getSession, useSession } from "next-auth/client";
import {
  ALL_FEEDS_FAIL,
  ALL_FEEDS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_FEED_FAIL,
  CREATE_FEED_SUCCESS,
  ALL_PERSONAL_FEEDS_FAIL,
  ALL_PERSONAL_FEEDS_SUCCESS,
} from "../constants/allFeeds";
//get session

//Get all feeds

export const getAllFeeds = (req) => async (dispatch) => {
  try {
    const session = await getSession();

    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/newsfeed/post/`,
      {
        headers: {
          Authorization: `token ${session.user.token}`,
        },
      }
    );

    await dispatch({
      type: ALL_FEEDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_FEEDS_FAIL,
      payload: error.data,
    });
  }
};

//clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

//create a feed

export const createFeed = (feedData) => async (dispatch) => {
  try {
    const session = await getSession();

    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/newsfeed/post/`,
      feedData,
      {
        headers: {
          Authorization: `token ${session.user.token}`,
        },
      }
    );

    dispatch({
      type: CREATE_FEED_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CREATE_FEED_FAIL,
      payload: error.message,
    });
  }
};

//Get all personal feeds

export const getAllPersonalFeeds  = (req) => async (dispatch) => {
  try {
    const session = await getSession();

    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/newsfeed/post/?username=${session.user.name}`,
      {
        headers: {
          Authorization: `token ${session.user.token}`,
        },
      }
    );

    await dispatch({
      type: ALL_PERSONAL_FEEDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PERSONAL_FEEDS_FAIL,
      payload: error.data,
    });
  }
};
