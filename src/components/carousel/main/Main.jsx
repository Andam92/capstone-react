import React, { useEffect } from "react";
import MyCarousel from "../MyCarousel";
import { recuperaLibreria } from "../../../redux/actions/addLibrary";
import { useSelector } from "react-redux";

export const Main = () => {
  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );
  const users = useSelector((state) => state?.usersReducer?.users);

  useEffect(() => {
    recuperaLibreria(users?.id, token);
    console.log("Console log da Main");
  }, [users]);

  return (
    <div style={{ marginTop: "110px" }}>
      <MyCarousel />
    </div>
  );
};
