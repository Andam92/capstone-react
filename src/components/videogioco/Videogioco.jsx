import React from "react";
import { Button, Card } from "react-bootstrap";

export const Videogioco = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://drive.google.com/u/0/uc?id=1Z9EDmj_HDxH5phPDWpnK9nbqY292_q86&export=download"
      />
      <Card.Body>
        <Card.Title>{props.titolo}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};
