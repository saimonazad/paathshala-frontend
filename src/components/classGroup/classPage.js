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
  const urlParam = router.query;
  let id = urlParam.slug[0];
  const dispatch = useDispatch();
  const [enrollmentInfo, setenrollmentInfo] = useState({});
  const [error, setError] = useState(false);

  function enrollmentCheck() {
    httpClient
      .get(
        `/course/enrollmentCheck/?type=course&username=${authUser}&course_id=${id}`
      )
      .then((res) => {
        setenrollmentInfo(res.data);
      })
      .catch((error) => {
        setError(true);
      });
  }

  useEffect(() => {
    enrollmentCheck();
    dispatch(getCourse(id));
  }, [id, dispatch]);

  if (error) {
    return <DefaultErrorPage statusCode={404} />;
  }
  if (enrollmentInfo.length == 0) {
    // return <DefaultErrorPage statusCode={404} />;
    return <ClassPageNotEnrolled />;
  }
  if (enrollmentInfo[0]?.course != id && enrollmentInfo[0]?.course != null) {
    return <ClassPageNotEnrolled />;
  }
  return (
    <>
      {enrollmentInfo.length == 1 && !error && (
        <ClassComponents userDetails={enrollmentInfo} />
      )}
    </>
  );
};

export default ClassPage;
