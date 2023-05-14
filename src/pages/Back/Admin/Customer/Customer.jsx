import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { postData } from "../../../../util/api";

const columns = [
  {
    title: "ID",
    dataIndex: "user_id",
    key: "user_id",
  },
  {
    title: "User Name",
    dataIndex: "user_name",
    key: "user_name",
  },
  {
    title: "Email",
    dataIndex: "user_email",
    key: "user_email",
  },
];

const Customer = () => {
  // 请求体
  const [body, setBody] = useState({
    queryInfo: "",
    pageSize: 1,
    pageNum: 5,
  });

  // 表格数据
  const [formData, setFormData] = useState();
  useEffect(() => {
    postData("/user/getalluser", body).then((data) =>
      setFormData(data.res_object)
    );
  }, [body]);

  return (
    <div id="admin_customer">
      <Table columns={columns} dataSource={formData} rowKey="user_id" />
    </div>
  );
};

export default Customer;
