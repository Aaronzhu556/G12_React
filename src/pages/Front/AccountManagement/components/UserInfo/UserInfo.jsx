import React, { useState ,Component} from "react";
import "./UserInfo.css";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { produce } from "immer";
import { postData } from "../../../../../util/api";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function UserInfo() {
  // 对话框、弹窗
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
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

  // 上传图片
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);

      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      console.log(info.file.response.res_code)
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);

        setBody(produce((state) => {state.user_photo = info.file.response.res_object}));
      });
    }
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // 从本地获取用户信息
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userinfo")) || null
  );
  const updateUserInfo = ()=>{
    let userInfo = JSON.parse(localStorage.getItem("userinfo")) || {};
    setUserData({...userInfo})
  }


  // 请求体
  const [body, setBody] = useState({
    user_name: userData.user_name,
    user_password: userData.user_password,
    user_photo: userData.user_photo,
    user_id: userData.user_id,
  });

  const onChange = (e) => {
    const {value, name} = e.target;
    setBody(produce((state) => {state[name] = value}));
  };

  // submit form
  const onFinish = (values) => {
    // console.log(values);
    postData("/user/updateuser", body);
    handleOk();
    localStorage.setItem(
      "userinfo",
      JSON.stringify({ ...userData, ...values,user_photo:imageUrl })
    );
    updateUserInfo()
  };

  return (
    <div className="userinfo">
      <img className="userinfo_photo" src={userData.user_photo} alt="" />
      <h2>{userData.user_name || "null"}</h2>
      <p className="userinfo_text">Email: {userData.user_email || "null"}</p>

      <Button type="primary" onClick={showModal}>
        Edit Info
      </Button>

      {/* 对话框、弹窗 */}
      <Modal
        title="Edit Info"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="modal_item">
          <Upload
            name="user_photo"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:8081/user/uploaduserphoto"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <Form
          {...layout}
          onFinish={onFinish}
          initialValues={body}
        >
          <Form.Item name="user_name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="user_password" label="Password">
            <Input.Password />
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
