import React, { useState, useEffect } from "react";
import Header from "./header";
import Posts from "./posts";
import Classes from "./classes";
import About from "./about";
import Following from "./following";
import Followers from "./followers";
import Enrolled from "./enrolled";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";
import { useAuth } from "../../../authentication";
import { useRouter } from "next/router";
const Profile = (props) => {
  const { authUser } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const router = useRouter();
  const { pname } = router.query;
  function handleTabChange(newValue) {
    setActiveTab(newValue);
  }
  //following
  const [followerslist, setFollowersList] = useState([]);

  async function fetchFollowersLists() {
    await httpClient
      .get(
        `${process.env.BACKEND_URL}/users/follow/?type=follower&username=${props.userDetails.username}`
      )
      .then((res) => {
        console.log(res.data);
        setFollowersList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchFollowersLists();
  }, [authUser]);

  return (
    <>
      <Header
        tabvalue={activeTab}
        changetab={handleTabChange}
        user={props.userDetails}
        count={followerslist.length}
        mutateProfile={props.mutateProfile}
      />
      {activeTab == "posts" && <Posts user={props.userDetails} />}
      {activeTab == "classes" && <Classes user={props.userDetails} />}
      {activeTab == "about" && <About />}
      {activeTab == "followers" && (
        <Followers
          type="Followers"
          lists={followerslist}
          user={props.userDetails}
        />
      )}
      {activeTab == "following" && (
        <Following type="Following" user={props.userDetails} />
      )}
      {activeTab == "enrolled" && <Enrolled user={props.userDetails} />}
    </>
  );
};

export default Profile;
