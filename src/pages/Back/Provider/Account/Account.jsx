import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import "./Account.css";
import TextArea from "antd/es/input/TextArea";
import { postData } from "../../../../util/api";
import { produce } from "immer";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Account = () => {
  // 从本地获取用户信息
  const [userData] = useState(
    JSON.parse(localStorage.getItem("userinfo")) || null
  );

  // 请求体
  const [body, setBody] = useState({
    service_provider_id: userData.service_provider_id,
    service_provider_name: userData.service_provider_name,
    service_provider_password: userData.service_provider_password,
    service_provider_address: userData.service_provider_address,
    service_provider_description: userData.service_provider_description,
  });
  // console.log(body);

  // submit form data
  const onFinish = (values) => {
    // console.log(values);
    postData("/serviceprovider/updateserviceprovider", body).then((data) => {
      localStorage.setItem("userinfo", JSON.stringify(data.res_object));
      console.log(data.res_object);
    });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setBody(
      produce((state) => {
        state[name] = value;
      })
    );
  };

  return (
    <div id="provider_account">
      <h1>My Account</h1>
      <Form
        {...layout}
        name="account-form"
        onFinish={onFinish}
        style={{
          width: 600,
        }}
        initialValues={userData}
      >
        <Form.Item name="service_provider_name" label="Name">
          <Input value={body.service_provider_name} onChange={onChange} />
        </Form.Item>
        <Form.Item
          name="service_provider_email"
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item name="service_provider_password" label="Password">
          <Input.Password
            name="service_provider_password"
            value={body.service_provider_password}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item name="service_provider_address" label="Address">
          <Input
            name="service_provider_address"
            value={body.service_provider_address}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item name="service_provider_description" label="Description">
          <TextArea
            name="service_provider_description"
            value={body.service_provider_description}
            onChange={onChange}
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
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
    </div>
  );
};

export default Account;
