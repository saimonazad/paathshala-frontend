import React, { useState } from "react";
import Header from "./header";
import Posts from "./posts";
import Classes from "./classes";
import About from "./about";
import FollowLists from "./followLists";
import Enrolled from "./enrolled";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");

  function handleTabChange(newValue) {
    setActiveTab(newValue);
  }
  return (
    <>
      <Header tabvalue={activeTab} changetab={handleTabChange} />
      {activeTab == "posts" && <Posts />}
      {activeTab == "classes" && <Classes />}
      {activeTab == "about" && <About />}
      {activeTab == "followers" && <FollowLists type="Followers" />}
      {activeTab == "following" && <FollowLists type="Following" />}
      {activeTab == "enrolled" && <Enrolled />}
    </>
  );
};

export default Profile;
