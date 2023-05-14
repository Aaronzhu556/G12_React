import React, { useEffect, useState } from "react";
import "./Detailspage.css";
import Detailtext from "./components/Detailtext/Detailtext";
import Comments from "./components/Comments/Comments";
import { useParams } from "react-router-dom";
import { getData } from "../../../util/api";

function Detailspage() {
  const onChange = (key) => {
    console.log(key);
  };

  // 获取服务ID
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState();
  useEffect(() => {
    getData(`/service/getservicebyid?service_id=${serviceId}`).then((data) => {
      setServiceData(data.res_object);
    });
  }, [serviceId]);


  return (
    <div className="detailspage">
      <div className="product_detail">
        <div className="product_detail_photo">
          {serviceData && <img src={serviceData.service_photo} alt="LoginBg" />}
        </div>
        <div className="product_detail_text">
          <Detailtext />
        </div>
      </div>

      <Comments/>
    </div>
  );
}

export default Detailspage;
