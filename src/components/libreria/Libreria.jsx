import React, { useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./libreria.module.css";
import { Item } from "./Item";
import { recuperaLibreria } from "../../redux/actions/addLibrary";

export const Libreria = () => {
  const [selected, setSelected] = useState(false);
  const [deselect, setDeselect] = useState(false);
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
    if (!selected && libreria?.length > 0) {
      handleSelection(libreria[0]);
    }
  }, []);

  useEffect(() => {
    setDeselect(!deselect);
  }, [selected]);

  return (
    <div style={{ marginTop: "110px" }} className={`${styles.body}`}>
      {" "}
      <div
        className={`${styles.background}`}
        style={{ backgroundImage: `url(${selected?.immagine})` }}
      >
        <div className={`${styles.overlay}`}>
          {selected && (
            <div className={`${styles.textBox}`}>
              <div className={`${styles.textInner}`}>
                <h1
                  className="pb-2"
                  style={{
                    borderBottom: "1px solid white",
                    marginBottom: "10px",
                  }}
                >
                  {selected?.titolo}
                </h1>
                <p style={{ marginBottom: "2rem" }}>{selected?.categoria}</p>
                <p>{selected?.descrizione}</p>
                <p className="mb-1">
                  Sviluppato da:{" "}
                  <span className="fw-bold">{selected?.casaProduzione}</span>
                </p>
                <p>
                  Editore: <span className="fw-bold">{selected?.editore}</span>
                </p>
                <button className={`${styles.textPlay} mt-3`}>Play</button>
              </div>
            </div>
          )}
          <Container fluid className={`${styles.container} `}>
            <div className={`${styles.aside}`}>
              <Form className="mt-4 ">
                <div className="position-relative ps-3">
                  <div
                    style={{ top: "7%", right: "27%" }}
                    className="position-absolute"
                  >
                    {/* <FaSearch className="text-dark" /> */}
                  </div>
                  <Form.Control
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    type="text"
                    className={`${styles.searchbar}`}
                    placeholder="Cerca..."
                  />
                </div>
              </Form>{" "}
              {!libreria?.length && (
                <p className="ms-3">
                  Non hai ancora acquistato niente, la tua libreria è vuota!
                </p>
              )}
              {!search &&
                libreria?.map((v, i) => (
                  <Item onSelect={handleSelection} key={i} videogioco={v} />
                ))}
              {search &&
                libreria
                  ?.filter((item) =>
                    item.titolo.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((v, i) => (
                    <Item onSelect={handleSelection} key={i} videogioco={v} />
                  ))}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
