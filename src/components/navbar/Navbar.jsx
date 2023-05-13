import React, { useState } from "react";
import { Col, Container, Navbar, Nav, Row, Dropdown } from "react-bootstrap";
import styles from "./navbar.module.css";
import LoginModal from "../login/LoginModal";
import { FaLanguage, FaUser } from "react-icons/fa";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/logout";

const MyNavbar = () => {
  // HOOKS
  const [modale, setModale] = useState(false);
  const [out, setOut] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const username = useSelector(
    (state) => state?.authReducer?.bearerToken?.username
  );

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
                  {/* <Nav.Link
                    style={{
                      marginRight: "4rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                    eventKey="link-3"
                  >
                    <FaLanguage style={{ marginRight: "10px" }} />
                    <span>LINGUA</span>
                  </Nav.Link> */}
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
                    // <NavLink style={{ marginRight: "1rem" }}>
                    //   <AiFillCaretUp
                    //     className={`${styles.down}`}
                    //   />{" "}
                    //   Benvenuto {username} !
                    // </NavLink>
                    <Dropdown className={`${styles.down}`}>
                      <Dropdown.Toggle
                        id="dropdown-button-dark-example1"
                        variant="none"
                        className="text-light"
                      >
                        Benvenuto {username}
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item href="#/action-1" active>
                          Profilo
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Carrello
                        </Dropdown.Item>

                        <Dropdown.Divider />
                        <Dropdown.Item
                          href="#/action-4"
                          onMouseOver={() => setOut(true)}
                          onMouseLeave={() => setOut(false)}
                          onClick={() => dispatch(logout())}
                        >
                          <AiOutlineDoubleLeft
                            className={`${styles.out} ${
                              out && styles.outHover
                            }`}
                          />
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
