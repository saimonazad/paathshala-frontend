import React from "react";
import dynamic from "next/dynamic";
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import AuthPage from "../../authentication/auth-page-wrappers/AuthPage";

const SignUp = dynamic(() => import("../components/Auth/SignUp"), {
  loading: () => <PageLoader />,
});

const SignUpPage = () => (
  <AuthPage>
    <SignUp />
  </AuthPage>
);

export default SignUpPage;
