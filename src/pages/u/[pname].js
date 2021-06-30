import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "../../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../../authentication/auth-page-wrappers/SecurePage";

const ProfilePage = dynamic(
  () => import("../../components/profile/profilePage"),
  {
    loading: () => <PageLoader />,
  }
);

const profile = () => (
  <SecurePage>
    <ProfilePage />
  </SecurePage>
);

export default profile;
