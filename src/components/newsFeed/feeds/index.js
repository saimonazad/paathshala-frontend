import React,{useEffect} from "react";
import Feed from "../feed";
import { useDispatch } from "react-redux";
import { getFeedPosts } from "../../../redux/actions/WallApp";

//redux store
const Feeds = () => {
  
  return (
    <>
      <Feed personal />
      {/* <Feed group />
        <Feed enroll /> */}
    </>
  );
};

export default Feeds;
