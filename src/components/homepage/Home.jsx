import React from "react";
import Navbar from "../navbar/Navbar";

import styles from "./home.module.css";
import { Route, Routes } from "react-router-dom";
import { Main } from "../carousel/main/Main";
import RegisterPage from "../registerPage/RegisterPage";
import { Login } from "../loginPage/Login";
import { Store } from "../store/Store";
import { SingleProduct } from "../singleProduct/SingleProduct";

const Home = () => {
  return (
    <div className={`${styles.body}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/store" element={<Store />}></Route>
        <Route path="/store/:id" element={<SingleProduct />}></Route>
      </Routes>
      {/* <MyCarousel /> */}
      mn{" "}
    </div>
  );
};

export default Home;
