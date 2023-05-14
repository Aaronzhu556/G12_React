import React, { useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { CustomerServiceOutlined, PullRequestOutlined, UserOutlined } from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const menuData = [
  getItem("Service Providers", "providers", <UserOutlined />),
  getItem("Customer", "customer", <UserOutlined />),
  getItem("Service", "service", <CustomerServiceOutlined />),
  getItem("Request", "request", <PullRequestOutlined />),
  getItem("Account", "account", <UserOutlined />),
];

const Admin = () => {
  const [setMenuItem] = useOutletContext();

  useEffect(() => {
    setMenuItem(menuData);
  });

  return (
    <>
      <Outlet />
    </>
  );
};

export default Admin;
