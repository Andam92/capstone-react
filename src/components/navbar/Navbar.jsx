import React, { useState } from "react";
import { Col, Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import styles from "./navbar.module.css";
import LoginPage from "../login/LoginPage";

const MyNavbar = () => {
  const [modale, setModale] = useState(false);

  return (
    <>
      <div style={{ position: "relative" }}>
        <Navbar className={`${styles.mainNav} p-4`}>
          <Container>
            <Row className="d-flex flex-row justify-content-between w-100 ">
              <Col className="d-flex">
                <Nav.Link style={{ marginRight: "2rem" }} href="/home">
                  STORE
                </Nav.Link>

                <Nav.Link style={{ marginRight: "2rem" }} eventKey="link-1">
                  COMUNITA'
                </Nav.Link>

                <Nav.Link style={{ marginRight: "2rem" }} eventKey="link-2">
                  ASSISTENZA
                </Nav.Link>

                <Nav.Link style={{ marginRight: "2rem" }} eventKey="link-3">
                  SUPPORTO
                </Nav.Link>
              </Col>
              <Col className="d-flex" style={{ flexDirection: "row-reverse" }}>
                <Nav.Item>
                  <Nav.Link style={{ marginRight: "2rem" }} eventKey="link-3">
                    LINGUA
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setModale(!modale)}
                    style={{ marginRight: "2rem" }}
                    eventKey="link-3"
                  >
                    ACCEDI
                  </Nav.Link>
                </Nav.Item>
              </Col>
            </Row>
          </Container>
        </Navbar>
        {modale && <LoginPage />}
      </div>
    </>
  );
};

export default MyNavbar;
