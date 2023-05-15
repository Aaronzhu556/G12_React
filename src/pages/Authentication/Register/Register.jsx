import { BulbOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Radio, message } from "antd";
import Form from "antd/es/form/Form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { getData, postData } from "../../../util/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const navigate = useNavigate();

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    let api;
    switch (values.role) {
      case "customer":
        api = "/user/adduser";
        break;
      case "provider":
        api = "/serviceprovider/addserviceprovider";
        break;
      default:
        api = "";
    }
    postData(api, values).then((data) => {
      if (data.res_code === "200") {
        messageApi.open({
          type: "success",
          content: "Registered successfully!",
        });
        navigate("/authentication/login");
      } else if (data.res_code === "201") {
        messageApi.open({
          type: "error",
          content: "Validation code error!",
        });
      } else if (data.res_code === "202") {
        messageApi.open({
          type: "error",
          content: "User registration failed!",
        });
      }
    });
  };

  const [messageApi, contextHolder] = message.useMessage();
  // 获取验证码
  const getCode = () => {
    if (!email) {
      messageApi.open({
        type: "warning",
        content: "Please Input Email!",
      });
      return;
    }
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 3000);
    getData(`/user/getuserverificationcode?user_email=${email}`);
  };

  // 当role改变时
  const [formItemName, setFormItemName] = useState({});
  const onRoleChange = (e) => {
    let data;
    switch (e.target.value) {
      case "provider":
        data = {
          service_provider_name: "",
          service_provider_email: "",
          service_provider_password: "",
          service_provider_code: "",
        };
        break;
      case "customer":
        data = {
          user_name: "",
          user_email: "",
          user_password: "",
          user_code: "",
        };
        break;
      default:
        data = {};
    }
    setFormItemName(Object.keys(data));
  };

  return (
    <>
      {contextHolder}
      <Form
        name="register-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h1>Register</h1>

        <Form.Item
          name="role"
          rules={[
            {
              required: true,
              message: "Please choose your role!",
            },
          ]}
        >
          <Radio.Group onChange={onRoleChange}>
            <Radio.Button value="provider">Provider</Radio.Button>
            <Radio.Button value="customer">Customer</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name={formItemName[0]}
          rules={[
            {
              required: true,
              message: "Please input your User Name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="User Name"
          />
        </Form.Item>

        <Form.Item
          name={formItemName[1]}
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name={formItemName[2]}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name={formItemName[3]}
          rules={[
            {
              required: true,
              message: "Please input your Verification Code!",
            },
          ]}
        >
          <div className="register_flex">
            <Input
              prefix={<BulbOutlined className="site-form-item-icon" />}
              placeholder="Verification Code"
              className="register_flex_left"
            />
            <Button onClick={getCode} disabled={buttonDisabled}>
              {buttonDisabled ? "After 3s" : "Get Code"}
            </Button>
            {contextHolder}
          </div>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register
          </Button>
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          Or <Link to="/authentication/login">Login</Link>
        </div>
      </Form>
    </>
  );
};

export default Register;
