import React from "react";
import NewsFeed from "../components/newsFeed";
import { getSession, session, signIn, useSession } from "next-auth/client";

const Home = (props) => {
  return (
    <div>
      <NewsFeed />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    if (!session) throw new Error("unauthorized");

    return {
      props: {
        session,
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
}

export default Home;
