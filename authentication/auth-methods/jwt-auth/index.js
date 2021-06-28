import { useEffect, useState } from "react";
import { httpClient } from "./config";

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

  const userLogin = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post("users/get-token/", user)
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
        fetchError(error.message);
      });
  };

  const userSignup = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post("auth/register", user)
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
          localStorage.setItem("token", data.token.access_token);
          httpClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.token.access_token;
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
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

  const userSignOut = (callbackFun) => {
    fetchStart();
    httpClient
      .post("auth/logout")
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] = "";
          localStorage.removeItem("token");
          setAuthUser(false);
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const getAuthUser = (username) => {
    fetchStart();
    httpClient
      .get(`users/userinfo/${username}`)
      .then(({ data }) => {
        if (data.username) {
          fetchSuccess();
          setAuthUser(data.username);
          localStorage.setItem("user", JSON.stringify(data));
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
