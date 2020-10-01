import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

import { AuthContext } from "../../contexts/auth-context";

export default function CadastroForm() {
  const { signup } = useContext(AuthContext);

  const [state, setState] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleFirstNameChange(event) {
    event.persist();
    setState((prevState) => ({ ...prevState, firstName: event.target.value }));
  }

  function handleEmailChange(event) {
    event.persist();
    setState((prevState) => ({ ...prevState, email: event.target.value }));
  }
  function handlePasswordChange(event) {
    event.persist();
    setState((prevState) => ({ ...prevState, password: event.target.value }));
  }

  function handleConfirmPasswordChange(event) {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      confirmPassword: event.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await signup(state);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form className="col-10 " onSubmit={onSubmit}>
      <h5 className="text-center">Faça seu Login</h5>
      <br />
      <Form.Control
        value={state.firstName}
        onChange={handleFirstNameChange}
        placeholder="Nome"
      />
      <br />
      <Form.Control
        onChange={handleEmailChange}
        type="email"
        placeholder="E-mail"
      />
      <br />
      <Form.Control
        onChange={handlePasswordChange}
        type="password"
        placeholder="Senha"
      />
      <br />
      <Form.Control
        onChange={handleConfirmPasswordChange}
        type="password"
        placeholder="Confirmar Senha"
      />
      <br />
      <Button className="col-12" type="submit">
        Cadastrarr
      </Button>
      <Link to={"/"} className="btn btn-link d-block mx-auto text-dark">
        <u>Eu já possuo Cadastro</u>
      </Link>
    </Form>
  );
}
