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
      <Row>
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

        <Col className="text-center flex-column d-flex">
          <p className="fs-5">{prodotto.titolo}</p>
          <span className="fs-6">€ {prodotto.prezzo}</span>
          <button className={`${styles.button_buy}`} size="sm">
            Acquista
          </button>
          <AiFillDelete
            onClick={() =>
              dispatch({ type: "DELETE_FROM_CART", payload: prodotto })
            }
            className={`${styles.button_remove}`}
            size="sm"
          />
        </Col>
        <hr className={`${styles.hr}`} />
      </Row>
    </div>
  );
};

export default Item;
