import React, { useEffect, useState } from "react";
import MyCarousel from "../MyCarousel";
import { recuperaLibreria } from "../../../redux/actions/addLibrary";
import { useSelector } from "react-redux";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./main.module.css";
import { StoreCarousel } from "../../store_carousel/StoreCarousel";

export const Main = () => {
  const [navScroll, setNavScroll] = useState(false);
  const [prodotti, setProdotti] = useState([]);
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const users = useSelector((state) => state?.usersReducer?.users);

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
      <MyCarousel />
      <div>
        <Row
          className={`${styles.startingPoint} ${navScroll && styles.section1} `}
        >
          <Col className="col-md-4">
            <Image
              src="https://drive.google.com/u/0/uc?id=1iQRP-Al8BLWyuHZHXpipsHSUCdN_wQSZ"
              fluid
            />
          </Col>
          <Col>
            <p className={`${styles.payoff}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              inventore nulla corrupti non id necessitatibus aliquid consectetur
              sint quia obcaecati nostrum consequuntur, debitis excepturi
              consequatur alias odit accusantium, ipsum ea.
            </p>
          </Col>
        </Row>
        <Row className={`${styles.section2}`}>
          <h3>Alcune delle nostre offerte</h3>
          <StoreCarousel prodotti={prodotti} categoria={"FPS"} />
        </Row>
      </div>
    </div>
  );
};
