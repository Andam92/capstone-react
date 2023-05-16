import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./singleProduct.module.css";
import { Button, Container } from "react-bootstrap";

export const SingleProduct = () => {
  const { id } = useParams();
  const [prodotto, setProdotto] = useState();

  const recuperaProdotto = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/vg/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProdotto(data);
        console.log("Singolo prodotto salvato nello stato", prodotto);
      } else {
        console.log("Response NOT ok!");
      }
    } catch (error) {
      console.log("Sono catch", error);
    }
  };

  useEffect(() => {
    recuperaProdotto();
  }, []);

  return (
    <>
      <div className={`${styles.body}`}>
        <Container>
          <h1 className={`${styles.text}`}>{prodotto?.titolo}</h1>
          <div style={{ height: "500px" }}>
            <img
              src={`${prodotto?.immagine}`}
              className={`${styles.img}`}
              alt="img"
            />
          </div>
          <div className={`${styles.text}`}>
            <p>{prodotto?.categoria}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, illo. Voluptates, amet. Magnam, vel obcaecati ipsa
              nesciunt, facere id ipsum deleniti laborum error fuga eligendi sed
              natus distinctio facilis? Itaque!
            </p>
            <p>
              <Button variant="primary" size="lg" role="button">
                Acquista
              </Button>
            </p>
          </div>
        </Container>
      </div>
    </>
  );
};
