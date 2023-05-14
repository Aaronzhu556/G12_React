import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Front.css";

const Front = () => {
  return (
    <>
      <Navbar />
      <div className="front">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Front;
