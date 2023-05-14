import React from "react";
import { useNavigate } from "react-router-dom";
import "./404.css";
import { Button } from "antd";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <h1>404</h1>
      <h3>Page not found</h3>
      <Button type="primary" onClick={() => navigate("/", { replace: true })}>
        Home
      </Button>
    </div>
  );
};

export default NotFound;