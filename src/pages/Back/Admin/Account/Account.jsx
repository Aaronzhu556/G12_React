import React, { useState } from "react";
import { Button, Form, Input ,message} from "antd";
import "./Account.css";
import { getData } from "../../../../util/api";

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
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userinfo")) || null
  );
  console.log(userData);

  // submit form
  const onFinish = (values) => {
    getData(`/admin/updateadminpassword?admin_id=${userData.admin_id}&admin_password=${values.admin_password}`)
      .then(data => {
        localStorage.setItem("userinfo", JSON.stringify({...userData, ...values}));
        if (parseInt(data.res_code)===200) message.success("Administrator information updated successfully");
        else message.error("System error");
      })
  };

  return (
    <div id="admin_account">
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
        <Form.Item name="admin_name" label="Name">
          <Input disabled />
        </Form.Item>
        <Form.Item name="admin_password" label="Password">
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
    </div>
  );
};

export default Account;
