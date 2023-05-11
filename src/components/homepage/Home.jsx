import React from "react";
import Navbar from "../navbar/Navbar";
import MyCarousel from "../carousel/MyCarousel";
import styles from "./home.module.css";
import { Route, Routes } from "react-router-dom";
import { Main } from "../carousel/main/Main";
import RegisterPage from "../registerPage/RegisterPage";

const Home = () => {
  return (
    <div className={`${styles.body}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
      {/* <MyCarousel /> */}
    </div>
  );
};

export default Home;
