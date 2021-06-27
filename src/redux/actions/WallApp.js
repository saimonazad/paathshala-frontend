import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import { CREATE_POST, GET_FEED_POSTS, GET_USER_DETAIL, UPDATE_POST } from '../../../@jumbo/constants/ActionTypes';

//for getting user detail
export const getUserDetail = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get("https://mocki.io/v1/15af2f7b-d3b3-431a-8199-e94009846168")
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
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get("https://mocki.io/v1/e2dace5c-91c5-4417-8126-1cb05f914a5a")
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_FEED_POSTS, payload: data.data });
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
export const createPost = post => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/wall/posts', { post })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_POST, payload: data.data });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};

//for updating post like status
export const updatePostLikeStatus = (postId, status) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/wall/posts', { postId, status })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_POST,
            payload: data.data,
          });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};

//for adding new comment to post
export const addComment = (postId, comment) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/wall/posts/comments', { postId, comment })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_POST, payload: data.data });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};
