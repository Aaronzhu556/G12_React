import { Rate, Space, Table, Tabs,message } from "antd";
import React, { useEffect, useState } from "react";
import "./Providers.css";
import { getData, postData } from "../../../../util/api";

const Providers = () => {
  const [formData0, setFormData0] = useState();
  const [formData1, setFormData1] = useState();

  // 请求体
  const [body, setBody] = useState({
    queryInfo: "",
    pageSize: 1,
    pageNum: 5,
  });
  const getServiceProvider0=()=>{
    postData("/serviceprovider/getall0serviceprovider", body).then((data) =>
        setFormData0(data.res_object)
    );
  }
  const getServiceProvider1=()=>{
    getData("/serviceprovider/getall1serviceprovider").then((data) =>
        setFormData1(data.res_object)
    );
  }
  useEffect(() => {
    postData("/serviceprovider/getall0serviceprovider", body).then((data) =>
      setFormData0(data.res_object)
    );
    getData("/serviceprovider/getall1serviceprovider").then((data) =>
      setFormData1(data.res_object)
    );
  }, [body]);

  // delete
  const onDelete0 = (id) => {
    getData(`/serviceprovider/deleteserviceprovider?service_provider_id=${id}`).then((data)=>{
      if (parseInt(data.res_code)===200) message.success("Successfully deleted a invalid serviceProvider")
      else message.error("System error")

    }).finally(()=>{
      getServiceProvider0();
    });
  };
  const onDelete1 = (id)=>{
    getData(`/serviceprovider/deleteserviceprovider?service_provider_id=${id}`).then((data)=>{
      if (parseInt(data.res_code)===200) message.success("Successfully deleted serviceProvider with low rating");
      else message.error("System error");
    }).finally(()=>{
      getServiceProvider1();
    });
  }
  // Approve
  const onApprove = (id) => {
    getData(`/admin/updateserviceproviderstatus?service_provider_status=1&service_provider_id=${id}`).then((data)=>{
      if (parseInt(data.res_code)===200) message.success("The serviceProvider has been approved");
      else  message.error("System error")
    }).finally(()=>{
      getServiceProvider0();
    })
  }
  

  // table column0
  const columns0 = [
    {
      title: "ID",
      dataIndex: "service_provider_id",
      key: "service_provider_id",
    },
    {
      title: "Name",
      dataIndex: "service_provider_name",
      key: "service_provider_name",
    },
    {
      title: "Address",
      dataIndex: "service_provider_address",
      key: "service_provider_address",
    },
    {
      title: "Email",
      dataIndex: "service_provider_email",
      key: "service_provider_email",
    },
    {
      title: "Description",
      dataIndex: "service_provider_description",
      key: "service_provider_description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div className="table_action" onClick={() => onApprove(record.service_provider_id)}>Approve</div>
          <div
            className="table_action"
            onClick={() => onDelete0(record.service_provider_id)}
          >
            Reject
          </div>
        </Space>
      ),
    },
  ];
  // table column1
  const columns1 = [
    {
      title: "ID",
      dataIndex: "service_provider_id",
      key: "service_provider_id",
    },
    {
      title: "Name",
      dataIndex: "service_provider_name",
      key: "service_provider_name",
    },
    {
      title: "Address",
      dataIndex: "service_provider_address",
      key: "service_provider_address",
    },
    {
      title: "Email",
      dataIndex: "service_provider_email",
      key: "service_provider_email",
    },
    {
      title: "Description",
      dataIndex: "service_provider_description",
      key: "service_provider_description",
    },
    {
      title: "Rating",
      dataIndex: "service_provider_rating",
      key: "service_provider_rating",
      render: (_, record) => (
        <Space size="middle">
          <Rate disabled allowHalf defaultValue={record.service_provider_rating} />
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div
            className="table_action"
            onClick={() => onDelete1(record.service_provider_id)}
          >
            Delete
          </div>
        </Space>
      ),
    },
  ];

  // tabs
  const items = [
    {
      key: "1",
      label: `Not Approved`,
      children: (
        <Table columns={columns0} dataSource={formData0} rowKey="service_provider_id" />
      ),
    },
    {
      key: "2",
      label: `Approved`,
      children: (
        <Table columns={columns1} dataSource={formData1} rowKey="service_provider_id" />
      ),
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items}/>
    </div>
  );
};

export default Providers;
