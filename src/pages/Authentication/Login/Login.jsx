import React, { useState,Component  } from "react";
import {GoogleOutlined, GooglePlusOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import { Button, Form, Input, Radio, message } from "antd";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { getData, postData } from "../../../util/api";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [formItemName, setFormItemName] = useState({});
  const [refresh, setRefresh] = useState(false); // 定义状态
  // 当role改变时
  const onRoleChange = (e) => {
    let data;
    switch (e.target.value) {
      case "provider":
        data = {
          service_provider_email: "",
          service_provider_password: "",
        };
        break;
      case "customer":
        data = { user_email: "", user_password: "" };
        break;
      case "admin":
        data = { admin_name: "", admin_password: "" };
        break;
      default:
        data = {};
    }
    setFormItemName(Object.keys(data));
  };

  // login
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    let api, getInfoAPI;
    switch (values.role) {
      case "customer":
        api = "/user/userlogin";
        getInfoAPI = "/user/getuserbyemail?user_email=";
        break;
      case "provider":
        api = "/serviceprovider/serviceproviderlogin";
        break;
      case "admin":
        api = "/admin/adminlogin";
        break;
      default:
        api = "";
    }
    postData(api, values).then((data) => {
      if (data.res_code === "200") {
        if (values.role === "customer") {
          getData(`${getInfoAPI}${values[formItemName[0]]}`).then((data) => {
            let userInfo = data.res_object;
            console.log("==========")
            console.log(userInfo)
            userInfo["role"] = values.role;
            localStorage.setItem("userinfo", JSON.stringify(userInfo));
            message.success("User login successful")
            navigate("/");
          });
        } else {
          let userInfo = data.res_object;
          userInfo["role"] = values.role;
          localStorage.setItem("userinfo", JSON.stringify(userInfo));
          message.success("Service Provider login successful")
        }
        navigate("/");
        //this.forceUpdate()
        //forceUpdate();
      } else if (data.res_code === "201") {
        messageApi.open({
          type: "error",
          content: "Wrong account or password!",
        });
      } else{
        messageApi.open({
          type: "error",
          content: "Account isn't exist Or your account has not been approved",
        });
      }
    });
  };
  // Google Login
  const onGoogleLogin = () => {
    // Write your Google Login Logic here
    //api:http://localhost:8081/oauth/login/Google
   // getData(`/oauth/login/Google`);
   //  axios.get('http://localhost:8081/oauth/login/Google')
   //      .then(response => {
   //        console.log(response.data);
   //      })
   //      .catch(error => {
   //        console.log(error);
   //      });
    window.location.href = 'http://localhost:8081/oauth/login/Google';
    console.log("Google Login Clicked");
  };
  return (
    <>
      {contextHolder}
      <Form
        name="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h1>Login</h1>

        <Form.Item
          name="role"
          rules={[
            {
              required: true,
              message: "Please choose your role!",
            },
          ]}
        >
          <Radio.Group name="role" onChange={onRoleChange}>
            <Radio.Button value="admin">Admin</Radio.Button>
            <Radio.Button value="provider">Provider</Radio.Button>
            <Radio.Button value="customer">Customer</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name={formItemName[0]}
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email / Name"
          />
        </Form.Item>

        <Form.Item
          name={formItemName[1]}
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

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          {/*<Button icon={<GooglePlusOutlined />} onClick={onGoogleLogin()}></Button>*/}
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          Or <Link to="/authentication/register">Register</Link>
        </div>
      </Form>
    </>
  );
};

export default Login;
