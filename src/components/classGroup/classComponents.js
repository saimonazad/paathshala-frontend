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

  return (
    <>
      <Header
        tabvalue={activeTab}
        changetab={handleTabChange}
        user={props.userDetails}
      />
      {activeTab == "posts" && <Posts user={props.userDetails} />}
      {authUser == props.userDetails.username && (
        <>{activeTab == "about" && <About />}</>
      )}
    </>
  );
};

export default ClassComponents;
