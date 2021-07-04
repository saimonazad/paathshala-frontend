import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../authentication/auth-page-wrappers/SecurePage";

const Explore = dynamic(() => import("../components/explore"), {
  loading: () => <PageLoader />,
});

const ExplorePage = (props) => (
  <SecurePage>
    <Explore />
  </SecurePage>
);

export default ExplorePage;
