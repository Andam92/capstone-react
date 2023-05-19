import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import styles from "./item.module.css";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";

const Item = ({ prodotto, loading }) => {
  const dispatch = useDispatch();

  // const handleDelete = () => {
  //   dispatch({
  //     type: "DELETE_FROM_CART",
  //     payload: prodotto,
  //   });

  return (
    <div>
      <Row className={`${styles.row}`}>
        <Col>
          {!loading ? (
            <img
              style={{ width: "100%" }}
              src={prodotto?.immagine}
              alt="img"
            ></img>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Spinner className="align-self-center" />
            </div>
          )}
        </Col>

        <Col className="text-start flex-column d-flex">
          <p className="fs-5">{prodotto.titolo}</p>
          <span className="fs-6">€ {prodotto.prezzo}</span>
          <div className="d-flex align-items-center justify-content-between">
            <button className={`${styles.button_buy} rounded`} size="sm">
              Acquista
            </button>
            <AiFillDelete
              onClick={() =>
                dispatch({ type: "DELETE_FROM_CART", payload: prodotto })
              }
              className={`${styles.button_remove}`}
              size="sm"
            />
          </div>
        </Col>
        <hr className={`${styles.hr}`} />
      </Row>
    </div>
  );
};

export default Item;
