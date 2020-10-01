import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import api from "./services/api";

import "./App.scss";

import Auth from "./pages/Auth";
import Home from "./pages/Home";

import AuthContextProvider from "./contexts/auth-context";

function App() {
  const history = useHistory();

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.statusCode === 403) {
          localStorage.clear();
          history.push("/");
        }
        return Promise.reject(error);
      }
    );
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/(cadastro)?" exact component={Auth} />
          <Route path="/home" component={Home} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
