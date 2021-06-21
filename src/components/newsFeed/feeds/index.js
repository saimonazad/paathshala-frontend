import React from "react";
import Feed from "../feed";
import { useSelector, connect } from "react-redux";

//feed action -redux
import { createFeed, getAllFeeds } from "../../../redux/actions/feedActions";
//redux store
import { wrapper } from "../../../redux/store";
const Feeds = () => {
  return (
    <>
      <Feed personal />
      {/* <Feed group />
        <Feed enroll /> */}
    </>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, store }) => {
    store.dispatch(getAllFeeds(req));
  }
);
 
const mapDispatchToProps = (dispatch) => {
  return {
    feeds: dispatch(getAllFeeds()),
    createFeed: dispatch(createFeed()),
  };
};

export default connect(null, mapDispatchToProps)(Feeds);
