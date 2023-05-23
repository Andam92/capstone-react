import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./libreria.module.css";
import { Item } from "./Item";
import { recuperaLibreria } from "../../redux/actions/addLibrary";

export const Libreria = () => {
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const libreria = useSelector(
    (state) => state?.usersReducer?.users?.libreriaPersonale
  );

  const { id } = useParams();

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
