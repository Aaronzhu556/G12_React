import { Rate, Space, Table, Tabs,message } from "antd";
import React, { useEffect, useState } from "react";
import {getData, postData} from "../../../../util/api";

const Request = () => {
  const [formData0, setFormData0] = useState();
  const [formData1, setFormData1] = useState();

  // 请求体
  const [body, setBody] = useState({
    queryInfo: "",
    pageSize: 1,
    pageNum: 5,
  });
  // useEffect(() => {
  //   getData("/request/getallgoodreview").then((data) =>
  //     setFormData0(data.res_object)
  //   );
  //   getData("/request/getallbadreview").then((data) =>
  //     setFormData1(data.res_object)
  //   );
  // });
  useEffect(() => {
    postData("/request/getallgoodreview", body).then((data) =>
        setFormData0(data.res_object)
    );
    getData("/request/getallbadreview").then((data) =>
        setFormData1(data.res_object)
    );
  }, [body]);
  const getAllGoodReview=()=>{
    postData("/request/getallgoodreview", body).then((data) =>
        setFormData0(data.res_object)
    );
  }
  const getAllBadReview=()=>{
    getData("/request/getallbadreview").then((data) =>
        setFormData1(data.res_object)
    );
  }
  // 删除请求
  const onDelete = (id) => {
    getData(`/request/deletebadreview?request_id=${id}`)
  }
  const onDeleteBad=(id)=>{
    getData(`/request/deletebadreview?request_id=${id}`).then((data)=>{
      if (parseInt(data.res_code)===200) message.success("Successfully deleted bad comments");
      else message.error("System errror");
    }).finally(()=>{
      getAllBadReview();
    })
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
      title: "User Name",
      dataIndex: ["user","user_name"],
      key: "user_name",
    },
    {
      title: "Service Name",
      dataIndex: ["service","service_name"],
      key: "service_name",
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
            onClick={() => onDeleteBad(record.request_id)}
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
      title: "User Name",
      dataIndex: ["user","user_name"],
      key: "user_name",
    },
    {
      title: "Service Name",
      dataIndex: ["service","service_name"],
      key: "service_name",
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
            onClick={() => onDeleteBad(record.request_id)}
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
