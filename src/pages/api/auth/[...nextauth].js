import NextAuth from "next-auth";
import Providers from "next-auth/providers";
const axios = require("axios");

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        const checkLogin = await axios.post(
          "http://127.0.0.1:8000/users/get-token/",
          {
            username: credentials.username,
            password: credentials.password,
          },
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );

        if (checkLogin.status == 200) {
          let user = {
            name: credentials.username,
            token: checkLogin.data.token,
          };
          return Promise.resolve(user);
        } else {
          return Promise.resolve(new Error("error message"));
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      user && (token.user = user);
      return Promise.resolve(token); // ...here
    },
    session: async (session, user, sessionToken) => {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
