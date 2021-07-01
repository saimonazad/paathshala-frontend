import React, { useEffect, useState } from "react";
import ClassComponents from "./classComponents";
import { useRouter } from "next/router";
import axios from "axios";
import { Typography } from "@material-ui/core";
import DefaultErrorPage from "next/error";
import { useAuth } from "../../../authentication";

import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";


const ClassPage = () => {
  const { authUser } = useAuth();

  const router = useRouter();
  const { id } = router.query;
  const [enrollmentInfo, setenrollmentInfo] = useState({});

  async function enrollmentCheck() {
    await httpClient
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
  }, [id]);

  return (
    <>
      {enrollmentInfo.length > 0 ? (
        <ClassComponents userDetails={enrollmentInfo} />
      ) : (
        "asf"
      )}
    </>
  );
};

export default ClassPage;
