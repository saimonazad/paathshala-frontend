import React from "react";
import Link from "next/link";
import { signIn, signOut, getSession } from "next-auth/client";

export default function Page(props) {
  return (
    <>
      {!props.session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {props.session && (
        <>
          Signed in as {props.session.user.name} <br />
          tokens {props.session.user.token} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
      <div>
        <Link href="/private">
          <a>Go to private page</a>
        </Link>
      </div>
    </>
  );
}
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
      props: {},
    };
  }
}
