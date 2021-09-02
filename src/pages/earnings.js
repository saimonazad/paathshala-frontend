import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../authentication/auth-page-wrappers/SecurePage";

const Earnings = dynamic(() => import("../components/earnings"), {
  loading: () => <PageLoader />,
});

const Home = (props) => (
  <SecurePage>
    <Earnings />
  </SecurePage>
);

export default Home;
