import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authRequest } from "../../redux/actions/actions";
import styles from "./register.module.css";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

const RegisterPage = (props) => {
  const [formUsernameValue, setFormUserValue] = useState("");
  const [formPswValue, setformPswValue] = useState("");
  const [formEmailValue, setformEmailValue] = useState("");
  const [formNameValue, setformNameValue] = useState("");
  const [stato, setStato] = useState([]);
  // const [storage, setStorage] = useState(null);
  const [token, setToken] = useState(null);
  const tokenList = useSelector((state) => state.bearerToken);
  const dispatch = useDispatch();
  //useEffect(() => console.log(formEmailValue), [formEmailValue]);

  useEffect(() => {
    console.log("stato", stato);
    console.log("tokenList", tokenList);
  }, [stato, tokenList]);

  return (
    <div
      className={`${styles.login} d-flex justify-content-center align-items-center flex-column`}
    >
      {
        <>
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
                    console.log(formUsernameValue);
                    dispatch(
                      authRequest(
                        formUsernameValue,
                        formPswValue,
                        setStato,
                        setToken
                      )
                    );
                    console.log("tokenList", tokenList);
                    setFormUserValue("");
                    setformPswValue("");
                    props.setModale(false);
                  } else {
                    console.log("troppo breveh!!!!");
                  }
                }}
              >
                Registrati
              </Button>
            </div>
          </Form>
        </>
      }
    </div>
  );
};

export default RegisterPage;
