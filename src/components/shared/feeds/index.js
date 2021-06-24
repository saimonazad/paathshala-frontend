import React from "react";
import Feed from "../feed";
import { useSelector, connect } from "react-redux";

//feed action -redux
import {
  createFeed,
  getAllPersonalFeeds,
} from "../../../redux/actions/feedActions";
//redux store
import { wrapper } from "../../../redux/store";
import { useSession, getSession } from "next-auth/client";

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
    store.dispatch(getAllPersonalFeeds(req));
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    PersonalFeeds: dispatch(getAllPersonalFeeds()),
    createFeed: dispatch(createFeed()),
  };
};

export default connect(null, mapDispatchToProps)(Feeds);
