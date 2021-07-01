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
  const [userProfileInfo, setUserProfileInfo] = useState({});

  async function enrollmentCheck() {
    await httpClient
      .get(`course/info?course_id=${id}`)
      .then((res) => {
        setUserProfileInfo(res.data);
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
      {!userProfileInfo.username ? (
        <ClassComponents userDetails={userProfileInfo} />
      ) : (
        "No profile found"
      )}
    </>
  );
};

export default ClassPage;
