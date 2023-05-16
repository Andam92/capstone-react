import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./singleProduct.module.css";
import { Button, Container, Image, Row } from "react-bootstrap";
import { Chip } from "@mui/material";

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

  const handleClick = () => {
    console.log("Chip categoria cliccata!");
  };

  return (
    <>
      <div
        style={{
          zIndex: "10",
          opacity: 0.1,
          width: "100vw",
          height: "100vh",
          position: "relative",
          backgroundImage: `url(${prodotto?.immagine})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <img
          src={`${prodotto?.immagine}`}
          alt="bg"
          style={{
            position: "absolute",
            height: "100vh",
            right: "0",
          }}
        ></img> */}
      </div>
      <Container className={`${styles.body}`}>
        <Row>
          <h1 className={`${styles.text} mt-3`}>{prodotto?.titolo}</h1>
          <Image
            fluid={true}
            src={`${prodotto?.immagine}`}
            className={`${styles.img}`}
          ></Image>

          <div className={`${styles.text}`}>
            <Chip
              label={prodotto?.categoria}
              variant="outlined"
              onClick={handleClick}
              style={{ marginTop: "1rem", marginBottom: "2rem" }}
            />
            <p>
              <span style={{ fontSize: "0.7rem" }} className="text-secondary">
                EDITORE:
              </span>{" "}
              {prodotto?.editore}
            </p>
            <p>
              <span style={{ fontSize: "0.7rem" }} className="text-secondary">
                SVILUPPATORE:
              </span>{" "}
              {prodotto?.casaProduzione}
            </p>
            <p>
              <span style={{ fontSize: "0.7rem" }} className="text-secondary">
                DATA di RILASCIO:
              </span>{" "}
              {prodotto?.dataPubblicazione}
            </p>
            <p>DESCRIZIONE_QUI</p>

            <p>
              <button className={`${styles.button}`}>Acquista</button>
            </p>
          </div>
        </Row>
      </Container>
    </>
  );
};
