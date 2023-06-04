import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./footer.module.css";

const Footer = () => {
  const currentYear = new Date();
  return (
    <div className={`${styles.container}`}>
      <Container>
        <Row className="justify-content-center mt-3">LOGO</Row>
        <Row className={`${styles.firstRow} flex-wrap`}>
          <Col xs={6} sm={4} md={2} className={`${styles.child} mt-md-1`}>
            IMPIEGHI
          </Col>
          <Col xs={6} sm={4} md={2} className={`${styles.child} mt-md-1`}>
            LA SOCIETÀ
          </Col>
          <Col xs={6} sm={4} md={2} className={`${styles.child} mt-md-1`}>
            ASSISTENZA
          </Col>
          <Col xs={6} sm={4} md={2} className={`${styles.child} mt-md-1`}>
            CONTATTACI
          </Col>
          <Col xs={6} sm={4} md={2} className={`${styles.child} mt-md-1`}>
            STAMPA
          </Col>

          <Col xs={6} sm={4} md={2} className="d-none d-lg-block mt-md-1">
            MAPPA SITO
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            Tutti i giochi, una sola applicazione:{" "}
            <span className="text-primary text-decoration-underline">
              Applicazione GamesPlanet Desktop
            </span>
          </Col>
        </Row>
        <div className={`${styles.small}`}>
          <Row className="flex-column mt-2">
            <Col>
              {" "}
              {"©" +
                currentYear.getFullYear() +
                " GamesPlanet Entertainment, Inc."}
            </Col>
            <Col>
              Tutti i marchi qui riportati sono di proprietà dei rispettivi
              detentori.
            </Col>
          </Row>
        </div>
        <div className={`${styles.small}`}>
          <Row className="mt-3">
            <Col>Privacy</Col>
            <Col>Documentazione legale</Col>
            <Col className="d-none d-lg-block">Menzioni legali</Col>
            <Col className="d-none d-lg-block">Cookies</Col>
            <Col className="d-none d-md-block">Impostazioni sui cookie</Col>
            <Col className="d-none d-md-block">Rarità dei contenuti</Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
