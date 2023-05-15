import React, { useEffect, useState } from "react";
import {Card, Avatar, Rate, Empty} from "antd";
import "./Comments.css";
import { useParams } from "react-router-dom";
import { getData } from "../../../../../util/api";
const { Meta } = Card;

export default function Comments() {

  // 获取服务ID
  const { serviceId } = useParams();

  // // 获取服务评论
  const [commentData, setCommentData] = useState();
  useEffect(() => {
    getData(`/request/getallrequestuserinfo?service_id=${serviceId}`).then((data) => {
      setCommentData(data.res_object)
      console.log(data);
    });
  }, [serviceId]);

  return (
    <>
      {commentData ? (
        commentData.map((item) => {
          return (
            <Card className="commentsItem" key={`commentsItem-${item.request_service_id}`}>
              <Meta
                avatar={<Avatar src={item.user.user_photo} size={36} />}
                title={item.user.user_name}
                description={
                  <span>
                    <Rate
                      style={{ zoom: 0.8 }}
                      disabled
                      defaultValue={item.request_rating}
                    />
                  </span>
                }
              ></Meta>
              <div style={{ marginLeft: "7.5%", marginTop: "2%", maxWidth: "90%" }}>
                <p style={{ marginBottom: "2%" }}>{item.request_review}</p>
              </div>
            </Card>
          );
        })
      ) :   <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </>
  );
}
