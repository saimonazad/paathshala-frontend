import React, { useState, useEffect } from "react";
import Header from "./header";
import Posts from "./posts";
import About from "./about";

import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";
import { useAuth } from "../../../authentication";

const ClassComponents = (props) => {
  const { authUser } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");

  function handleTabChange(newValue) {
    setActiveTab(newValue);
  }
  //following
  const [followlist, setFollowList] = useState([]);
  const [followerslist, setFollowersList] = useState([]);

  async function fetchFollowingLists() {
    await httpClient
      .get(`${process.env.BACKEND_URL}/users/follow/`)
      .then((res) => {
        console.log(res.data);
        setFollowList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
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
      fetchFollowingLists();
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
        <>{activeTab == "about" && <About />}</>
      )}
    </>
  );
};

export default ClassComponents;