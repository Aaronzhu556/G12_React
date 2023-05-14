import React from "react";
import "./Authentication.css";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import LoginBg from "../../assets/LoginBg.jpeg";

const Authentication = () => {
  const style_auth = {
    background: `url(${LoginBg}) no-repeat center center / cover`,
  };

  return (
    <div id="authentication" style={style_auth}>
      <Navbar />

      <div className="authentication-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Authentication;
