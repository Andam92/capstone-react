import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./carrello.css";
import { useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import Item from "../carrello_item/Item";
import { GiCrossMark } from "react-icons/gi";
import { Prova } from "../Prova";

function Carrello({ show, setShow }) {
  const [showCarrello, setShowCarrello] = useState(false);
  const [loading, setLoading] = useState(true);
  const carrello = useSelector((state) => state?.carrelloReducer?.carrello);

  useEffect(() => {
    setShowCarrello(show);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [show]);

  const handleClose = () => {
    setShowCarrello(false);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  useEffect(() => {
    console.log(show);
  }, []);

  return (
    <Offcanvas
      show={showCarrello}
      onHide={handleClose}
      className="custom-background"
    >
      <Offcanvas.Header>
        <Offcanvas.Title>Wishlist ❤️</Offcanvas.Title>
        <GiCrossMark
          onClick={() => {
            handleClose();
          }}
          className="text-light"
        />
      </Offcanvas.Header>
      <Offcanvas.Body className="body">
        <h4 className="mb-3">Ecco tutti i tuoi giochi preferiti</h4>
        {carrello?.length > 0 ? (
          <Container>
            {carrello?.length > 0 &&
              carrello?.map((p, i) => (
                <Item key={i} prodotto={p} loading={loading} />
              ))}
            {/* {carrello?.length > 0 &&
              carrello?.map((p, i) => <Prova prodotto={p} />)} */}
          </Container>
        ) : (
          <p>Aggiungi un gioco dallo store</p>
        )}

        {/* <p onClick={() => console.log(carrello)}>PROVA</p> */}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Carrello;
