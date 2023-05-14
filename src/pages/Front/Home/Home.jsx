import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Button, Input, Select } from "antd";
import { produce } from "immer";
import { postData } from "../../../util/api";

const Section = (props) => {
  return (
    <section className="section">
      <h1>{props.title}</h1>
      {props.children}
    </section>
  );
};

const Home = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const user_email = searchParams.get('user_email');
  console.log("================"+user_email);
  //const age = searchParams.get('age');
  const navigate = useNavigate();
  // 从本地获取用户信息
  const [userData, setUserData] = useState(
      JSON.parse(localStorage.getItem("userinfo")) || null
  );
  // 搜索请求体
  const [searchData, setSearchData] = useState({
    queryName: "",
    queryCategory: "",
    queryArea: "",
    pageSize: 1,
    pageNum: 5,
  });

  const handleCategorySelect = (value) => {
    setSearchData(
      produce((state) => {
        state.queryCategory = value;
      })
    );
  };

  const handleAreaSelect = (value) => {
    setSearchData(
      produce((state) => {
        state.queryArea = value;
      })
    );
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setSearchData(
      produce((state) => {
        state[name] = value;
      })
    );
  };
  // click search
  const [serviceData, setServiceData] = useState();
  const onSearch = () => {
    postData("/service/getallservice", searchData).then((data) =>
      setServiceData(data.res_object)
    );
  };

  // useEffect(() => {
  //   postData("/service/getallservice", searchData).then((data) =>
  //     setServiceData(data.res_object)
  //   );
  // }, [searchData]);
    useEffect(() => {
        onSearch();
    }, []);
  return (
    <div id="home">
      <h1 className="home_slogan">Find The Best Service</h1>

      <div className="home_searchbox">
        <Input
          placeholder="Service Name"
          name="queryName"
          onChange={onChange}
        />
        <Select
          style={{ flexShrink: 0, width: 200 }}
          onChange={handleCategorySelect}
          onClear={() =>
              setSearchData(
                  produce((state) => {
                      state.queryCategory = "";
                  }),
              )
              // onSearch();

          }
          allowClear
          placeholder="Category"
          options={[
            { value: "Cleaning", label: "Cleaning" },
            { value: "Babysitting", label: "Babysitting" },
            { value: "Pest Control", label: "Pest Control" },
            { value: "Plumbing", label: "Plumbing" },
            { value: "Electrical Repairs", label: "Electrical Repairs" },
            { value: "Beauty", label: "Beauty" },
          ]}
        />
        <Select
          style={{ flexShrink: 0, width: 150 }}
          onChange={handleAreaSelect}
          onClear={() =>
              setSearchData(
                  produce((state) => {
                      state.queryCategory = "";
                  }),
              )
              // onSearch();

          }
          allowClear
          placeholder="Area"
          options={[
            { value: "London", label: "London" },
            { value: "Bath", label: "Bath" },
            { value: "Southampton", label: "Southampton" },
            { value: "Manchester", label: "Manchester" },
            { value: "Leeds", label: "Leeds" },
          ]}
        />
        <Button type="primary" onClick={onSearch}>
          Search
        </Button>
      </div>

      {/* 显示服务商品区域 */}
      {serviceData ? (
        <div className="home_service_list">
          {serviceData.map((item, index) => (
            <div
              key={`home_service_list_${index + 1}`}
              className="home_service_item"
              onClick={() => navigate(`/details/${item.service_id}`)}
            >
              <div className="home_service_photo">
                <img src={item.service_photo} alt="LoginBg" />
              </div>
              <div className="home_service_text">
                <div className="home_service_name">{item.service_name}</div>
                <div className="home_service_price">£{item.service_price}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "red" }}>No Data</p>
      )}
    </div>
  );
};

export default Home;
