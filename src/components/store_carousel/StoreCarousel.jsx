import React from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./carousel.css";

export const StoreCarousel = ({ prodotti, categoria }) => {
  //Suddivido l'array di prodotti in gruppi da 3
  const groupedElements = [];
  const arrayCategoria = prodotti.filter(
    (elemento) => elemento.categoria === categoria
  );
  for (let i = 0; i < arrayCategoria.length; i += 3) {
    groupedElements.push(arrayCategoria.slice(i, i + 3));
  }

  const navigate = useNavigate();

  return (
    <>
      <Carousel>
        {prodotti.length > 0 &&
          groupedElements.map((group, i) => (
            <Carousel.Item key={i}>
              <Row>
                {group.map((element, index) => (
                  <Col key={index} xs={12} md={4}>
                    <div
                      className={`${styles.slides}`}
                      onClick={() => navigate(`/store/${element.id}`)}
                      style={{
                        cursor: "pointer",
                        backgroundImage: `url(${element.immagine})`,
                        height: "400px",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};
