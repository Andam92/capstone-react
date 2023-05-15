import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import styles from "./videogioco.module.css";
import { FaShoppingCart } from "react-icons/fa";

export const Videogioco = (props) => {
  const [hover, setHover] = useState(false);

  return (
    <Col xs={12} sm={6} lg={4} xl={3} className="mt-3 border border-0">
      <Card className={`${styles.body}`}>
        <div style={{ maxHeight: "60%" }}>
          <Card.Img variant="top" src={props.immagine} />
        </div>
        <Card.Body className={`${styles.text}`}>
          <div className="d-flex flex-column justify-content-evenly">
            <Card.Title className={`${styles.title}`}>
              {props.titolo}
            </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={`${styles.button}`}
            >
              <FaShoppingCart
                className={`${!hover && styles.cart} ${
                  hover && styles.cartHover
                }`}
                style={{ marginBottom: "4px", marginRight: "10px" }}
              />
              Acquista
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
