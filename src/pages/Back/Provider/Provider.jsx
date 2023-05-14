import React, { useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import { PullRequestOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";

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
  getItem("Services", "services", <ShoppingOutlined />),
  getItem("Request", "request", <PullRequestOutlined />),
  getItem("Account", "account", <UserOutlined />),
];

const Provider = () => {
  const [setMenuItem] = useOutletContext();

  useEffect(() => {
    setMenuItem(menuData)
  })

  return (
    <>
      <Outlet/>
    </>
  )
}

export default Provider