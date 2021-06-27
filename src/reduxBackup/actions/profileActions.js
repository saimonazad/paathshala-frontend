import axios from "axios";
import { getSession, useSession } from "next-auth/client";
import {
  ALL_ACADEMIC_INFO_FAIL,
  ALL_ACADEMIC_INFO_SUCCESS,
  ALL_BASIC_INFO_FAIL,
  ALL_BASIC_INFO_SUCCESS,
  ALL_WORK_INFO_FAIL,
  ALL_WORK_INFO_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/profileInfo";
//get session
//basic info

export const getBasicInfo = (req) => async (dispatch) => {
  try {
    const session = await getSession();

    const { data } = await axios.get(
      "https://paathshala.staging.baeinnovations.com/users/profile/",
      {
        headers: {
          Authorization: `token ${session.user.token}`,
        },
      }
    );

    await dispatch({
      type: ALL_BASIC_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BASIC_INFO_FAIL,
      payload: error.data,
    });
  }
};

//work info

export const getWorkInfo = (req) => async (dispatch) => {
  try {
    const session = await getSession();

    const { data } = await axios.get(
      "https://paathshala.staging.baeinnovations.com/users/workinfo/",
      {
        headers: {
          Authorization: `token ${session.user.token}`,
        },
      }
    );

    await dispatch({
      type: ALL_WORK_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_WORK_INFO_FAIL,
      payload: error.data,
    });
  }
};

//academic info

export const getAcademicInfo = (req) => async (dispatch) => {
  try {
    const session = await getSession();

    const { data } = await axios.get(
      "https://paathshala.staging.baeinnovations.com/users/academic_info/",
      {
        headers: {
          Authorization: `token ${session.user.token}`,
        },
      }
    );

    await dispatch({
      type: ALL_ACADEMIC_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ACADEMIC_INFO_FAIL,
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
