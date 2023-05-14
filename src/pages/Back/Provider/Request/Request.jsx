import React, { useEffect, useState } from "react";
import { getData} from "../../../../util/api";
import { Rate, Select, Space, Table } from "antd";


const Request = () => {
  // 下拉列表 - 更改用户状态
  const handleChange = (value, id) => {
    getData(`/request/updaterequeststatus?request_id=${id}&request_status=${value}`)
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "request_id",
      key: "request_id",
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Service Name",
      dataIndex: ["service", "service_name"],
      key: "service_name",
    },
    {
      title: "Status",
      dataIndex: "request_status",
      key: "request_status",
    },
    {
      title: "Review",
      dataIndex: "request_review",
      key: "request_review",
    },
    {
      title: "Rating",
      dataIndex: "service_rating",
      key: "service_rating",
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Rate disabled allowHalf defaultValue={record.service_rating} />
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "request_description",
      key: "request_description",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Select
        defaultValue={record.request_status}
        style={{
          width: 200,
        }}
        onChange={(value) => handleChange(value, record.request_id)}
        options={[
          {
            value: 'pending',
            label: 'pending',
          },
          {
            value: 'accepted',
            label: 'accepted',
          },
          {
            value: 'completed',
            label: 'completed',
          },
          {
            value: 'rejected',
            label: 'rejected',
          },
          {
            value: 'request further details',
            label: 'request further details',
          },
        ]}
      />
        </Space>
      ),
    },
  ];

  // 从本地获取用户信息
  const [userData] = useState(
    JSON.parse(localStorage.getItem("userinfo")) || null
  );
  // console.log(userData);

  // 表格数据
  const [formData, setFormData] = useState();
  useEffect(() => {
    getData(`/request/getallrequestbyprovider?provider_id=${userData.service_provider_id}`).then((data) =>
      setFormData(data.res_object)
    );
  }, [userData.service_provider_id]);

  return (
    <div id="provider_request">
      <Table columns={columns} dataSource={formData} rowKey="request_id" />
    </div>
  );
};

export default Request;
