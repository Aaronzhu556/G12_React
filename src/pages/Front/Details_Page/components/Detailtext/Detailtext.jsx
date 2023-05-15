import React, { useEffect, useState } from "react";
import "./Detailtext.css";
import { useNavigate, useParams } from "react-router-dom";
import { getData, postData } from "../../../../../util/api";
import {Button, Rate, message, Modal, Form,Input ,Popconfirm } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },

};
const { TextArea } = Input;
export default function Detailtext() {
  // 获取服务ID
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState();
  useEffect(() => {
    getData(`/service/getservicebyid?service_id=${serviceId}`).then((data) => {
      setServiceData(data.res_object);
    });
  }, [serviceId]);

  // 从本地获取用户信息
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userinfo")) || null
  );
  console.log(userData)
  const confirm = (e) => {
    console.log(e);
    setBody({
      request_service_id: serviceId,
      request_user_id: userData.user_id,
      request_description: e.request_description,
    })
    console.log(body)
    toRequestPage();
  };
  const cancel = (e) => {
    console.log(e);
    message.info('You can retype');
  };
  // 请求体
  const [body, setBody] = useState({
    request_service_id: serviceId,
    request_user_id: userData.user_id,
    request_description: "",
  });
  //定义窗口状态
  const [open,setOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  // 跳转request页面
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const showModal = (value)=>{
    setOpen(true);
    //继续进行业务逻辑
    setModalData(value);
  }
  const onFinish=(value)=>{
    // setBody(prevBody => ({
    //   ...prevBody,
    //   request_description: value.request_description,
    // }));
    setBody({
      request_service_id: serviceId,
      request_user_id: userData.user_id,
      request_description: value.request_description,
    })
    console.log(body)
    //toRequestPage();

  }
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    message.success("description added successfully")
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
    toRequestPage(); //转到个人页面

  };
  const toRequestPage = () => {
    postData("/request/addrequest", body).then((data) => {
      messageApi.open({
        type: "success",
        content: "Reservation success!",
      });
      setTimeout(() => {
        navigate("/account_management");
      }, 1000);
    });
  };

  return (
    <>
      {contextHolder}
      <div className="dpage-text">
        {serviceData && (
          <>
            <h2>{serviceData.service_name}</h2>
            <p>{serviceData.service_description}</p>
            <h4>Rating:</h4>
            <Rate disabled allowHalf defaultValue={serviceData.service_rating} />
            <h4>Category:</h4>
            <p>{serviceData.service_category}</p>
            <h4>Available Time:</h4>
            <p>{serviceData.service_available_time}</p>
            <h4>Available Area:</h4>
            <p>{serviceData.service_area}</p>
            <h4>Price:</h4>
            <p>£{serviceData.service_price}</p>
            <Button
              style={{ marginTop: 20 }}
              type="primary"
              onClick={showModal}
            >
              Reservation
            </Button>
          </>
        )}

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
              <Popconfirm
                  title="add request description"
                  description="Are you sure to add the description?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
              >
                <Button type="primary" htmlType="submit">
                  Add description
                </Button>
              </Popconfirm>

            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
