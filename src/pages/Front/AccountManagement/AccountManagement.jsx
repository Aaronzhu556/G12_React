import React from "react";
import "./AccountManagement.css";
import History from "./components/History/History";
import UserInfo from "./components/UserInfo/UserInfo";
import Request from "./components/Request/Request";
import { Tabs } from "antd";

const items = [
  {
    key: "1",
    label: `Continue Request`,
    children: <Request />,
  },
  {
    key: "2",
    label: `Complete Request`,
    children: <History />,
  },
];

export default function AccountManagement() {
  return (
    <div id="accountmangement">
      <UserInfo />

      <Tabs
        className="accountmangement_tabs"
        defaultActiveKey="1"
        items={items}
      />
    </div>
  );
}
