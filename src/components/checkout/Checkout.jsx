import React, { useEffect, useState } from "react";
import styles from "./checkout.module.css";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "./Item";
import { AiFillDelete } from "react-icons/ai";
import { cleanCart } from "../../redux/actions/cleanCart";
import { Link, useParams } from "react-router-dom";
import getUsers from "../../redux/actions/getUsers";
import { recuperaLibreria } from "../../redux/actions/addLibrary";
import PayPal from "../paypal/PayPal";

export const Checkout = () => {
  const [bought, setBought] = useState(false);
  const cart = useSelector((state) => state?.cartReducer?.cart);
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const username = useSelector((state) => state?.usersReducer?.users?.username);
  const dispatch = useDispatch();
  const { id } = useParams();

  const addToLibrary = async () => {
    console.log("TOKEN", token);
    console.log("ID: ", id);
    try {
      const data = cart;
      const response = await fetch(
        `http://localhost:8080/checkout/addAll/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log(response);
        const responseData = await response.json();
        console.log(responseData);
        console.log("CART", cart);
        dispatch({
          type: "CLEAN_CART",
        });
      } else {
        throw new Error("Response not ok");
      }
    } catch (error) {
      console.log("CATCH: ", error);
    }
  };

  useEffect(() => {
    dispatch(recuperaLibreria(id, token));
  }, [cart]);

  return (
    <Container className={`${styles.body}`}>
      <Row className="text-center">
        <h1 className="mb-3">Il tuo carrello</h1>
      </Row>
      <Row className="flex-column">
        <h2 className="mb-3">Checkout</h2>
        {cart && cart.length > 0 && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th className="text-center">Titolo</th>
                <th className="text-center">Prezzo</th>
                <th className="text-center">Rimuovi</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.length > 0 &&
                cart.map((prodotto) => <Item prodotto={prodotto} />)}
            </tbody>
          </Table>
        )}
        {!cart.length && !bought && (
          <div>
            <p>Non hai ancora nulla nel carrello!</p>
            <span style={{ fontSize: "larger" }}>
              <Link to={"/store"}>Visita lo Store</Link>
            </span>
          </div>
        )}
        {bought && (
          <p className={`${styles.bought}`}>
            Fatto! <span>Troverai i tuoi acquisti in libreria 👌</span>
          </p>
        )}
        <Col className="d-flex justify-content-between align-items-center">
          {cart.length > 0 && (
            <button
              onClick={() => {
                addToLibrary();
                setBought(true);
              }}
              className={`${styles.button}`}
            >
              Completa l'acquisto
            </button>
          )}
          {cart.length > 0 && (
            <p className={`${styles.total}`}>
              Totale:{" "}
              {cart &&
                cart.length > 0 &&
                cart.reduce(
                  (acc, element) => acc + parseInt(element.prezzo),
                  0
                )}{" "}
              €
            </p>
          )}
        </Col>
        <Col>
          {cart.length > 0 && (
            <AiFillDelete
              onClick={() => dispatch(cleanCart())}
              className={`${styles.button_remove}`}
            />
          )}
        </Col>
        {/* <Col>
          <PayPal />
        </Col> */}
        {/* {cart.length > 0 ? (
          cart.map((prodotto) => <Item prodotto={prodotto}></Item>)
        ) : (
          <p>Carrello vuoto!</p>
        )} */}
      </Row>
    </Container>
  );
};
