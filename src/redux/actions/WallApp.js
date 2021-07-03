import { fetchError, fetchStart, fetchSuccess } from "./Common";
import axios from "axios";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";

import {
  CREATE_POST,
  GET_FEED_POSTS,
  GET_USER_DETAIL,
  UPDATE_POST,
  GET_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  RESET_COMMENTS,
  ALL_PERSONAL_FEEDS_FAIL,
  ALL_PERSONAL_FEEDS_SUCCESS,
  CREATE_PERSONAL_FEEDS_SUCCESS,
} from "../../../@jumbo/constants/ActionTypes";

//for getting user detail
export const getUserDetail = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get("")
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USER_DETAIL, payload: data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for getting feed posts
export const getFeedPosts = () => {
  return (dispatch) => {
    dispatch(fetchStart());

    const ownPostUrl = "/newsfeed/post/?username=saimonazad";
    const followerPostUrl = "/newsfeed/follower/";
    const data1 = httpClient.get(ownPostUrl);
    const data2 = httpClient.get(followerPostUrl);

    try {
      Promise.all([data1, data2]).then((values) => {
        let followingPosts = [...values[1].data].flat();
        const allPosts = [...values[0].data, ...followingPosts];
        allPosts.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        dispatch(fetchSuccess());
        dispatch({ type: GET_FEED_POSTS, payload: allPosts });
      });
    } catch (error) {
      dispatch(fetchError("Something went wrong"));
    }
    // httpClient
    //   .get("/newsfeed/post/")
    //   .then((data) => {
    //     if (data.status === 200) {
    //       dispatch(fetchSuccess());
    //       dispatch({ type: GET_FEED_POSTS, payload: data.data });
    //     } else {
    //       dispatch(fetchError("Something went wrong"));
    //     }
    //   })
    //   .catch((error) => {
    //     dispatch(fetchError("Something went wrong"));
    //     localStorage.removeItem("token");
    //     httpClient.defaults.headers.common["Authorization"] = "";
    //   });
  };
};

//for getting user feed posts
export const getAllPersonalFeeds = (username) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get(`/newsfeed/post/?username=${username}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ALL_PERSONAL_FEEDS_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};
//for creating a personal post
export const createPersonalPost = (post) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .post("/newsfeed/post/", post)
      .then((data) => {
        console.log(data.data);
        if (data.status === 201) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_PERSONAL_FEEDS_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};
//for creating a new post
export const createPost = (post) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .post("/newsfeed/post/", post)
      .then((data) => {
        console.log(data.data);
        if (data.status === 201) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_POST, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for updating post like status
export const updatePostLikeStatus = (postId, status) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axios
      .put("/wall/posts", { postId, status })
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_POST,
            payload: data.data,
          });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for adding new comment to post
export const addComment = (postId, comment) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .post(`/newsfeed/comments/?post_id=${postId}`, comment)
      .then((data) => {
        if (data.status === 201) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_COMMENT, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for getting comments
export const getComments = (postId) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get(`/newsfeed/comments/?post_id=${postId}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: RESET_COMMENTS, payload: "" });
          dispatch({ type: GET_COMMENTS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for getting user feed posts
export const getAllCourseFeeds = (username) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get(`/newsfeed/post/?username=${username}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ALL_PERSONAL_FEEDS_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};
