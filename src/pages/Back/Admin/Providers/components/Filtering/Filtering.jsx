import React from "react";
import { Cascader, DatePicker, Form, Input, Select, Button } from "antd";
import "./Filtering.css";
import { Card } from "antd";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Filtering() {
  const [form] = Form.useForm();

  const [componentSize, setComponentSize] = React.useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card title="Filtering" className="back-pro-filter">
      <Form
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 400,
        }}
      >
        <Form.Item label="Registration time:">
          <DatePicker />
        </Form.Item>
        <Form.Item label="City:">
          <Select
            defaultValue="London"
            onChange={handleChange}
            options={[
              {
                value: "london",
                label: "London",
              },
              {
                value: "southampton",
                label: "Southampton",
              },
              {
                value: "bath",
                label: "Bath",
              },
              {
                value: "birmingham",
                label: "Birmingham",
              },
              {
                value: "bradford",
                label: "Bradford",
              },
              {
                value: "bristol",
                label: "Bristol",
              },
              {
                value: "cambridge",
                label: "Cambridge",
              },
              {
                value: "chester",
                label: "Chester",
              },
              {
                value: "coventry",
                label: "Coventry",
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item label="Type">
          <Cascader
            options={[
              {
                value: "zhejiang",
                label: "Zhejiang",
                children: [
                  {
                    value: "hangzhou",
                    label: "Hangzhou",
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Provider ID:">
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
