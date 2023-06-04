import React from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import style from "./carousel.css";

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

  const customNext = ({ onClick }) => {
    <MdOutlineNavigateNext className="customNext" onClick={onClick} />;
  };

  return (
    <>
      <Carousel nextIcon={customNext}>
        {prodotti.length > 0 &&
          groupedElements
            // .filter((p) => p.categoria === "RPG")
            .map((group, i) => (
              <Carousel.Item key={i}>
                <Row>
                  {group.map((element, index) => (
                    <Col key={index} xs={12} md={4}>
                      <div
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
