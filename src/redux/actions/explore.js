import { fetchError, fetchStart, fetchSuccess } from "./Common";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";

import { GET_ALL_USERS_SUCCESS } from "../../../@jumbo/constants/ActionTypes";
//get session
//basic info

export const getAllUsers = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get("/users/userinfo")
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};
