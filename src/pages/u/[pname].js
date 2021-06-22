import React, { useEffect, useState } from "react";
import Profile from "../../components/profile";
import { getSession, session, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
import { Typography } from "@material-ui/core";
import DefaultErrorPage from "next/error";

const profile = () => {
  const router = useRouter();
  const { pname } = router.query;
  const [session] = useSession();
  const [userProfileInfo, setUserProfileInfo] = useState([]);

  function profileCheck() {

     axios
      .get(
        `https://paathshala.staging.baeinnovations.com/users/profile_info/?username=${pname}`,
        {
          headers: {
            Authorization: `token ${session.user.token}`,
          },
        }
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
  }, [session]);
  return (
    <>
      {userProfileInfo && userProfileInfo.length > 0 ? (
        <Profile userDetails={userProfileInfo[0]} />
      ) : (
        "NO profile found"
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    if (!session) throw new Error("unauthorized");

    return {
      props: {
        session,
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
}
export default profile;
