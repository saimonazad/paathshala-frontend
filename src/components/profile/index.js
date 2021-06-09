import React, { useState } from "react";
import Header from "./header";
import Posts from "./posts";
import Classes from "./classes";
import About from "./about";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");

  function handleTabChange(newValue) {
    setActiveTab(newValue);
  }
  return (
    <>
      <Header changeTab={handleTabChange} />
      {activeTab == "posts" && <Posts />}
      {activeTab == "classes" && <Classes />}
      {activeTab == "about" && <About />}
    </>
  );
};

export default Profile;
