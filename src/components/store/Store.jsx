import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { PacmanLoader } from "react-spinners";
import styles from "./store.module.css";

import { Prova } from "../prova/Prova";
import { Chip } from "@mui/material";

export const Store = () => {
  // HOOKS
  const [search, setSearch] = useState("");
  const [prodotti, setProdotti] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [pippo, setPippo] = useState(0);

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
        setFiltered(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // EFFECT
  useEffect(() => {
    console.log(libreria);
    if (prodotti.length === 0) {
      recuperaProdotti();
      setInterval(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, []);

  //CATEGORIE
  const categorie = prodotti.map((cat) => cat?.categoria);
  const categorieFiltrate = [...new Set(categorie)];

  //HANDLE CLICK CATEGORIE
  const handleClick = (cat) => {
    setSearch("");
    if (cat !== "TUTTI") {
      setFiltered(prodotti?.filter((element) => element.categoria === cat));
    } else {
      setFiltered(prodotti);
    }
    console.log("Chip cliccata: ", filtered);
  };

  return (
    <div className={`${styles.body}  ${isLoading && styles.loading}`}>
      <Col className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h1 className="mt-4">Giochi in evidenza</h1>
        <Form className="mt-4">
          <Form.Control
            onChange={(e) => (setSearch(e.target.value), setFiltered(false))}
            value={search}
            type="text"
            placeholder="Cerca un gioco"
          />
        </Form>
      </Col>
      <div>
        {categorieFiltrate.map((cat, i) => (
          <Chip
            key={i}
            label={cat}
            variant="outlined"
            onClick={() => handleClick(cat)}
            style={{ margin: "30px 15px 10px", padding: "2px 15px" }}
          />
        ))}
        <Chip
          label="TUTTI"
          variant="outlined"
          onClick={() => handleClick("TUTTI")}
          style={{ margin: "30px 15px 10px", padding: "2px 15px" }}
        />
      </div>
      <div>
        <Row>
          {isLoading && (
            <div className={`${styles.pacman}`}>
              <PacmanLoader color="#FFE900" />
            </div>
          )}
          {!search &&
            !filtered &&
            prodotti?.map((p, i) => (
              <>
                <Prova
                  key={i}
                  videogioco={p}
                  selected={selected}
                  setSelected={setSelected}
                  setPippo={setPippo}
                  pippo={pippo}
                  libreria={libreria}
                ></Prova>
              </>
            ))}
          {search &&
            !filtered &&
            prodotti
              .filter((videogioco) =>
                videogioco.titolo
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
              .map((p, i) => (
                <>
                  <Prova
                    key={i}
                    videogioco={p}
                    selected={selected}
                    setSelected={setSelected}
                    setPippo={setPippo}
                    pippo={pippo}
                  ></Prova>
                </>
              ))}
          {filtered &&
            filtered.map((p, i) => (
              <>
                <Prova
                  key={i}
                  videogioco={p}
                  selected={selected}
                  setSelected={setSelected}
                  setPippo={setPippo}
                  pippo={pippo}
                ></Prova>
              </>
            ))}
        </Row>
      </div>
    </div>
  );
};
