import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authRequest } from "../../redux/actions/actions";
import styles from "./login.module.css";

const LoginPage = () => {
  const [formUsernameValue, setFormUserValue] = useState("");
  const [formPswValue, setformPswValue] = useState("");
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
      {!token && (
        <>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                style={{ backgroundColor: "#171920", width: "500px" }}
                value={formUsernameValue}
                type="username"
                placeholder="Username"
                onChange={(e) => {
                  // console.log(formEmailValue);
                  setFormUserValue(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                style={{ backgroundColor: "#2E2E34" }}
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
                className="w-100"
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
                  } else {
                    console.log("troppo breveh!!!!");
                  }
                }}
              >
                Connettiti
              </Button>
              <div className="d-flex" style={{ textAlign: "center" }}>
                <span className="d-flex">O CONNETTITI CON</span>
              </div>
            </div>

            {/* <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                console.log(stato);
              }}
            >
              Stato
            </Button> */}
          </Form>
        </>
      )}
      {token && (
        <p className="fs-4 text-center">{`Bearer ${localStorage.getItem(
          "token"
        )}`}</p>
      )}
    </div>
  );
};

export default LoginPage;
