import React, { useState } from "react";
import { Alert, Card, Col } from "react-bootstrap";
import styles from "./videogioco.module.css";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/addCart";

export const Videogioco = ({ videogioco, selected, setSelected }) => {
  const [hover, setHover] = useState(false);
  const [like, setLike] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carrello = useSelector((state) => state?.carrelloReducer?.carrello);
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  //const [id] = useState(props.id);

  // HANDLE NAVIGATE
  const handleNavigate = () => {
    navigate(`/store/${videogioco.id}`);
  };

  // HANDLE CARD MOUSE-OVER
  const handleOver = () => {
    if (videogioco.id !== selected) {
      setSelected(videogioco.id);
    }
  };

  // HANDLE Click-DISPATCH
  const handleClick = () => {
    token ? dispatch(addToCart(videogioco)) : setAlert(true);
    // console.log(videogioco);
    console.log(carrello);
  };

  return (
    <Col xs={12} sm={6} lg={4} xl={3} className="mt-3 px-4">
      <Card
        className={`${
          selected === 0 || selected === videogioco.id
            ? styles.body
            : styles.body_opacity
        }`}
        onMouseOver={() => handleOver()}
        onMouseLeave={() => setSelected(0)}
      >
        <div style={{ maxHeight: "60%" }}>
          <Card.Img
            className={`${styles.img}`}
            variant="top"
            src={videogioco.immagine}
            onClick={() => handleNavigate()}
          />
        </div>
        <Card.Body className={`${styles.text}`}>
          <div>
            <Card.Title
              className={`${styles.title}`}
              onClick={() => handleNavigate()}
            >
              {videogioco.titolo}
            </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => handleClick()}
              className={`${styles.button}`}
            >
              <FaShoppingCart
                className={`${!hover && styles.cart} ${
                  hover && styles.cartHover
                }`}
                style={{ marginRight: "10px" }}
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
          {alert && (
            <Alert key="danger" variant="danger">
              Non puoi fare acquisti{" "}
              <Link to={"/login"}>se non hai effettato il login!</Link>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};
