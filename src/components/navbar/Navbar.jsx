import React, { useState } from "react";
import { Col, Container, Navbar, Nav, Row, NavLink } from "react-bootstrap";
import styles from "./navbar.module.css";
import LoginModal from "../login/LoginModal";
import { FaLanguage, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const MyNavbar = () => {
  // HOOKS
  const [modale, setModale] = useState(false);
  const token = useSelector((state) => state?.bearerToken?.accessToken);
  const username = useSelector((state) => state?.bearerToken?.username);

  return (
    <>
      <div
        className={`${styles.navContainer}`}
        style={{ position: "relative" }}
      >
        {modale && (
          <div
            className={`${styles.overlay}`}
            onClick={() => setModale(false)}
          ></div>
        )}
        <Navbar className={`${styles.mainNav} p-4`}>
          <Container>
            <Row className="d-flex w-100 ">
              <Col className="d-flex">
                <Nav.Link style={{ marginRight: "4rem" }} href="/home">
                  STORE
                </Nav.Link>

                <Nav.Link style={{ marginRight: "4rem" }} eventKey="link-1">
                  COMUNITA'
                </Nav.Link>

                <Nav.Link style={{ marginRight: "4rem" }} eventKey="link-2">
                  ASSISTENZA
                </Nav.Link>

                <Nav.Link style={{ marginRight: "4rem" }} eventKey="link-3">
                  SUPPORTO
                </Nav.Link>
              </Col>
              <Col className="d-flex" style={{ flexDirection: "row-reverse" }}>
                <Nav.Item>
                  <Nav.Link
                    style={{
                      marginRight: "4rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                    eventKey="link-3"
                  >
                    <FaLanguage style={{ marginRight: "10px" }} />
                    <span>LINGUA</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  {!token ? (
                    <Nav.Link
                      onClick={() => setModale(!modale)}
                      style={{
                        marginRight: "4rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                      eventKey="link-3"
                    >
                      <FaUser style={{ marginRight: "10px" }} />
                      <span>ACCEDI</span>
                    </Nav.Link>
                  ) : (
                    <NavLink style={{ marginRight: "1rem" }}>
                      Benvenuto {username}
                    </NavLink>
                  )}
                </Nav.Item>
              </Col>
            </Row>
          </Container>
        </Navbar>
        {modale && <LoginModal setModale={setModale} />}
      </div>
    </>
  );
};

export default MyNavbar;
