import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Videogioco } from "../videogioco/Videogioco";

export const Store = () => {
  // HOOKS
  const [prodotti, setProdotti] = useState([]);
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );

  // FETCH
  const recuperaProdotti = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/vg");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProdotti(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // EFFECT
  useEffect(() => {
    if (prodotti.length === 0) {
      recuperaProdotti();
    }
  }, []);

  return (
    <div className="p-4">
      <h1>Giochi in evidenza</h1>
      {/* <ol>
        {prodotti.map((p, i) => (
          <li style={{ color: "white" }} key={i}>
            {p.titolo}{" "}
          </li>
        ))}
      </ol> */}
      <Container>
        <Row>
          {prodotti.map((p, i) => (
            <Col>
              <Videogioco titolo={p.titolo}></Videogioco>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
