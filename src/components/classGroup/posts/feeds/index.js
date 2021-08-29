import React, { useEffect } from "react";
import Feed from "../feed";
//redux store
const Feeds = ({ feed, mutate }) => {
  return (
    <>
      <Feed personal feed={feed} mutate={mutate} />
      {/* <Feed group />
        <Feed enroll /> */}
    </>
  );
};

export default Feeds;
