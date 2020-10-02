import React, { useState, useEffect, useContext } from "react";

import { Form, Button, Col } from "react-bootstrap";
import api from "../../services/api";
import { AuthContext } from "../../contexts/auth-context";
import logo from "../../assets/logo-rstcom-ok-.png";

export default function ProfileForm() {
  const { getCurrentAccountUser, setCurrentAccountUser } = useContext(
    AuthContext
  );
  const [imageUrl, setImageUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const user = getCurrentAccountUser;

    if (user) {
      setEmail(user.email);
      setImageUrl(user.imageUrl);
      setFirstName(user.firstName);
      setPassword("");
      setConfirmPassword("");
    }
  }, [getCurrentAccountUser]);

  const handlefileChange = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target.form);

    try {
      await api.post("user/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { data } = await api.get("user");

      setCurrentAccountUser(data.userCredentials);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;

    try {
      await api.put("user", {
        firstName,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col>
      <h4>Editar User </h4>
      <Form
        className="pb-3 d-flex col-12 flex-column align-items-center"
        onChange={handlefileChange}
      >
        <div className="py-3">
          <img
            alt="avatar"
            src={imageUrl ? imageUrl : logo}
            className="rounded-circle"
            width="120"
            height="120"
          />
          <input hidden id="imageUrl" type="file" alt="" name="imageUrl" />
        </div>
        <label className="btn btn-primary" htmlFor="imageUrl">
          Alterar Foto
        </label>
      </Form>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Nome"
        />
        <br />
        <Form.Control
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-mail"
        />
        <br />
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <br />
        <Form.Control
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirma Senha"
        />
        <br />
        <Button className="col-4" type="submit">
          Editar
        </Button>
      </Form>
    </Col>
  );
}
