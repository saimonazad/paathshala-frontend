import { fetchError, fetchStart, fetchSuccess } from "./Common";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";

import {
  CREATE_COURSE_SUCCESS,
  ALL_PERSONAL_COURSE_SUCCESS,
  GET_COURSE_SUCCESS,
  GET_USER_COURSE_SUCCESS,
} from "../../../@jumbo/constants/ActionTypes";

//for getting all personal courses
export const getAllPersonalCourses = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get("/course/info?type=own")
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ALL_PERSONAL_COURSE_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for getting a single course
export const getCourse = (courseId) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get(`/course/info/?course_id=${courseId}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_COURSE_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for enrolling a single course
export const enrollCourse = (courseId) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .post(`/course/student/`, { course_id: courseId })
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          // dispatch({ type: GET_COURSE_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for creating a course
export const createCourse = (courseInfo) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .post("/course/info/", courseInfo)
      .then((data) => {
        if (data.status === 201) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_COURSE_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for getting other user  courses
export const getAllUserCourses = (username) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get(`/course/info?type=user&username=${username}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USER_COURSE_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};
