import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Videogioco } from "../videogioco/Videogioco";
import { PacmanLoader } from "react-spinners";
import styles from "./store.module.css";

export const Store = () => {
  // HOOKS
  const [prodotti, setProdotti] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(0);

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
        // dispatch({
        //   type: "STORE_FETCH",
        //   payload: data,
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // EFFECT
  useEffect(() => {
    if (prodotti.length === 0) {
      recuperaProdotti();
      setInterval(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, []);

  return (
    <div className="p-4">
      <h1>Giochi in evidenza</h1>
      <div>
        <Row>
          {/* {loading && <Spinner animation="grow" />} */}
          {/* {
            prodotti?.map(
              (p, i) => (
                <Videogioco
                  key={i}
                  titolo={p.titolo}
                  immagine={p?.immagine}
                ></Videogioco>
              )

              )} */}
          {isLoading && (
            <div className={`${styles.pacman}`}>
              <PacmanLoader color="#FFE900" />
            </div>
          )}
          {prodotti?.map(
            (p, i) => (
              <Videogioco
                key={i}
                videogioco={p}
                selected={selected}
                setSelected={setSelected}
              ></Videogioco>
            )

            /* <PacmanLoader color="#FFE900" /> */
          )}
        </Row>
      </div>
    </div>
  );
};
