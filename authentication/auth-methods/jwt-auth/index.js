import { useEffect, useState } from "react";
import { httpClient } from "./config";
import Router from "next-router";
import axios from "axios";
export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState("");
  const [loadingAuthUser, setLoadingAuthUser] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const fetchStart = () => {
    setLoading(true);
    setError("");
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError("");
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };

  const userLogin = async (user) => {
    fetchStart();
    await axios
      .post(`${process.env.BACKEND_URL}/users/get-token/`, user)
      .then(({ data }) => {
        if (data) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] =
            "token " + data.token;
          localStorage.setItem("token", data.token);
          getAuthUser(user.username);
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError("Uername/Password doesn't match. Please try again !");
      });
  };

  const userSignup = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post("/users/register/", user)
      .then(({ data }) => {
        if (data) {
          fetchSuccess();
          userLogin({ username: user.username, password: user.password });
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        if (error.response.data.username) {
          fetchError(error.response.data.username);
        } else {
          fetchError("Something went wrong! Please try again");
        }
      });
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = () => {
    localStorage.removeItem("token");
    setAuthUser(false);
  };

  const getAuthUser = (username) => {
    fetchStart();
    httpClient
      .get(`/users/userinfo/?username=${username}`)
      .then(({ data }) => {
        if (data[0].username) {
          fetchSuccess();
          setAuthUser(data[0].username);
          localStorage.setItem("user", JSON.stringify(data[0]));
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        httpClient.defaults.headers.common["Authorization"] = "";
        fetchError(error.message);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpClient.defaults.headers.common["Authorization"] = "token " + token;
      setLoadingAuthUser(false);
      setAuthUser(JSON.parse(localStorage.getItem("user")));
    } else {
      localStorage.removeItem("token");
      httpClient.defaults.headers.common["Authorization"] = "";
      setLoadingAuthUser(false);
    }
  }, []);
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  // Return the user object and auth methods
  return {
    loadingAuthUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
