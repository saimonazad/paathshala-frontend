import React from "react";
import NewsFeed from "../components/newsFeed";
import { useAuth } from "../../authentication";
import SignInPage from "./signin";

const Home = (props) => {
  const { authUser } = useAuth();
  console.log(authUser);
  return authUser ? <NewsFeed /> : <SignInPage />;
};

export default Home;
