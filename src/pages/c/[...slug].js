import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "../../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../../authentication/auth-page-wrappers/SecurePage";

const ClassPage = dynamic(
  () => import("../../components/classGroup/classPage"),
  {
    loading: () => <PageLoader />,
  }
);

const Class = () => (
  <SecurePage>
    <ClassPage />
  </SecurePage>
);

export default Class;
