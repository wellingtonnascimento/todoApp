import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import authService from "../services/auth-service";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [getCurrentAccountUser, setCurrentAccountUser] = useState({});
  const history = useHistory();
  function getCurrentAccount() {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
  }

  function setCurrentAccount(accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  // function setCurrentAccountUser(user) {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }

  // function getCurrentAccountUser() {
  //   return JSON.parse(localStorage.getItem("user"));
  // }

  async function login(body) {
    try {
      const response = (await authService.login(body)).data;
      setCurrentAccount(response.token);
      history.push("/home");
    } catch (error) {
      throw error;
    }
  }

  async function signup(body) {
    try {
      const response = (await authService.signup(body)).data;
      setCurrentAccount(response.token);
      history.push("/home");
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <AuthContext.Provider
      value={{
        getCurrentAccount,
        setCurrentAccount,
        login,
        signup,
        setCurrentAccountUser,
        getCurrentAccountUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
