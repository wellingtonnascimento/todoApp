import React from "react";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

export default function LoginForm() {
  return (
    <Form className="col-12 ">
      <Form.Control type="text" placeholder="Nome" />
      <br />
      <Form.Control type="email" placeholder="E-mail" />
      <br />
      <Form.Control type="password" placeholder="Senha" />
      <br />
      <Form.Control type="password" placeholder="Confirma Senha" />
      <br />
      <Button className="col-4" type="submit">
        Editar
      </Button>
    </Form>
  );
}
