import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Store = () => {
  // HOOKS
  const [prodotti, setProdotti] = useState([]);
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );

  // EFFECT
  useEffect(() => {
    // FETCH
    const recuperaProdotti = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/vg");
        if (response.ok) {
          const data = await response.json();
          setProdotti(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <div>
      <ol>
        {prodotti.map((p) => (
          <li>{p.titolo}</li>
        ))}
      </ol>
    </div>
  );
};
