import { Col, Image } from "react-bootstrap";
import styles from "./item.module.css";
import React from "react";

export const Item = ({ videogioco, onSelect }) => {
  const handleSelect = (item) => {
    onSelect(item);
  };

  return (
    <div className="mb-3 w-100">
      <Col className={`${styles.row}`}>
        <div className={`${styles.roundImg}`}>
          <img alt="img" src={videogioco?.immagine}></img>
        </div>
        <span onClick={() => handleSelect(videogioco)}>
          {videogioco?.titolo}
        </span>
      </Col>
    </div>
  );
};
