import React, { useEffect, useState } from "react";
import Profile from "../../components/profile/profileComponents";
import { useRouter } from "next/router";
import axios from "axios";
import { Typography } from "@material-ui/core";
import DefaultErrorPage from "next/error";
import { useAuth } from "../../../authentication";

import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";

const ProfilePage = () => {
  const { authUser } = useAuth();

  const router = useRouter();
  const { pname } = router.query;
  console.log(pname);
  const [userProfileInfo, setUserProfileInfo] = useState({});

  function profileCheck() {
    httpClient
      .get(
        `${process.env.BACKEND_URL}/users/userinfo/${pname}`
      )
      .then((res) => {
        setUserProfileInfo(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    profileCheck();
  }, [pname]);

  return (
    <>
      {userProfileInfo.username ? (
        <Profile userDetails={userProfileInfo} />
      ) : (
        "No profile found"
      )}
    </>
  );
};

export default ProfilePage;
