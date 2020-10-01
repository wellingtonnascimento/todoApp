import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

import { AuthContext } from "../../contexts/auth-context";

export default function LoginForm() {
  const { login } = useContext(AuthContext);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function handleEmailChange(event) {
    event.persist();
    setState((prevState) => ({ ...prevState, email: event.target.value }));
  }
  function handlePasswordChange(event) {
    event.persist();
    setState((prevState) => ({ ...prevState, password: event.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await login(state);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form className="col-10 border-radius" onSubmit={onSubmit}>
      <h5 className="text-center">Faça seu Login</h5>
      <Form.Control
        onChange={handleEmailChange}
        type="email"
        placeholder="Enter email"
      />
      <br />
      <Form.Control
        onChange={handlePasswordChange}
        type="password"
        placeholder="Password"
      />
      <br />
      <Button className="col-12" type="submit">
        Entrar
      </Button>
      <Link to={"/cadastro"} className="btn btn-link d-block mx-auto text-dark">
        <u> Não possuo cadastro </u>
      </Link>
    </Form>
  );
}
