import React from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../videogioco/videogioco.module.css";

export const StoreCarousel = ({
  prodotti,
  categoria,
  selected,
  setSelected,
}) => {
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
          groupedElements
            // .filter((p) => p.categoria === "RPG")
            .map((group, i) => (
              <Carousel.Item interval={100000000} key={i}>
                <Row>
                  {group.map((element, index) => (
                    <Col key={index} xs={12} md={4}>
                      <div
                        onMouseEnter={
                          element.id !== selected && setSelected(element.id)
                        }
                        onMouseLeave={setSelected(0)}
                        onClick={() => navigate(`/store/${element.id}`)}
                        className={`${
                          selected === 0 || selected === element.id
                            ? styles.body
                            : styles.body_opacity
                        } d-block w-100 position-relative`}
                        style={{
                          cursor: "pointer",
                          backgroundImage: `url(${element.immagine})`,
                          height: "350px",
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
