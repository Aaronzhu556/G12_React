import { Button, Form, Input, Modal, Rate, Space, Table ,Upload,message} from "antd";
import React, { useEffect, useRef, useState, Component  }from "react";
import "./Services.css";
import { getData, postData } from "../../../../util/api";
import { UploadOutlined } from '@ant-design/icons';
import {produce} from "immer";



const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Services = () => {

  // 使用 useRef 保存请求体 body 的值
  const bodyRef = useRef({
    service_id: "",
    service_name: "",
    service_photo: "",
    service_price: "",
    service_area: "",
    service_available_time: "",
    service_status: "",
    service_description: "",
    service_category: "",
  });

  // 对话框、弹窗 - 修改服务数据
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const showModal = (record) => {
    // console.log(record);
    bodyRef.current = {
      service_id: record.service_id,
      service_name: record.service_name,
      service_photo: record.service_photo,
      service_price: record.service_price,
      service_area: record.service_area,
      service_available_time: record.service_available_time,
      service_status: record.service_status,
      service_description: record.service_description,
      service_category: record.service_category,
    };
    form.setFieldsValue({
      service_id: record.service_id,
      service_name: record.service_name,
      service_price: record.service_price,
      service_area: record.service_area,
      service_available_time: record.service_available_time,
      service_status: record.service_status,
      service_description: record.service_description,
      service_category: record.service_category,
    });
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    message.success("Successfully modified service information!")
    setTimeout(() => {
      setOpen(false);
      setOpen1(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const props = {
    name: 'file',
    action: 'http://localhost:8081/service/uploadservicephoto',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        console.log(info.file.response.res_object+"======")
        setBody1(produce((state) => {state.service_photo = info.file.response.res_object}));
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setOpen1(false);
  };

  // form data
  const [formData, setFormData] = useState();

  // 从本地获取用户信息
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userinfo")) || null
  );
  // console.log(userData);
  const getAllServiceByProvider=() =>{
    getData(
        `/service/getallservicebyprovider?provider_id=${userData.service_provider_id}`
    ).then((data) => setFormData(data.res_object));
  }
  useEffect(() => {
    getData(
      `/service/getallservicebyprovider?provider_id=${userData.service_provider_id}`
    ).then((data) => setFormData(data.res_object));
  }, [userData.service_provider_id]);

  // Edit Form Data
  const onFinish = (values) => {
    // console.log(values);
    const newBody = { ...bodyRef.current, ...values };
    postData("/service/updateservice", newBody).then(handleOk()).finally(()=>{
      getAllServiceByProvider();

    });
  };

  // 请求体 - 添加service
  const [body1, setBody1] = useState({
    service_name: "",
    service_photo: "",
    service_area: "",
    service_price: "",
    service_description: "",
    service_available_time:"",
    service_category: "",
    s_service_provider_id: userData.service_provider_id,
  });
  // 对话框、弹窗 - 添加服务数据
  const [open1, setOpen1] = useState(false);
  const showModal1 = () => {
    setOpen1(true);
  };
  // Add Form Data
  const onFinish1 = (values) => {
    // console.log(values);
    const result = postData("/service/addservice", { ...body1, ...values }).then((data)=>{
      if (parseInt(data.res_code)===200)   message.success("Service added successfully!");
      else if (parseInt(data.res_code)===201) message.info("Failed to add service!");
      else message.error("System error");
     // setBody1
    }).finally(()=>{
      getAllServiceByProvider()//后面应该关闭输入框
      setOpen1(false)
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "service_id",
      key: "service_id",
      width: 50,
    },
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Photo",
      dataIndex: "service_photo",
      key: "service_photo",
      render: (img) => <img className="table_img" src={img} alt="img" />,
    },
    {
      title: "Price",
      dataIndex: "service_price",
      key: "service_price",
      render: (price) => <p>£ {price}</p>,
    },
    {
      title: "Area",
      dataIndex: "service_area",
      key: "service_area",
    },
    {
      title: "Available Time",
      dataIndex: "service_available_time",
      key: "service_available_time",
    },
    {
      title: "Description",
      dataIndex: "service_description",
      key: "service_description",
    },
    {
      title: "Category",
      dataIndex: "service_category",
      key: "service_category",
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
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <div className="table_action" onClick={() => showModal(record)}>
            Edit
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className="provider_services">
      <Button type="primary" onClick={showModal1} style={{ marginBottom: 20 }}>
        Add Service
      </Button>
      <Table
        columns={columns}
        dataSource={formData}
        rowKey="service_id"
        scroll={{
          x: 1300,
        }}
      />
      <Modal
        title="Edit Service"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form {...layout} onFinish={onFinish} form={form}>

          <Form.Item name="service_name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="service_price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name="service_area" label="Area">
            <Input />
          </Form.Item>
          <Form.Item name="service_available_time" label="Available Time">
            <Input />
          </Form.Item>
          <Form.Item name="service_description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="service_category" label="Category">
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
      <Modal
        title="Add Service"
        open={open1}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form {...layout} onFinish={onFinish1} initialValues={body1}>
          <Upload {...props} name="service_photo">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <Form.Item name="service_name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="service_price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name="service_area" label="Area">
            <Input />
          </Form.Item>
          <Form.Item name="service_description" label="Description">
            <Input />
          </Form.Item>

          <Form.Item name="service_available_time" label="availableTime">
            <Input />
          </Form.Item>
          <Form.Item name="service_category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;
