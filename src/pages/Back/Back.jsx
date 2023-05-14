import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Back.css";
import { Menu } from "antd";

const Back = () => {
  const [menuItem, setMenuItem] = useState([]);

  // Click the button of the menu to a new page
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const onClickToPage = (e) => {
    const lastSlashIndex = currentPath.lastIndexOf("/");
    const rootPath = currentPath.substring(0, lastSlashIndex);
    const targetPath = rootPath + "/" + e.key;
    navigate(targetPath);
  };

  return (
    <div id="back">
      <Navbar />
      <div className="back-container">
        <Menu
          onClick={onClickToPage}
          style={{
            width: 256,
          }}
          mode="inline"
          items={menuItem}
        />

        <div className="back-right">
          <div className="back-main">
            <Outlet context={[setMenuItem]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Back;
