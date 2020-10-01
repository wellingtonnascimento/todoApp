import React from "react";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

export default function LoginForm() {
  return (
    <Form className="col-10 border-radius">
      <h5 className="text-center">Faça seu Login</h5>
      <Form.Control type="email" placeholder="Enter email" />
      <br />
      <Form.Control type="password" placeholder="Password" />
      <br />
      <Button className="col-12" type="submit">
        Entrar
      </Button>
      <Link
        to={"/cadastro"}
        className="btn btn-link d-block mx-auto text-dark"
      ></Link>
    </Form>
  );
}
