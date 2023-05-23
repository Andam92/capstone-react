import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./libreria.module.css";
import { Item } from "./Item";

export const Libreria = () => {
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const libreria = useSelector(
    (state) => state?.usersReducer?.users?.libreriaPersonale
  );
  const { id } = useParams();
  const [library, setLibrary] = useState([]);

  // RECUPERO LIBRERIA UTENTE
  const recuperaLibreria = async (id, token) => {
    console.log(token);
    try {
      const response = await fetch(`http://localhost:8080/library/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token !== undefined) {
      recuperaLibreria(id, token);
    }
  }, []);

  return (
    <Container className={`${styles.body}`} style={{ marginTop: "110px" }}>
      <Row>
        {libreria?.map((l, i) => (
          <Item key={i} videogioco={l} />
        ))}
      </Row>
    </Container>
  );
};
