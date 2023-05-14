import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Front from "../pages/Front/Front";
import Home from "../pages/Front/Home/Home";
import Authentication from "../pages/Authentication/Authentication";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Back from "../pages/Back/Back";
import Provider from "../pages/Back/Provider/Provider";
import Admin from "../pages/Back/Admin/Admin";
import Providers from "../pages/Back/Admin/Providers/Providers";
import Services from "../pages/Back/Provider/Services/Services";
import AccountProvider from "../pages/Back/Provider/Account/Account";
import AccountAdmin from "../pages/Back/Admin/Account/Account";
import NotFound from "../components/404/404";
import Detailspage from "../pages/Front/Details_Page/Detailspage";
import OrderConfirmation from "../pages/Front/AccountManagement/components/OrderConfirmation/OrderConfirmation";
import ServiceList from "../pages/Front/ServiceList/ServiceList";
import AccountManagement from "../pages/Front/AccountManagement/AccountManagement";
import Customer from "../pages/Back/Admin/Customer/Customer";
import Service from "../pages/Back/Admin/Service/Service";
import RequestAdmin from "../pages/Back/Admin/Request/Request";
import RequestProvider from "../pages/Back/Provider/Request/Request";

// 这里配置页面路由
const routes = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Front />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "details/:serviceId",
        element: <Detailspage />,
      },
      {
        path: "order_confirmation",
        element: <OrderConfirmation />,
      },
      {
        path: "service_list",
        element: <ServiceList />,
      },
      {
        path: "account_management",
        element: <AccountManagement />,
      },
    ],
  },
  {
    path: "/back",
    element: <Back />,
    children: [
      {
        path: "",
        element: <Navigate to="/back/provider/services" />,
      },
      {
        path: "provider",
        element: <Provider />,
        children: [
          {
            path: "",
            element: <Navigate to="/back/provider/services" />,
          },
          {
            path: "services",
            element: <Services />,
          },
          {
            path: "request",
            element: <RequestProvider />,
          },
          {
            path: "account",
            element: <AccountProvider />,
          },
        ],
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Navigate to="/back/admin/providers" />,
          },
          {
            path: "providers",
            element: <Providers />,
          },
          {
            path: "customer",
            element: <Customer />,
          },
          {
            path: "service",
            element: <Service />,
          },
          {
            path: "request",
            element: <RequestAdmin />,
          },
          {
            path: "account",
            element: <AccountAdmin />,
          },
        ],
      },
    ],
  },
  {
    path: "/authentication",
    element: <Authentication />,
    children: [
      {
        path: "",
        element: <Navigate to="/authentication/login" />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

const Router = () => {
  const router = useRoutes(routes);
  return <>{router}</>;
};

export default Router;
