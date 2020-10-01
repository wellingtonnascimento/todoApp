import React, { useState, useEffect } from "react";

import { Form, Row, Col, Button } from "react-bootstrap";

import api from "../../services/api";

export default function LoginForm() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function loadTodo() {
      const { data } = await api.get("todos");
      setTodos(data);
    }
    loadTodo();
  }, [setTodos]);

  return (
    <Row className="flex-fill flex-row mr-3">
      <Col className="px-3 pb-5 ">
        <div className="d-flex">
          <span className="text-dark">/Todo list</span>
        </div>
        <Col className="px-4 pb-5">
          <Row className="text-dark">
            <span>Lista de Tarefas</span>
          </Row>
        </Col>
        <Col className="">
          {todos.map((todo) => (
            <Row keys={todo.todoId}>
              <a className="text-dark  ">{todo.title}</a>
            </Row>
          ))}
        </Col>
        <Col>
          <Row>
            <Form.Control
              className="col-10 "
              type="text"
              placeholder="Escreva aqui sua tarefa"
            />
            <Button className="col-2" type="submit">
              Entrar
            </Button>
          </Row>
        </Col>
      </Col>
    </Row>
  );
}
