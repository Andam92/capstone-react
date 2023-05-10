import React from "react";
import Navbar from "../navbar/Navbar";
import MyCarousel from "../carousel/MyCarousel";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={`${styles.body}`}>
      <Navbar />
      <MyCarousel />
    </div>
  );
};

export default Home;
