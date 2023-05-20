import React from "react";
import styles from "./checkout.module.css";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "./Item";
import { AiFillDelete } from "react-icons/ai";

export const Checkout = () => {
  const cart = useSelector((state) => state?.cartReducer?.cart);
  const dispatch = useDispatch();

  return (
    <Container className={`${styles.body}`}>
      <Row className="text-center">
        <h1>Il tuo carrello</h1>
      </Row>
      <Row className="flex-column">
        <h2>Checkout</h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className="text-center">Titolo</th>
              <th className="text-center">Prezzo</th>
              <th className="text-center">Rimuovi</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((prodotto) => <Item prodotto={prodotto} />)
            ) : (
              <p>Non hai ancora nulla nel carrello</p>
            )}
          </tbody>
        </Table>
        <Col className="d-flex justify-content-between align-items-center">
          <button className={`${styles.button}`}>Completa l'acquisto</button>
          <p className={`${styles.total}`}>
            Totale:{" "}
            {cart.length > 0 &&
              cart.reduce(
                (acc, element) => acc + parseInt(element.prezzo),
                0
              )}{" "}
            €
          </p>
        </Col>
        <Col>
          <AiFillDelete
            onClick={() => dispatch({ type: "CLEAN_CART", payload: null })}
            className={`${styles.button_remove}`}
          />
        </Col>
        {/* {cart.length > 0 ? (
          cart.map((prodotto) => <Item prodotto={prodotto}></Item>)
        ) : (
          <p>Carrello vuoto!</p>
        )} */}
      </Row>
    </Container>
  );
};
