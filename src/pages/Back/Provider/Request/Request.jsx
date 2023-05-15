import React, { useEffect, useState } from "react";
import { getData} from "../../../../util/api";

import {message, Rate, Select, Space, Table, Tag, Modal, Form, Input, Button,Empty} from "antd";
import { SmallDashOutlined,  } from '@ant-design/icons';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const { TextArea } = Input;
const Request = () => {
  // 下拉列表 - 更改用户状态
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);//定义一个弹窗
  // 弹窗里的数据
  const [modalData, setModalData] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleChange = (value, id) => {
    getData(`/request/updaterequeststatus?request_id=${id}&request_status=${value}`).then((data)=>{
      if (parseInt(data.res_code)===200) message.success("The request status has been modified successfully");
      else if (parseInt(data.res_code)===201) message.info("Request state modification failed");
      else message.error("System error")
    }).finally(()=>{
      getAllRequestByProvider();
    })
  };

  const onFinish = (values) => {
    // console.log(values);
    getData(
        `/request/updaterequestdescription?request_id=${modalData.request_id}&request_description=${values.request_description}`
    ).then(handleOk()).finally(()=>{
      getAllRequestByProvider()
    });



  };
  const showModal=(value)=>{
    setOpen(true);//打开弹窗
    setModalData(value);//把数据set进去
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    message.success("description modified successfully")
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };


  const { Column, ColumnGroup } = Table;
  const columns = [
    {
      title: "ID",
      dataIndex: "request_id",
      key: "request_id",
    },
    {
      title: "User Name",
      dataIndex: ["user","user_name"],
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
      render:(_, record)=>{
        let color = ""
        if (record.request_status==="pending") color="processing";
        else if (record.request_status==="completed") color="success";
        else if (record.request_status==="reject") color="error";
        else if (record.request_status==="accept") color="default";
        else color="warning";
        return <Tag color={color}>{record.request_status}</Tag>
      }
    },
    {
      title: "Review",
      dataIndex: "request_review",
      key: "request_review",
      render:(_,record)=>{
        if (record.request_review===""){
          return   <SmallDashOutlined />
        }else return <span>{record.request_review}</span>;
      }
    },
    {
      title: "Rating",
      dataIndex: "request_rating",
      key: "request_rating",
      width: 200,

      render:(_,record) =>{
        if (record.request_rating===0){
          return   <SmallDashOutlined />
        }
        else return <Space size="middle">
              <Rate disabled allowHalf defaultValue={record.request_rating} />
        </Space>
      }
    },
    {
      title: "Description",
      dataIndex: "request_description",
      key: "request_description",
    },
    {
      title: "UpdateStatus",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Select
        defaultValue={record.request_status}
        style={{
          width: 150,
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
          <Space size="middle">
            <div className="table_action" onClick={() => showModal(record)}>edit</div>
          </Space>
      ),
    },
  ];

  // 从本地获取用户信息
  const [userData] = useState(
    JSON.parse(localStorage.getItem("userinfo")) || null
  );
  // console.log(userData);
  const getAllRequestByProvider=()=>{
    getData(`/request/getallrequestbyprovider?provider_id=${userData.service_provider_id}`).then((data) =>
        setFormData(data.res_object)
    );
  };
  // 表格数据
  const [formData, setFormData] = useState();
  useEffect(() => {
    getData(`/request/getallrequestbyprovider?provider_id=${userData.service_provider_id}`).then((data) =>
      setFormData(data.res_object)
    );
  }, [userData.service_provider_id]);
  // useEffect(() => {
  //   getData(`/request/getallrequestbyprovider?provider_id=${userData.service_provider_id}`).then((data) =>
  //       setFormData(data.res_object)
  //   );
  // }, [formData]);//监听整体
  return (
    <div id="provider_request">
      <Table columns={columns} dataSource={formData} rowKey="request_id" >
      </Table>

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
            <TextArea rows={6} />
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
};

export default Request;
