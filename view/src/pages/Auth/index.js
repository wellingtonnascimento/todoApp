import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/auth-context";

import LoginForm from "../../components/LoginForm";
import CadastroForm from "../../components/CadastroForm";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../../assets/logo-rstcom-ok-.png";
import "./styled.scss";

export default function Auth() {
  const { getCurrentAccount } = useContext(AuthContext);
  return (
    <Container fluid className="d-flex flex-grow-1 flex-row-reverse">
      <Row className="flex-fill flex-row">
        <Col className=" d-none d-md-flex align-items-center  ">
          <img className="logo" src={Logo} alt="" width="200" height="200" />
        </Col>

        <Col
          xs={12}
          lg={4}
          md={6}
          className="bg-light justify-content-center align-items-center col-lg-4 col-md-6 col-12 d-flex"
        >
          <Route
            path="/"
            exact
            render={() =>
              !getCurrentAccount() ? <LoginForm /> : <Redirect to="/home" />
            }
          />
          <Route
            path="/cadastro"
            render={() =>
              !getCurrentAccount() ? <CadastroForm /> : <Redirect to="/home" />
            }
          />
        </Col>
      </Row>
    </Container>
  );
}
