import React, { useEffect, useState } from "react";
import "./Detailtext.css";
import { useNavigate, useParams } from "react-router-dom";
import { getData, postData } from "../../../../../util/api";
import { Button, Rate, message } from "antd";

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

  // 请求体
  const [body, setBody] = useState({
    request_service_id: serviceId,
    request_user_id: userData.user_id,
    request_description: "",
  });

  // 跳转request页面
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
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
            <h1>{serviceData.service_name}</h1>
            <p>{serviceData.service_description}</p>
            <Rate disabled allowHalf defaultValue={serviceData.service_rating} />
            <h3>Category:</h3>
            <p>{serviceData.service_category}</p>
            <h3>Available Time:</h3>
            <p>{serviceData.service_available_time}</p>
            <h3>Available Area:</h3>
            <p>{serviceData.service_area}</p>
            <h2>£{serviceData.service_price}</h2>
            <Button
              style={{ marginTop: 20 }}
              type="primary"
              onClick={toRequestPage}
            >
              Reservation
            </Button>
          </>
        )}
      </div>
    </>
  );
}
