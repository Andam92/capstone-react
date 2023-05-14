import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Videogioco } from "../videogioco/Videogioco";
import img from "../../../src/assets/covers/God_of_war.jpg";

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
          {prodotti?.map((p, i) => (
            <Col key={i}>
              <Videogioco titolo={p.titolo} immagine={p?.immagine}></Videogioco>
            </Col>
          ))}
          {/* {prodotti.map((p) => console.log(p.immagine))} */}
        </Row>
      </Container>
    </div>
  );
};
