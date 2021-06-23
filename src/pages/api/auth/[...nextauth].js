import NextAuth from "next-auth";
import Providers from "next-auth/providers";
const axios = require("axios");

const options = {
  // Configure one or more authentication providers
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Credentials({
      id: "signin",
      name: "Credentials",
      authorize: async (credentials) => {
        const checkLogin = await axios.post(
          "https://paathshala.staging.baeinnovations.com/users/get-token/",
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

        if (checkLogin) {
          let user = {
            name: credentials.username,
            token: checkLogin.data.token,
          };
          return Promise.resolve(user);
        } else {
          return Promise.reject(new Error("error message"));
        }
      },
    }),
    Providers.Credentials({
      id: "signup",
      name: "signup",
      authorize: async (credentials) => {
        const signUp = await axios.post(
          "https://paathshala.staging.baeinnovations.com/users/register/",
          {
            first_name: credentials.first_name,
            last_name: credentials.last_name,
            username: credentials.username,
            email: credentials.email,
            gender: credentials.gender,
            phoneNo: credentials.phoneNo,
            referral_code: credentials.referral_code,
            password: credentials.password,
          }
        );

        if (signUp) {
          const checkLogin = await axios.post(
            "https://paathshala.staging.baeinnovations.com/users/get-token/",
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
          let user = {
            name: credentials.username,
            token: checkLogin.data.token,
          };
          return Promise.resolve(user);
        } else {
          return Promise.reject(new Error(signup.data));
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    redirect: async (url, baseUrl) => {
        return url.startsWith(baseUrl)
            ? Promise.resolve(url)
            : Promise.resolve(baseUrl)
    },
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
