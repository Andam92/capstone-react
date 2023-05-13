import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { authRequest } from "../../redux/actions/actions";
import styles from "./register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  // HOOKS
  const [formUsernameValue, setFormUserValue] = useState("");
  const [formPswValue, setformPswValue] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state?.authReducer?.bearerToken);

  // CONTROLLO SUI CAMPI DEL FORM AL SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(authRequest(formUsernameValue, formPswValue));
    }
    setValidated(true);
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => navigate("/"), 1000);
    }
  }, [token]);

  return (
    <div className={`${styles.loginContainer}`}>
      <h2 style={{ color: "white" }}>Accedi</h2>
      <Form
        className={`${styles.formContainer}`}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="username">
          <Form.Control
            required
            style={{
              backgroundColor: "#2E2E34",
              color: "white",
            }}
            value={formUsernameValue}
            type="username"
            placeholder="Username"
            onChange={(e) => {
              setFormUserValue(e.target.value);
            }}
            isInvalid={validated && !formUsernameValue}
          />
          <Form.Control.Feedback type="invalid">
            Inserisci il tuo username
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
          {
            <Button
              className={`${styles.login_button}`}
              variant="primary"
              type="submit"
            >
              Accedi ora
            </Button>
          }
        </div>
      </Form>
    </div>
  );
};
