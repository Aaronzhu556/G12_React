import React, { useEffect, useState ,Component} from "react";
import {Table, Space, Modal, Input, Button, Form, message} from "antd";
import "./Request.css";
import { getData } from "../../../../../util/api";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function Request() {
  const [messageApi, contextHolder] = message.useMessage();
  /* 对话框、弹窗 */
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // 弹窗里的数据
  const [modalData, setModalData] = useState();
  const showModal = (record) => {
    setOpen(true);
    debugger;
    setModalData(record);
    console.log(modalData);
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
      `/request/getallcontinuerequestbyuser?user_id=${userData.user_id}`
  ).then((data) => setFormData(data.res_object));
}
  // 请求Request数据
  useEffect(() => {
    requestData()
  }, [userData.user_id]);

  // useEffect(() => {
  //   setFormData()
  // }, []);

  const onWithdraw = (id) => {
    getData(`/request/withdrawrequest?request_id=${id}`).then(
      successWithdraw()
    ).finally(()=>{requestData()});

  };
  const successWithdraw=()=>{
    //message.success("Withdraw the request successfully!")
  }
  // Edit Form
  const onFinish = (values) => {
    // console.log(values);
    getData(
      `/request/updaterequestdescription?request_id=${modalData.request_id}&request_description=${values.request_description}`
    ).then(handleOk()).finally(()=>{
      requestData()
    });

    // getData(
    //     `/request/getallcontinuerequestbyuser?user_id=${userData.user_id}`
    // ).then((data) => setFormData(data.res_object));

  };

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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div
            className="table_action"
            onClick={() => onWithdraw(record.request_id)}
          >
            Withdraw
          </div>
          <div className="table_action" onClick={() => showModal(record)}>
            Edit Description
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className="request">
      {formData ? (
        <Table columns={columns} dataSource={formData} rowKey="request_id" />
      ) : (
        <p style={{ color: "gray" }}>No Data</p>
      )}
      {/* 对话框、弹窗 */}
      <Modal
        title="Edit Description"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          onFinish={onFinish}
          initialValues={modalData}
        >
          <Form.Item name="request_description" label="Description">
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
