import React, { useEffect, useState } from "react";
import ClassComponents from "./classComponents";
import { useRouter } from "next/router";
import axios from "axios";
import { Typography } from "@material-ui/core";
import DefaultErrorPage from "next/error";
import { useAuth } from "../../../authentication";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";
import ClassPageNotEnrolled from "./classPageNotEnrolled";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../redux/actions/courseActions";


const ClassPage = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [enrollmentInfo, setenrollmentInfo] = useState({});

  function enrollmentCheck() {
    httpClient
      .get(
        `/course/enrollmentCheck/?type=course&username=${authUser.username}&course_id=${id}`
      )
      .then((res) => {
        setenrollmentInfo(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    enrollmentCheck();
    dispatch(getCourse(id));
  }, [id, dispatch]);

  return (
    <>
      {enrollmentInfo.length > 0 ? (
        <ClassComponents userDetails={enrollmentInfo} />
      ) : (
        <ClassPageNotEnrolled />
      )}
    </>
  );
};

export default ClassPage;
