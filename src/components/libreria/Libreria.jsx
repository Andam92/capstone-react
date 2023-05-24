import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./libreria.module.css";
import { Item } from "./Item";
import { recuperaLibreria } from "../../redux/actions/addLibrary";
import { FaSearch } from "react-icons/fa";

export const Libreria = () => {
  const [selected, setSelected] = useState(false);
  const [search, setSearch] = useState("");
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const libreria = useSelector((state) => state?.libraryReducer?.library);

  const { id } = useParams();

  // FUNZIONE PER GESTIRE SELEZIONE DINAMICA GIOCO
  const handleSelection = (selected) => {
    const selectedGame = libreria?.filter((element) => element === selected);
    setSelected(selectedGame[0]);
    console.log("Gioco selezionato -> ", selectedGame);
  };

  useEffect(() => {
    if (token !== undefined) {
      recuperaLibreria(id, token);
    }
  }, []);

  useEffect(() => {
    console.log(selected.titolo);
  }, [selected]);

  return (
    <div className={`${styles.body}`}>
      {" "}
      <div
        className={`${styles.background}`}
        style={{ backgroundImage: `url(${selected?.immagine})` }}
      >
        <div className={`${styles.overlay}`}>
          <Container
            fluid
            className={`${styles.container} `}
            style={{ marginTop: "110px" }}
          >
            <Row className={`${styles.aside}`}>
              <Form className="mt-4">
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  type="text"
                  className={`${styles.searchbar}`}
                  placeholder={<FaSearch />}
                />
              </Form>{" "}
              <p>{selected?.titolo}</p>
              {libreria?.map((v, i) => (
                <Item onSelect={handleSelection} key={i} videogioco={v} />
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};
