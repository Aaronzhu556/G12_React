import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { postData } from "../../../../util/api";


const Service = () => {
  // 请求体
  const [body, setBody] = useState({
    queryName: "",
    queryCategory: "",
    queryArea: "",
    pageSize: 1,
    pageNum: 5,
  });

  // 表格数据
  const [formData, setFormData] = useState();
  useEffect(() => {
    postData("/service/getallservice", body).then((data) =>
      setFormData(data.res_object)
    );
  }, [body]);
  const columns = [
    {
      title: "ID",
      dataIndex: "service_id",
      key: "service_id",
    },
    {
      title: "Name",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Photo",
      dataIndex: "service_photo",
      key: "service_photo",
      render: (img) => <img className="table_img" src={img} alt="img"/>,
    },
    {
      title: "Price",
      dataIndex: "service_price",
      key: "service_price",
    },
    {
      title: "Area",
      dataIndex: "service_area",
      key: "service_area",
    },
    {
      title: "description",
      dataIndex: "service_description",
      key: "service_description",
    },
  ];

  return (
    <div id="admin_service">
      <Table columns={columns} dataSource={formData} rowKey="service_id" />
    </div>
  );
};

export default Service;
