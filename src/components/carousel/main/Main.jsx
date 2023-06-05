import React, { useEffect, useState } from "react";
// import MyCarousel from "../MyCarousel";
import { Row } from "react-bootstrap";
import styles from "./main.module.css";
import { Samples } from "../../sample/Samples";
import CarouselFadeExample from "../../carousel-test/Carousel";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const slides = [
    {
      url: "https://drive.google.com/u/0/uc?id=1JMiUmQRgEjXHlUhk_P8lV98wHM2rTk7A",
      title: "The Legend of Zelda: Tears of the Kingdom",
    },
    {
      url: "https://drive.google.com/u/0/uc?id=11dBx7gOX8iBlGJxqg1AnSsfK_Pk9hD3L",
      title: "Monster Hunter: World",
    },
    {
      url: "https://drive.google.com/u/0/uc?id=1vyd-3uHbkQSXW8oBSZneYtC04X1C0R-c",
      title: "Warzone 2.0",
    },
  ];

  const [navScroll, setNavScroll] = useState(false);
  const [prodotti, setProdotti] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // FETCH
  const recuperaProdotti = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/vg");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProdotti(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  window.addEventListener("scroll", () =>
    window.scrollY >= 100 ? setNavScroll(true) : setNavScroll(false)
  );

  useEffect(() => {
    recuperaProdotti();
    console.log(prodotti);
  }, []);

  return (
    <div className={`${styles.body}`}>
      <div className={`${styles.carouselContainer}`}>
        <CarouselFadeExample slides={slides} />
      </div>
      {/* <div className={`${styles.carouselContainer}`}>
        <MyCarousel slides={slides} setCurrentSlide={setCurrentSlide} />
      </div> */}

      <Row className={`${styles.section2}`}>
        <h3 className="m-0">Giochi in evidenza</h3>
        <Samples prodotti={prodotti} categoria={"RPG"} />
        <button
          className={`${styles.buttonToStore}`}
          onClick={() => navigate("/store")}
        >
          Vai al negozio
        </button>
      </Row>
      <div className={`${styles.sfondo1}`}>
        <img
          alt="alt"
          src="https://drive.google.com/u/0/uc?id=1eUsZN_lUo6kvQtHxTIuzu31hZklVX2Uf"
        ></img>
      </div>

      {/* <div className={`${styles.overflow}`}>
        <Row>
          <Col
            xs={4}
            className={`${styles.startingPointImg} ${
              navScroll && styles.section1
            } `}
          >
            <Image
              src="https://drive.google.com/u/0/uc?id=1iQRP-Al8BLWyuHZHXpipsHSUCdN_wQSZ"
              fluid
            />
          </Col>
          <Col
            xs={8}
            className={`${styles.startingPointText} ${
              navScroll && styles.section1
            } `}
          >
            <div className={`${styles.payoff}`}>
              <p className="fs-1">GamesPlanet</p>{" "}
              <p className="fs-3">
                Un mondo di giochi: l'unico limite è la fantasia
              </p>
            </div>
          </Col>
        </Row>
      </div> */}
    </div>
  );
};
