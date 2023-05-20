import React from "react";
import styles from "./checkout.module.css";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "./Item";
import { AiFillDelete } from "react-icons/ai";
import { cleanCart } from "../../redux/actions/cleanCart";
import { Link } from "react-router-dom";

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
            {cart && cart.length > 0 ? (
              cart.map((prodotto) => <Item prodotto={prodotto} />)
            ) : (
              <div>
                <p>Non hai ancora nulla nel carrello </p>
                <Link to={"/store"}>Visita lo Store</Link>
              </div>
            )}
          </tbody>
        </Table>
        <Col className="d-flex justify-content-between align-items-center">
          {cart && (
            <button className={`${styles.button}`}>Completa l'acquisto</button>
          )}
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
        </Col>
        <Col>
          {cart && (
            <AiFillDelete
              onClick={() => dispatch(cleanCart())}
              className={`${styles.button_remove}`}
            />
          )}
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
