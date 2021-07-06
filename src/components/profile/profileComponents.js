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

const Profile = (props) => {
  const { authUser } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");

  function handleTabChange(newValue) {
    setActiveTab(newValue);
  }
  //following
  const [followerslist, setFollowersList] = useState([]);

  async function fetchFollowersLists() {
    await httpClient
      .get(`${process.env.BACKEND_URL}/users/follow/?user=${authUser.username}`)
      .then((res) => {
        console.log(res.data);
        setFollowersList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (true) {
      fetchFollowersLists();
    }
  }, []);

  return (
    <>
      <Header
        tabvalue={activeTab}
        changetab={handleTabChange}
        user={props.userDetails}
      />
      {activeTab == "posts" && <Posts user={props.userDetails} />}
      {authUser.username == props.userDetails.username && (
        <>
          {activeTab == "classes" && <Classes />}
          {activeTab == "about" && <About />}
          {activeTab == "followers" && (
            <Followers type="Followers" lists={followerslist} />
          )}
          {activeTab == "following" && <Following type="Following" />}
          {activeTab == "enrolled" && <Enrolled />}
        </>
      )}
    </>
  );
};

export default Profile;
