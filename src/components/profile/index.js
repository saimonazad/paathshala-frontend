import React, { useState, useEffect } from "react";
import Header from "./header";
import Posts from "./posts";
import Classes from "./classes";
import About from "./about";
import Following from "./following";
import Followers from "./followers";
import Enrolled from "./enrolled";
import { getSession, useSession } from "next-auth/client";
import axios from "axios";
const Profile = (props) => {
  const [session] = useSession();
  const [activeTab, setActiveTab] = useState("posts");

  function handleTabChange(newValue) {
    setActiveTab(newValue);
  }
  //following
  const [followlist, setFollowList] = useState([]);
  const [followerslist, setFollowersList] = useState([]);

  async function fetchFollowingLists() {
    const session = await getSession();
    await axios
      .get(`https://paathshala.staging.baeinnovations.com/users/follow/`, {
        headers: {
          Authorization: `token ${session.user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFollowList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function fetchFollowersLists() {
    const session = await getSession();
    await axios
      .get(
        `https://paathshala.staging.baeinnovations.com/users/follow/?user=${session.user.name}`,
        {
          headers: {
            Authorization: `token ${session.user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setFollowersList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //follow a user
  async function followUserHandler(username) {
    const session = await getSession();
    await axios
      .post(
        "https://paathshala.staging.baeinnovations.com/users/follow/",
        {
          followed: username,
        },
        {
          headers: {
            Authorization: `token ${session.user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    if (session) {
      fetchFollowingLists();
      fetchFollowersLists();
    }
  }, [session]);

  return (
    <>
      <Header
        tabvalue={activeTab}
        changetab={handleTabChange}
        followHandler={followUserHandler}
        user={props.userDetails}
      />

      {session.user.name == props.userDetails.username && (
        <>
          {activeTab == "posts" && <Posts />}
          {activeTab == "classes" && <Classes />}
          {activeTab == "about" && <About />}
          {activeTab == "followers" && (
            <Followers type="Followers" lists={followerslist} />
          )}
          {activeTab == "following" && (
            <Following type="Following" lists={followlist} />
          )}
          {activeTab == "enrolled" && <Enrolled />}
        </>
      )}
    </>
  );
};

export default Profile;
