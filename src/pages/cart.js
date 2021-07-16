import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import SecurePage from "../../authentication/auth-page-wrappers/SecurePage";

const Cart = dynamic(() => import("../components/cart"), {
  loading: () => <PageLoader />,
});

const Home = (props) => (
  <SecurePage>
    <Cart />
  </SecurePage>
);

export default Home;
