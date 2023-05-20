import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { authRequest } from "../../redux/actions/authRequest";
import styles from "./register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  // HOOKS
  const [formUsernameValue, setFormUserValue] = useState("");
  const [formPswValue, setformPswValue] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state?.authReducer?.bearerToken);
  const failedLogin = useSelector((state) => state?.failedLogin?.failedLogin);
  // const [loginFailed, setLoginFailed] = useState(false);

  // CONTROLLO SUI CAMPI DEL FORM AL SUBMIT & DEL LOGIN FALLITO
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(authRequest(formUsernameValue, formPswValue))
        .then(() => {
          console.log("dopo il dispatch");
          setTimeout(() => {
            window.location.reload();
          }, 1);
        })
        .catch(() => {
          console.log("dopo il dispatch ma CATCH");
        });
    }
    setValidated(true);
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => navigate("/"), 1000);
    }
  }, [token]);

  useEffect(() => {
    console.log(failedLogin);
  }, [failedLogin]);

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
            isInvalid={
              (validated && !formUsernameValue) ||
              (failedLogin && !formUsernameValue)
            }
          />

          {!failedLogin ? (
            <Form.Control.Feedback type="invalid">
              Inserisci il tuo username
            </Form.Control.Feedback>
          ) : (
            <Form.Control.Feedback type="invalid">
              Nessun utente trovato!
            </Form.Control.Feedback>
          )}
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
            isInvalid={
              (validated && !formUsernameValue) ||
              (failedLogin && !formUsernameValue)
            }
          />
          {!failedLogin ? (
            <Form.Control.Feedback type="invalid">
              Inserisci la tua password
            </Form.Control.Feedback>
          ) : (
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          )}
        </Form.Group>
        <div className="w-100 d-flex flex-column justify-content-center">
          {!failedLogin && (
            <Button
              className={`${styles.login_button}`}
              variant="primary"
              type="submit"
            >
              Accedi ora
            </Button>
          )}
          {!token && !failedLogin && (
            <div style={{ color: "white", marginTop: "2rem" }}>
              Non hai ancora un account?{" "}
              <span>
                <Link to={"/register"}>Registrati ora!</Link>
              </span>
            </div>
          )}
          {/* {failedLogin && (
            <div style={{ color: "white", marginTop: "2rem" }}>
              Utente non trovato!{" "}
              <span>
                <Link to={"/register"}>Vuoi effettuare la registrazione?</Link>
              </span>
            </div>
          )} */}
          {failedLogin && (
            <Alert className="mt-2" key="danger" variant="danger">
              Forse volevi
              <span className="ms-1">
                <Link to={"/register"}>effettuare la registrazione?</Link>
              </span>
            </Alert>
          )}
        </div>
      </Form>
    </div>
  );
};
