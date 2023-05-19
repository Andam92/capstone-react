import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./wish.css";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Item from "../wishlist_item/Item";
import { GiCrossMark } from "react-icons/gi";

function Wish({ show, setShow }) {
  const [showCarrello, setShowCarrello] = useState(false);
  const [loading, setLoading] = useState(true);
  const wish = useSelector((state) => state?.wishReducer?.wish);

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
          className="text-light cross"
        />
      </Offcanvas.Header>
      <Offcanvas.Body className="body">
        <h4 className="mb-3">Ecco tutti i tuoi giochi preferiti</h4>
        {wish?.length > 0 ? (
          <Container>
            {wish?.length > 0 &&
              wish?.map((p, i) => (
                <Item key={i} prodotto={p} loading={loading} />
              ))}
            {/* <button className="button_buy rounded">Procedi all'acquisto</button> */}
          </Container>
        ) : (
          <p>Aggiungi un gioco dallo store</p>
        )}

        {/* <p onClick={() => console.log(wish)}>PROVA</p> */}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Wish;
