import React, { useState, useEffect } from "react";

import { Form, Row, Col, Button } from "react-bootstrap";

import api from "../../services/api";

export default function LoginForm() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState([]);

  async function loadTodo() {
    const { data } = await api.get("todos");
    setTodos(data);
  }
  useEffect(() => {
    loadTodo();
  }, [setTodos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("todo", {
        title,
      });
      setTitle("");
      loadTodo();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`todo/${id}`);
      loadTodo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className=" ">
      <Col className="px-3 pb-5">
        <div className="  ">
          <h4>Todo list</h4>
        </div>
        <Col className="px-4 pt-4 pb-5">
          <Row className="text-dark">
            <span>Lista de Tarefas</span>
          </Row>
        </Col>
        <Col className="">
          {todos.map((todo) => (
            <div className="" key={todo.todoId}>
              <div className="row row-cols-4  pt-2">
                <div className="col">
                  <label className="text-dark">{todo.title}</label>
                </div>
                <div className="col">
                  <button
                    className=" text-black"
                    onClick={() => handleDelete(todo.todoId)}
                  >
                    remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Col>
        <Col className="col-12 pt-5 ">
          <Form onSubmit={handleSubmit}>
            <Row className="pt-5">
              <Col md={8}>
                <Form.Control
                  className=""
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  name="title"
                  value={title}
                  placeholder="Escreva aqui sua tarefa"
                />
              </Col>
              <Col md={3}>
                <Button className="col-12" type="submit">
                  Entrar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Col>
    </Row>
  );
}
