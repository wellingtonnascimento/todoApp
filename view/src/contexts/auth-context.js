import React from "react";
import { useHistory } from "react-router-dom";

import authService from "../services/auth-service";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const history = useHistory();
  function getCurrentAccount() {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
  }

  function setCurrentAccount(accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

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

  return (
    <AuthContext.Provider
      value={{ getCurrentAccount, setCurrentAccount, login, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
