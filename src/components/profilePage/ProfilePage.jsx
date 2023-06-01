import React, { useState } from "react";
import styles from "./profile.module.css";
import { useSelector } from "react-redux";
import { Col, Container, Form, Row } from "react-bootstrap";

const ProfilePage = () => {
  const user = useSelector((state) => state?.usersReducer?.users);
  const [showModale, setShowModale] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  // PUT

  const editUser = () => {
    return async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/auth/checkout/edit/${user?.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: editedName,
              username: editedUsername,
              email: editedEmail,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Utente modificato", data);
        } else {
          console.log("Response not ok");
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  // SUBMIT

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser();
    console.log("submit fatto per l'utente con id: ", user?.id);
  };

  return (
    <div className={`${styles.body}`}>
      <Container>
        <Row className="justify-content-center flex-column">
          <h2 className="text-center mb-3">Pagina Profilo</h2>
          <Col>
            <h5 className="mb-5">Dati personali</h5>
          </Col>
          <Col>
            <p>NOME: {user?.name}</p>
          </Col>
          <Col>
            <p>USERNAME: {user?.username}</p>
          </Col>
          <Col>
            <p>E-MAIL: {user?.email}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              onClick={() => setShowModale(!showModale)}
              className={`${styles.button}`}
            >
              Modifica
            </button>
          </Col>
        </Row>
        {showModale && (
          <Row className="mt-5">
            <Col xs={12} md={6}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    onChange={(e) => setEditedName(e.target.value)}
                    type="name"
                    placeholder={user?.name}
                  />
                  <Form.Text className="text-muted">
                    Modifica il tuo nome
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={(e) => setEditedUsername(e.target.value)}
                    type="username"
                    placeholder={user?.username}
                  />
                  <Form.Text className="text-muted">
                    Modifica il tuo username
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={(e) => setEditedEmail(e.target.value)}
                    type="email"
                    placeholder={user?.email}
                  />
                  <Form.Text className="text-muted">
                    Modifica la tua e-mail
                  </Form.Text>
                </Form.Group>
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                    console.log(editedName, editedUsername, editedEmail);
                  }}
                  className={`${styles.button}`}
                >
                  Invia
                </button>
              </Form>
            </Col>{" "}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ProfilePage;
