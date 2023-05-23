import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Videogioco } from "../videogioco/Videogioco";
import { PacmanLoader } from "react-spinners";
import styles from "./store.module.css";
import { StoreCarousel } from "../store_carousel/StoreCarousel";

export const Store = () => {
  // HOOKS
  const [search, setSearch] = useState("");
  const [prodotti, setProdotti] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(0);

  const libreria = useSelector(
    (state) => state?.usersReducer?.users?.libreriaPersonale
  );
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );

  // const dispatch = useDispatch();

  // FETCH
  const recuperaProdotti = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/vg");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProdotti(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // EFFECT
  useEffect(() => {
    if (prodotti.length === 0) {
      console.log("LIBRERIA", libreria);
      recuperaProdotti();
      setInterval(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, []);

  //CATEGORIE
  const categorie = [
    "RPG",
    "AZIONE",
    "FPS",
    "NARRATIVO",
    "ROMPICAPO",
    "HORROR",
    "STRATEGIA",
    "MULTIPLAYER",
    "SPORT",
  ];

  return (
    <div className={`${styles.body}`}>
      <Col className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h1 className="mt-4">Giochi in evidenza</h1>
        <Form className="mt-4">
          <Form.Control
            onChange={(e) => (setSearch(e.target.value), console.log(search))}
            value={search}
            type="text"
            placeholder="Cerca un gioco"
          />
        </Form>
      </Col>
      <div>
        <Row>
          {isLoading && (
            <div className={`${styles.pacman}`}>
              <PacmanLoader color="#FFE900" />
            </div>
          )}
          {!search
            ? prodotti?.map((p, i) => (
                <Videogioco
                  key={i}
                  videogioco={p}
                  selected={selected}
                  setSelected={setSelected}
                ></Videogioco>
              ))
            : prodotti
                .filter((videogioco) =>
                  videogioco.titolo
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase())
                )
                .map((p, i) => (
                  <Videogioco
                    key={i}
                    videogioco={p}
                    selected={selected}
                    setSelected={setSelected}
                  ></Videogioco>
                ))}
        </Row>
        {categorie.map((e) => (
          <Row style={{ marginTop: "3rem" }}>
            <h2>{e}</h2>
            <StoreCarousel
              selected={selected}
              setSelected={setSelected}
              categoria={e}
              prodotti={prodotti}
            />
          </Row>
        ))}
      </div>
    </div>
  );
};
