import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { FaApple, FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import styles from "./footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={`${styles.container}`}>
      <Container className="d-flex flex-column justify-content-between flex-md-row">
        <Row className="flex-column align-self-start">
          <Col className="justify-content-center mt-3">
            <Image
              style={{ width: "260px", height: "auto" }}
              fluid
              src="https://drive.google.com/u/0/uc?id=1Hn4dZjtMnoLEDvp3gkBCBxtC4ThpUXHT"
            ></Image>
          </Col>
          <Col className="d-flex justify-content-between mt-2">
            <FaApple className="m-2 fs-5" />
            <FaFacebook className="m-2 fs-5" />
            <FaGoogle className="m-2 fs-5" />
            <FaTwitter className="m-2 fs-5" />
          </Col>
        </Row>
        <Row className="flex-column justify-content-start text-start">
          <Col className={`${styles.child} mt-2`}>Impieghi</Col>
          <Col className={`${styles.child} mt-2`}>La società</Col>
          <Col className={`${styles.child} mt-2`}>Assistenza</Col>
          <Col className={`${styles.child} mt-2`}>Contattaci</Col>
          <Col className={`${styles.child} mt-2`}>Stampa</Col>
          <Col className="d-none d-lg-block mt-2">Mappa del sito</Col>
        </Row>

        <div className={`${styles.small}`}>
          <Row className="flex-column mt-2 text-start">
            <Col className={`${styles.child}`}>Privacy</Col>
            <Col className={`${styles.child}`}>Documentazione legale</Col>
            <Col className={`${styles.child}`}>Menzioni legali</Col>
            <Col className={`${styles.child}`}>Cookies</Col>
            <Col className={`${styles.child}`}>Impostazioni sui cookie</Col>
            <Col className={`${styles.child}`}>Rarità dei contenuti</Col>
          </Row>
          <div className={`${styles.small}`}>
            <Row className="flex-column mt-4 text-start">
              <Col>
                <hr className="m-0 mb-2" />
                {"©" + currentYear + " Prisma Games Entertainment, Inc."}
              </Col>
              <Col>
                Tutti i marchi qui riportati sono di proprietà dei rispettivi
                detentori.
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
