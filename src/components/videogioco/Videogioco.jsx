import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import styles from "./videogioco.module.css";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Videogioco = (props) => {
  const [hover, setHover] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  //const [id] = useState(props.id);

  // HANDLE NAVIGATE
  const handleNavigate = () => {
    navigate(`/store/${props.id}`);
  };

  // HANDLE CARD MOUSE-OVER
  const handleOver = (over) => {
    setHighlight(over);
  };

  return (
    <Col xs={12} sm={6} lg={4} xl={3} className="mt-3 px-4">
      <Card
        className={`${highlight ? styles.body : styles.body_opacity}`}
        onMouseOver={() => handleOver(true)}
        onMouseLeave={() => handleOver(false)}
      >
        <div style={{ maxHeight: "60%" }}>
          <Card.Img
            className={`${styles.img}`}
            variant="top"
            src={props.immagine}
            onClick={() => handleNavigate()}
          />
        </div>
        <Card.Body className={`${styles.text}`}>
          <div className="d-flex flex-column justify-content-evenly">
            <Card.Title
              className={`${styles.title}`}
              onClick={() => handleNavigate()}
            >
              {props.titolo}
            </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </div>
          <div className="d-flex justify-content-between align-items-center">
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
            {!like && (
              <FaRegHeart
                className={`${styles.heart_icon}`}
                onClick={() => setLike(!like)}
              />
            )}
            {like && (
              <FaHeart
                className={`${styles.heart_icon}`}
                onClick={() => setLike(!like)}
              />
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
