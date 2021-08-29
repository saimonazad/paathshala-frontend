import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../authentication/auth-page-wrappers/SecurePage";

const Notification = dynamic(() => import("../components/notifications"), {
  loading: () => <PageLoader />,
});

const NotificationPage = (props) => (
  <SecurePage>
    <Notification />
  </SecurePage>
);

export default NotificationPage;
