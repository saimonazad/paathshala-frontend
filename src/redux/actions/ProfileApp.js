//for getting  mail detail
import { fetchError, fetchStart, fetchSuccess } from "./Common";
import axios from "axios";
import { GET_USER_DETAIL } from "../../../@jumbo/constants/ActionTypes";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";

export const getUserDetail = (username) => {
  return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get(`/users/userinfo/${username}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USER_DETAIL, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch((error) => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};
