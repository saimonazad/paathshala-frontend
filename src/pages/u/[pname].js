import React from "react";
import Profile from "../../components/profile";
import { getSession, session, signIn, useSession } from "next-auth/client";

const profile = () => {
  return (
    <>
      <Profile />
    </>
  );
};
// export async function getServerSideProps(context) {
//   try {
//     const session = await getSession(context);
//     if (!session) throw new Error("unauthorized");

//     return {
//       props: {
//         session,
//       },
//     };
//   } catch (err) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/signin",
//       },
//     };
//   }
// }
export default profile;
