import { Rate, Space, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { getData } from "../../../../util/api";

const Request = () => {
  const [formData0, setFormData0] = useState();
  const [formData1, setFormData1] = useState();

  // 请求体
  const [body, setBody] = useState({
    queryInfo: "",
    pageSize: 1,
    pageNum: 5,
  });
  useEffect(() => {
    getData("/request/getallgoodreview").then((data) =>
      setFormData0(data.res_object)
    );
    getData("/request/getallbadreview").then((data) =>
      setFormData1(data.res_object)
    );
  });

  // 删除请求
  const onDelete = (id) => {
    getData(`/request/deleterequest?request_id=${id}`)
  }

  // console.log(formData);

  // table column0
  const columns0 = [
    {
      title: "ID",
      dataIndex: "request_id",
      key: "request_id",
    },
    {
      title: "User Review",
      dataIndex: "request_review",
      key: "request_review",
    },
    {
      title: "Description",
      dataIndex: "request_description",
      key: "request_description",
    },
    {
      title: "Rating",
      dataIndex: "request_rating",
      key: "request_rating",
      render: (_, record) => (
        <Space size="middle">
          <Rate disabled allowHalf defaultValue={record.request_rating} />
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div
            className="table_action"
            onClick={() => onDelete(record.request_id)}
          >
            Delete
          </div>
        </Space>
      ),
    },
  ];
  // table column1
  const columns1 = [
    {
      title: "ID",
      dataIndex: "request_id",
      key: "request_id",
    },
    {
      title: "User Review",
      dataIndex: "request_review",
      key: "request_review",
    },
    {
      title: "Description",
      dataIndex: "request_description",
      key: "request_description",
    },
    {
      title: "Rating",
      dataIndex: "request_rating",
      key: "request_rating",
      render: (_, record) => (
        <Space size="middle">
          <Rate disabled allowHalf defaultValue={record.request_rating} />
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div
            className="table_action"
            onClick={() => onDelete(record.request_id)}
          >
            Delete
          </div>
        </Space>
      ),
    },
  ];

  // tabs
  const items = [
    {
      key: "0",
      label: `Good Review`,
      children: (
        <Table
          columns={columns0}
          dataSource={formData0}
          rowKey="request_id"
        />
      ),
    },
    {
      key: "1",
      label: `Bad Review`,
      children: (
        <Table
          columns={columns1}
          dataSource={formData1}
          rowKey="request_id"
        />
      ),
    },
  ];

  return (
    <div id="admin_request">
      <Tabs defaultActiveKey="0" items={items} />
    </div>
  );
};

export default Request;
