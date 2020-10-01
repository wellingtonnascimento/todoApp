import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { Container, Row, Col, Button } from "react-bootstrap";

import { AuthContext } from "../../contexts/auth-context";

import TodoForm from "../../components/TodoForm";
import ProfileForm from "../../components/ProfileForm";
import Logo from "../../assets/logo-rstcom-ok-.png";

export default function Home({ history }) {
  const { getCurrentAccount } = useContext(AuthContext);

  function onClickTodoList() {
    history.push("/home");
  }
  function onClickProfile() {
    history.push("/home/profile");
  }
  return (
    <Container fluid className="d-flex flex-grow-1 flex-row-reverse">
      <Row className="flex-fill flex-row">
        <Col>
          <div className="d-flex justify-content-end">
            <Button variant="link" className="text-white">
              Sair
            </Button>
          </div>
          <Row className="px-3 pb-5">
            <img src={Logo} width="60" height="60" alt="" />
            <Col className="text-white">
              <h4>Seu Name</h4>
              <span>admin@admin.com</span>
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
          className="bg-light justify-content-center align-items-center d-flex"
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
