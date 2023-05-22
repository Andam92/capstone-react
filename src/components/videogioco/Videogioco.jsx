import React, { useState } from "react";
import { Alert, Card, Col } from "react-bootstrap";
import styles from "./videogioco.module.css";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import addToWish from "../../redux/actions/addWish";
import { addToCart } from "../../redux/actions/addCart";
import MyPopup from "./MyPopup";

export const Videogioco = ({ videogioco, selected, setSelected }) => {
  const [hover, setHover] = useState(false);
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wish = useSelector((state) => state?.wishReducer?.wish);
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const libreria = useSelector(
    (state) => state?.usersReducer?.users?.libreriaPersonale
  );
  const cart = useSelector((state) => state?.cartReducer?.cart);
  //const [id] = useState(props.id);

  const inLibrary = ({ titolo }) => {
    const arrayTitoli = libreria?.map((v) => v?.titolo);
    if (arrayTitoli?.includes(titolo)) {
      return true;
    }
    return false;
  };

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
    token ? dispatch(addToWish(videogioco)) : setAlert(true);
    // console.log(videogioco);
    console.log(wish);
  };

  return (
    <>
      <Col xs={12} md={6} lg={4} xl={3} className="mt-3 px-4">
        <Card
          className={`${
            selected === 0 || selected === videogioco.id
              ? styles.body
              : styles.body_opacity
          }`}
          onMouseOver={() => handleOver()}
          onMouseLeave={() => setSelected(0)}
        >
          <div>
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              {!show && !inLibrary(videogioco) ? (
                <button
                  onClick={() => {
                    if (token) {
                      dispatch(addToCart(videogioco));
                    } else {
                      setAlert(true);
                    }
                    setShow(true);
                  }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  className={`${styles.button}`}
                >
                  <FaShoppingCart
                    className={`${!hover && styles.cart} ${
                      hover && styles.cartHover
                    }`}
                    style={{ marginRight: "10px" }}
                  />

                  {!show && <span>Acquista</span>}
                </button>
              ) : (
                <div className={`${styles.button}`}>
                  <MdDone />
                </div>
              )}
              {!like && (
                <FaRegHeart
                  className={`${styles.heart_icon}`}
                  onClick={() => (setLike(!like), handleClick())}
                />
              )}
              {like && (
                <FaHeart
                  className={`${styles.heart_icon}`}
                  onClick={() => (
                    setLike(!like),
                    dispatch({ type: "DELETE_FROM_WISH", payload: videogioco })
                  )}
                />
              )}
            </div>
            {alert && (
              <Alert key="danger" variant="danger">
                Non puoi fare acquisti{" "}
                <Link to={"/login"}>se non hai effettato il login!</Link>
              </Alert>
            )}
            {/* <button onClick={() => console.log(inLibrary(videogioco))}>
              controllo
            </button> */}
          </Card.Body>
        </Card>
      </Col>

      {show && (
        <MyPopup titolo={videogioco.titolo} show={show} setShow={setShow} />
      )}
    </>
  );
};
