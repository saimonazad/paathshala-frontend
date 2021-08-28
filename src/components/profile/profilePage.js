import React, { useEffect, useState } from "react";
import Profile from "../../components/profile/profileComponents";
import { useRouter } from "next/router";
import axios from "axios";
import { Typography } from "@material-ui/core";
import DefaultErrorPage from "next/error";
import { useAuth } from "../../../authentication";
import useSWR from "swr";
import { fetcher } from "../../services/fetcher";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";

const ProfilePage = () => {
  const { authUser } = useAuth();

  const router = useRouter();
  const { pname } = router.query;
  console.log(pname);
  // const [userProfileInfo, setUserProfileInfo] = useState({});

  const {
    data: userProfileInfo,
    error,
    mutate: mutateProfile,
  } = useSWR(`/users/userinfo/?username=${pname}`, fetcher);
  if (error) {
    return <h2>No profile found</h2>;
  }

  return (
    <>
      {userProfileInfo && userProfileInfo[0]?.username && (
        <Profile
          userDetails={userProfileInfo[0]}
          mutateProfile={mutateProfile}
        />
      )}
    </>
  );
};

export default ProfilePage;
