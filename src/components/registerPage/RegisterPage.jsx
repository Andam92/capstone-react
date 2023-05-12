import React, { useEffect, useState } from "react";
import { Alert, Button, Form, FormLabel } from "react-bootstrap";
import styles from "./register.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // HOOKS
  const [formUsernameValue, setFormUserValue] = useState("");
  const [formPswValue, setformPswValue] = useState("");
  const [formEmailValue, setformEmailValue] = useState("");
  const [formNameValue, setformNameValue] = useState("");
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const tokenList = useSelector((state) => state.bearerToken);
  const navigate = useNavigate();

  //useEffect(() => console.log(formEmailValue), [formEmailValue]);

  // OGGETTO UTENTE DA PASSARE COME BODY DELLA REQUEST
  const user = {
    name: formNameValue,
    username: formUsernameValue,
    email: formEmailValue,
    password: formPswValue,
  };

  // HTTP REQUEST PER REGISTRARE UN UTENTE
  const registerRequest = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        console.log("Utente registrato");
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CONTROLLO SUI CAMPI DEL FORM AL SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      registerRequest();
    }
    setValidated(true);
  };

  return (
    <>
      {tokenList && navigate("/")}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          color: "white",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <h2>Registrati ora</h2>
      </div>
      <div
        className={`${styles.login} d-flex justify-content-center align-items-center flex-column`}
      >
        {
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                required
                style={{ backgroundColor: "#2E2E34", color: "white" }}
                value={formNameValue}
                type="text"
                placeholder="Nome"
                onChange={(e) => {
                  setformNameValue(e.target.value);
                }}
                isInvalid={validated && !formNameValue}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il tuo nome
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Control
                required
                style={{
                  backgroundColor: "#2E2E34",
                  width: "500px",
                  color: "white",
                }}
                value={formUsernameValue}
                type="username"
                placeholder="Username"
                onChange={(e) => {
                  // console.log(formEmailValue);
                  setFormUserValue(e.target.value);
                }}
                isInvalid={validated && !formUsernameValue}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il tuo username
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                required
                style={{ backgroundColor: "#2E2E34", color: "white" }}
                value={formEmailValue}
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setformEmailValue(e.target.value);
                }}
                isInvalid={validated && !formEmailValue}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un'email valida
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                required
                style={{ backgroundColor: "#2E2E34", color: "white" }}
                value={formPswValue}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setformPswValue(e.target.value);
                }}
                isInvalid={validated && !formPswValue}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci una password
              </Form.Control.Feedback>
            </Form.Group>
            <div className="w-100 d-flex flex-column justify-content-center">
              <Button
                className={`${styles.login_button}`}
                variant="primary"
                type="submit"
              >
                Registrati
              </Button>
              {success && (
                <p style={{ color: "green", marginTop: "1rem" }}>
                  Registrazione avvenuta con successo!
                </p>
              )}
            </div>
          </Form>
        }
      </div>
    </>
  );
};

export default RegisterPage;
