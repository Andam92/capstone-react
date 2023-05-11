import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./register.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formUsernameValue, setFormUserValue] = useState("");
  const [formPswValue, setformPswValue] = useState("");
  const [formEmailValue, setformEmailValue] = useState("");
  const [formNameValue, setformNameValue] = useState("");
  const [stato, setStato] = useState([]);
  // const [storage, setStorage] = useState(null);
  const [token, setToken] = useState(null);
  const tokenList = useSelector((state) => state.bearerToken);
  const navigate = useNavigate();

  //useEffect(() => console.log(formEmailValue), [formEmailValue]);

  const user = {
    name: formNameValue,
    username: formUsernameValue,
    email: formEmailValue,
    password: formPswValue,
  };

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
      }
    } catch (error) {
      console.log(error);
    }
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
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                style={{ backgroundColor: "#2E2E34", color: "white" }}
                value={formNameValue}
                type="text"
                placeholder="Nome"
                onChange={(e) => {
                  setformNameValue(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                style={{ backgroundColor: "#2E2E34", color: "white" }}
                value={formEmailValue}
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setformEmailValue(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                style={{ backgroundColor: "#2E2E34", color: "white" }}
                value={formPswValue}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setformPswValue(e.target.value);
                }}
              />
            </Form.Group>
            <div className="w-100 d-flex flex-column justify-content-center">
              <Button
                className={`${styles.login_button}`}
                variant="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (formUsernameValue.length > 2 || formPswValue.length > 2) {
                    registerRequest();
                    setFormUserValue("");
                    setformPswValue("");
                    setformEmailValue("");
                    setformNameValue("");
                  } else {
                    console.log("troppo breveh!!!!");
                  }
                }}
              >
                Registrati
              </Button>
            </div>
          </Form>
        }
      </div>
    </>
  );
};

export default RegisterPage;
