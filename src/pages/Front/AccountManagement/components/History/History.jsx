import React, { useEffect, useState } from "react";
import {Table, Space, Form, Input, Button, Modal, Rate, message,Empty } from "antd";
import "./History.css";
import { getData } from "../../../../../util/api";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function History() {
  // Edit Form Data
  const [messageApi, contextHolder] = message.useMessage();
  const [requestId, setRequestId] = useState();
  const onFinish = (values) => {
    // console.log(values);
    getData(
      `/request/addrequestreview?request_id=${requestId}&request_review=${values.request_review}&request_rating=${values.request_rating}`
    ).then(handleOk()).finally(()=>{
      requestData()
    });
  };

  // 删除request
  const onDelete = (id) => {
    console.log(id);
    getData(`/request/deleterequest?request_id=${id}`).then((data) =>
        {
          if (parseInt(data.res_code)===200) message.success("Successfully deleted historical orders")
          else if (parseInt(data.res_code)===201) message.info("Failed to delete historical orders")
          else message.error("System error")
        }
    ).finally(()=>{requestData()})
  };

  // 对话框、弹窗 - 修改服务数据
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = (id) => {
    setRequestId(id);
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  // 从本地获取用户信息
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userinfo")) || null
  );

  // request form data
  const [formData, setFormData] = useState();
  const requestData = ()=>{
    getData(
        `/request/getallcompletedrequestbyuser?user_id=${userData.user_id}`
    ).then((data) => setFormData(data.res_object));
  }
  // 请求Request数据
  useEffect(() => {
    requestData()
  }, [userData.user_id]);

  const columns = [
    {
      title: "Request ID",
      dataIndex: "request_id",
      key: "request_id",
    },
    {
      title: "Service Name",
      dataIndex: ["service", "service_name"],
      key: "service_name",
    },
    {
      title: "Request Description",
      dataIndex: "request_description",
      key: "request_description",
    },
    {
      title: "Status",
      key: "request_status",
      dataIndex: "request_status",
    },
    {
      title: "Review",
      key: "request_review",
      dataIndex: "request_review",
    },
    {
      title: "Rating",
      key: "request_rating",
      dataIndex: "request_rating",
      render: (_, record) => (
        <Space size="middle" key={record.request_rating}>
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
          <div className="table_action" onClick={() => showModal(record.request_id)}>Review</div>
        </Space>
      ),
    },
  ];
  return (
    <div className="history">
      {formData ? (
        <Table columns={columns} dataSource={formData} rowKey="request_id" />
      ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <Modal
        title="Edit Service"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form {...layout} onFinish={onFinish}>
          <Form.Item name="request_review" label="Review">
            <Input />
          </Form.Item>
          <Form.Item name="request_rating" label="Rating">
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
