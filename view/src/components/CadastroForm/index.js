import React from "react";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

export default function CadastroForm() {
  return (
    <Form className="col-10  ">
      <h5 className="text-center">Faça seu Login</h5>
      <br />
      <Form.Control type="name" placeholder="Nome" />
      <br />
      <Form.Control type="email" placeholder="E-mail" />
      <br />
      <Form.Control type="password" placeholder="Senha" />
      <br />
      <Form.Control type="password" placeholder="Confirmar Senha" />
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
