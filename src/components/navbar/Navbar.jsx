import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import styles from "./navbar.module.css";
import LoginModal from "../login/LoginModal";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/logout";
import { useNavigate } from "react-router-dom";
import Wish from "../offcanvas_wish/Wish";
import getUsers from "../../redux/actions/getUsers";

const MyNavbar = () => {
  // HOOKS
  const [modale, setModale] = useState(false);
  const [showCarrello, setShowCarrello] = useState(false);
  const [cartCounter, setCartCounter] = useState(false);
  const handleShow = () => setShowCarrello(true);
  const handleClose = () => setShowCarrello(false);
  const [out, setOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const username = useSelector(
    (state) => state?.authReducer?.bearerToken?.username
  );
  const users = useSelector((state) => state?.usersReducer?.users);
  const cart = useSelector((state) => state?.cartReducer?.cart);

  const handleLogout = () => {
    dispatch(logout());
    dispatch({
      type: "CLEAN_CART",
    });
    navigate("/");
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(getUsers(username, token)).then(console.log(users));
    }, 100);
  }, [token]);

  useEffect(() => {
    setCartCounter(true);
    setTimeout(() => {
      setCartCounter(false);
    }, 1000);
  }, [cart?.length]);

  return (
    <>
      <div
        className={`${styles.navContainer}`}
        style={{ position: "relative" }}
      >
        {showCarrello && (
          <Wish
            show={showCarrello}
            setShow={setShowCarrello}
            onHide={handleClose}
          />
        )}
        {modale && (
          <div
            className={`${styles.overlay}`}
            onClick={() => setModale(false)}
          ></div>
        )}
        <Navbar
          fixed="top"
          variant="dark"
          expand="lg"
          className={`${styles.mainNav} p-4`}
        >
          <Container>
            <Navbar.Brand
              className={`${styles.navLink} ${styles.brand}`}
              onClick={() => navigate("/")}
            >
              Logo_here
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-between w-100">
                <div className="d-flex flex-column flex-lg-row mt-4 mt-lg-0">
                  <Nav.Link
                    className={`${styles.navLink}`}
                    onClick={() => navigate("/store")}
                  >
                    STORE
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => handleShow()}
                    className={`${styles.navLink}`}
                  >
                    WISHLIST
                  </Nav.Link>
                  {token && (
                    <Nav.Link
                      onClick={() => navigate(`/library/${users.id}`)}
                      className={`${styles.navLink}`}
                    >
                      LIBRERIA
                    </Nav.Link>
                  )}
                </div>
                <div className="d-flex">
                  {token && (
                    <Nav.Item>
                      <Nav.Link>
                        <div className={`${styles.cartContainer}`}>
                          <FaShoppingCart
                            className={`${styles.cart}`}
                            onClick={() => navigate(`/checkout/${users.id}`)}
                          />
                          <span
                            className={`${styles.cartCounter} ${
                              cartCounter && styles.cartUpdated
                            }`}
                          >
                            {cart?.length}
                          </span>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  )}
                  <Nav.Item>
                    {!token ? (
                      <Nav.Link
                        onClick={() => setModale(true)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        eventKey="link-3"
                      >
                        <FaUser
                          style={{ marginRight: "10px", color: "whitesmoke" }}
                        />
                        <span className={`${styles.navLink} `}>ACCEDI</span>
                      </Nav.Link>
                    ) : (
                      <Dropdown className={`${styles.down}`}>
                        <Dropdown.Toggle
                          id="dropdown-button-dark-example1"
                          variant="none"
                          className="text-light"
                        >
                          Benvenuto {username}
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                          <Dropdown.Item href="#/action-1">
                            Profilo
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#/action-2"
                            onClick={() => handleShow()}
                          >
                            Wishlist
                          </Dropdown.Item>

                          <Dropdown.Divider />
                          <Dropdown.Item
                            href="#/action-4"
                            onMouseOver={() => setOut(true)}
                            onMouseLeave={() => setOut(false)}
                            onClick={handleLogout}
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
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {modale && <LoginModal setModale={setModale} />}
      </div>
    </>
  );
};

export default MyNavbar;
