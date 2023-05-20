import React from "react";
import { Col } from "react-bootstrap";

export const Item = ({ prodotto }) => {
  return (
    <div>
      <Col className="d-flex justify-content-between border">
        <h4>{prodotto.titolo}</h4>
        <p>{prodotto.prezzo}</p>
      </Col>
    </div>
  );
};
