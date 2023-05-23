import { Col } from "react-bootstrap";
import styles from "./item.module.css";
import React from "react";

export const Item = ({ videogioco }) => {
  return <Col>{videogioco.titolo}</Col>;
};
