import React, { useState } from "react";
import Header from "./header";
import Posts from "./posts";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");

  function handleTabChange(newValue) {
    setActiveTab(newValue);
  }
  return (
    <>
      <Header changeTab={handleTabChange} />
      {activeTab == "posts" && <Posts />}
    </>
  );
};

export default Profile;
