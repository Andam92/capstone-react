import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/homepage/Home";
import { Navbar } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter basename="/">
      <Home />
    </BrowserRouter>
  );
}

export default App;
