import React from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import styles from "../components/carrello_item/item.module.css";
import { useDispatch } from "react-redux";

export const Prova = ({ prodotto }) => {
  const dispatch = useDispatch();

  //   const handleDelete = () => {
  //     dispatch({
  //       type: "DELETE_FROM_CART",
  //       payload: prodotto,
  //     });

  return (
    <div>
      <Row>
        <Col>
          <p>ciao</p>

          {
            <img
              style={{ width: "100%" }}
              src={prodotto?.immagine}
              alt="img"
            ></img>
          }
        </Col>

        <Col className="text-center flex-column d-flex">
          <p className="fs-5">{prodotto.titolo}</p>
          <span className="fs-6">€ {prodotto.prezzo}</span>
          <button size="sm">Acquista</button>
          <AiFillDelete
            onClick={() =>
              dispatch({ type: "DELETE_FROM_CART", payload: prodotto })
            }
            className={`${styles.button_remove}`}
            size="sm"
          />
        </Col>
        <hr className={`${styles.hr}`} />
        <p onClick={() => console.log(prodotto)}>PROVA ITEM</p>
      </Row>
    </div>
  );
};
