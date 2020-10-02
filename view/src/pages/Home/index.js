import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import { Container, Row, Col, Button } from "react-bootstrap";

import { AuthContext } from "../../contexts/auth-context";

import api from "../../services/api";

import "./styled.scss";

import TodoForm from "../../components/TodoForm";
import ProfileForm from "../../components/ProfileForm";
import logo from "../../assets/logo-rstcom-ok-.png";

export default function Home({ history }) {
  const {
    getCurrentAccount,
    getCurrentAccountUser,
    setCurrentAccountUser,
    logout,
  } = useContext(AuthContext);

  //console.log(getCurrentAccount());
  function onClickTodoList() {
    history.push("/home");
  }
  function onClickProfile() {
    history.push("/home/profile");
  }

  const user = getCurrentAccountUser || {};

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await api.get("user");

        setCurrentAccountUser(data.userCredentials);
      } catch (error) {
        console.log(error);
      }
    }
    loadUser();
  }, [setCurrentAccountUser]);

  return (
    <Container fluid className="d-flex flex-grow-1 flex-row-reverse">
      <Row className="flex-fill flex-row">
        <Col>
          <div className="d-flex justify-content-end">
            <Button variant="button" onClick={logout} className="text-white">
              Sair
            </Button>
          </div>

          <Row className="px-3 pb-5">
            <img
              src={user.imageUrl ? user.imageUrl : logo}
              width="60"
              height="60"
              alt="avatar"
              className="rounded-circle"
            />
            <Col className="text-white">
              <h4>{user.firstName}</h4>
              <span>{user.email}</span>
            </Col>
          </Row>

          <Button
            onClick={onClickProfile}
            variant="link"
            className="text-white d-block "
          >
            Dados Pessoais
          </Button>
          <Button
            onClick={onClickTodoList}
            variant="link"
            className="text-white d-block "
          >
            TodoList
          </Button>
        </Col>
        <Col
          sm={6}
          xs={12}
          lg={9}
          md={8}
          className="bg-light  align-items-center pt-5 "
        >
          <Route
            path="/home"
            exact
            render={() =>
              getCurrentAccount() ? <TodoForm /> : <Redirect to="/" />
            }
          />
          <Route
            path="/home/profile"
            render={() =>
              getCurrentAccount() ? <ProfileForm /> : <Redirect to="/" />
            }
          />
        </Col>
      </Row>
    </Container>
  );
}
