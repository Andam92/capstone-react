import React, { useEffect, useState } from "react";
import { Alert, Card, Col } from "react-bootstrap";
import styles from "../prova/myStyle.module.css";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import addToWish from "../../redux/actions/addWish";
import { addToCart } from "../../redux/actions/addCart";
import MyPopup from "../videogioco/MyPopup";

export const Prova = ({
  videogioco,
  selected,
  setSelected,
  pippo,
  setPippo,
}) => {
  const [isInLibrary, setIsInLibrary] = useState(false);
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);
  const [alert, setAlert] = useState(false);
  const [checkWish, setCheckWish] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wish = useSelector((state) => state?.wishReducer?.wish);
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const libreria = useSelector((state) => state?.libraryReducer?.library);
  const cart = useSelector((state) => state?.cartReducer?.cart);
  const id = useSelector((state) => state?.usersReducer?.users?.id);

  const inWish = (videogioco) => {
    const arrayTitoli = wish?.map((v) => v?.titolo);
    if (arrayTitoli.includes(videogioco?.titolo)) {
      return true;
    }
    return false;
  };

  const inCart = (videogioco) => {
    const arrayTitoli = cart?.map((v) => v?.titolo);
    if (arrayTitoli?.includes(videogioco?.titolo)) {
      return true;
    }
    return false;
  };

  const inLibrary = (videogioco) => {
    const arrayTitoli = libreria?.map((v) => v?.titolo);
    if (arrayTitoli?.includes(videogioco?.titolo)) {
      return true;
    } else {
      return false;
    }
  };

  // HANDLE MOUSE ENTER
  // const handleMouseEnter = () => {
  //   setHover(true);
  // };

  // HANDLE NAVIGATE
  const handleNavigate = () => {
    navigate(`/store/${videogioco?.id}`);
  };

  // HANDLE CARD MOUSE-OVER
  const handleOver = () => {
    if (videogioco?.id !== selected) {
      console.log(videogioco.id);
      setPippo(videogioco?.id);
    }
  };

  // HANDLE Click-DISPATCH-Wish
  const handleClick = () => {
    token ? dispatch(addToWish(videogioco)) : setAlert(true);
    // console.log(videogioco);
    console.log(wish);
  };

  // HANDLE Click-shop
  const handleClickShop = (e) => {
    if (token && !inCart(videogioco)) {
      dispatch(addToCart(videogioco));
      setShow(true);
    } else if (!token) {
      e.preventDefault();
      setAlert(true);
    }
  };

  useEffect(() => {
    if (!inWish(videogioco)) {
      setCheckWish(false);
    }
  }, [wish]);

  useEffect(() => {
    if (inLibrary(videogioco)) {
      setIsInLibrary(true);
    }
  }, [libreria]);

  return (
    <>
      <Col xs={12} md={6} lg={4} xl={3} className="mt-3 px-4">
        <Card
          onMouseEnter={() => handleOver()}
          // if (selected !== videogioco.id) {
          //   console.log(selected);
          //   setSelected(videogioco.id);
          // }
          // console.log(selected === videogioco.id);
          // console.log(selected);

          className={`${styles.body} ${
            pippo === videogioco?.id && styles.body_opacity
          }`}
          // onMouseLeave={() => setSelected(0)}
        >
          <div>
            <Card.Img
              className={`${styles.img}`}
              variant="top"
              src={videogioco?.immagine}
              onClick={() => handleNavigate()}
            />
          </div>
          <Card.Body className={`${styles.text}`}>
            <div>
              <Card.Title
                className={`${styles.title}`}
                onClick={() => handleNavigate()}
              >
                {videogioco?.titolo}
              </Card.Title>

              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.{" "}
              </Card.Text>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              {!inLibrary(videogioco) && (
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    onClick={(e) => handleClickShop(e)}
                    // onMouseEnter={() => handleMouseEnter()}
                    // onMouseLeave={() => setHover(false)}
                    className={`${styles.button}`}
                  >
                    <FaShoppingCart
                      className={`${styles.cart}`}
                      style={{ marginRight: "10px" }}
                    />

                    {!inCart(videogioco) ? (
                      <span>Acquista</span>
                    ) : (
                      <span onClick={() => navigate(`/checkout/${id}`)}>
                        Nel carrello
                      </span>
                    )}
                  </button>{" "}
                </div>
              )}
              {inLibrary(videogioco) && (
                <p
                  style={{ textAlign: "center" }}
                  className={`${styles.inLibrary}`}
                >
                  In libreria
                </p>
              )}

              <div>
                {!checkWish && (
                  <FaRegHeart
                    className={`${styles.heart_icon}`}
                    onClick={() => {
                      setLike(like);
                      if (!inWish(videogioco?.titolo)) {
                        setCheckWish(true);
                      }
                      handleClick();
                    }}
                  />
                )}

                {checkWish && (
                  <FaHeart
                    className={`${styles.heart_icon}`}
                    onClick={() => {
                      if (inWish(videogioco?.titolo)) {
                        setCheckWish(false);
                      }
                      setLike(!like);
                      dispatch({
                        type: "DELETE_FROM_WISH",
                        payload: videogioco,
                      });
                    }}
                  />
                )}
              </div>
            </div>

            {/* {inLibrary(videogioco) && (
                <span className={`${styles.button}`}>In libreria</span>
              )}
              {!inCart(videogioco) && !inLibrary(videogioco) && (
                <div>
                  {!like && !inWish(videogioco) ? (
                    <FaRegHeart
                      className={`${styles.heart_icon}`}
                      onClick={() => (setLike(!like), handleClick())}
                    />
                  ) : (
                    <FaHeart
                      className={`${styles.heart_icon}`}
                      onClick={() => (
                        setLike(!like),
                        dispatch({
                          type: "DELETE_FROM_WISH",
                          payload: videogioco,
                        })
                      )}
                    />
                  )}
                </div>
              )} */}

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
        <MyPopup titolo={videogioco?.titolo} show={show} setShow={setShow} />
      )}
    </>
  );
};
