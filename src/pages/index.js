import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../authentication/auth-page-wrappers/SecurePage";

const NewsFeed = dynamic(() => import("../components/newsFeed"), {
  loading: () => <PageLoader />,
});

const Home = (props) => (
  <SecurePage>
    <NewsFeed />
  </SecurePage>
);

export default Home;
