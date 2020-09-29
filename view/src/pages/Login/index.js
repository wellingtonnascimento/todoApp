import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./styled.scss";

export default function Login() {
  return (
    <Container fluid className="d-flex flex-grow-1 flex-row-reverse">
      <Row className="flex-fill flex-row-reverse">
        <Col
          xs={12}
          lg={4}
          md={6}
          className="bg-light justify-content-center align-items-center col-lg-4 col-md-6 col-12 d-flex"
        >
          <Form className="col-8">
            <h4 className="align-center">Faça seu Login</h4>
            <Form.Control type="email" placeholder="Enter email" />

            <Form.Control type="password" placeholder="Password" />

            <Button className="col-12" type="submit">
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
