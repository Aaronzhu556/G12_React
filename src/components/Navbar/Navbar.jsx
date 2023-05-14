import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [key, setKey] = useState(0);


  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userinfo")) || null
  );
  // console.log(userData);

  const [messageApi, contextHolder] = message.useMessage();

  // logout
  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    messageApi.open({
      type: "success",
      content: "Logout successful",
    });
    setTimeout(() => {
      navigate("/authentication/login");
      setUserData(null);
    }, 1000);
  };
  // 使用 useEffect 监听 location 对象的变化，并在变化时更新 userData
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userinfo")) || null);
  }, [location]);
  // 到账户管理页面
  const toPage = () => {
    // console.log(userData);
    switch (userData.role) {
      case "customer":
        navigate("/account_management");
        break;
      case "provider":
        navigate("/back/provider/account");
        break;
      case "admin":
        navigate("/back/admin/account");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {contextHolder}
      <nav id="navbar">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          Find A Service - G12
        </div>

        <div className="navbar-func">
          <ul>
            <li onClick={toPage}>
              <p className="navbar-text">
                {userData?.user_name ||
                  userData?.service_provider_name ||
                  userData?.admin_name ||
                  "username"}
              </p>
              <UserOutlined />
            </li>
            {userData ? (
              <li>
                <p className="navbar-text" onClick={handleLogout}>
                  Log Out
                </p>
                <LogoutOutlined />
              </li>
            ) : (
              <li onClick={() => navigate("/authentication/login")}>
                <p className="navbar-text">Sign In</p>
                <LoginOutlined />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
