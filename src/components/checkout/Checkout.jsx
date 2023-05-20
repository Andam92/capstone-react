import React from "react";
import styles from "./checkout.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Item } from "./Item";

export const Checkout = () => {
  const cart = useSelector((state) => state?.cartReducer?.cart);

  return (
    <Container className={`${styles.body}`}>
      <Row className="text-center">
        <h1>Il tuo carrello</h1>
      </Row>
      <Row className="flex-column">
        <h2>Checkout</h2>
        {cart.length > 0 ? (
          cart.map((prodotto) => <Item prodotto={prodotto}></Item>)
        ) : (
          <p>Carrello vuoto!</p>
        )}
      </Row>
    </Container>
  );
};
