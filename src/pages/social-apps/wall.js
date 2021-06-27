import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "../../../@jumbo/components/PageComponents/PageLoader";
// import SecurePage from "../../../authentication/auth-page-wrappers/SecurePage";

const Wall = dynamic(() => import("../../components/Apps/Wall"), {
  loading: () => <PageLoader />,
});

const WallPage = () => (
  <>
    <Wall />
  </>
);

export default WallPage;
