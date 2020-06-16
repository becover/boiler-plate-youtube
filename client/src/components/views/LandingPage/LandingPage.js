import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Avatar } from "antd";
import Meta from "antd/lib/card/Meta";
import Axios from "axios";
import moment from "moment";
const { Title } = Typography;
function LandingPage() {
  const [video, setVideo] = useState([]);
  useEffect(() => {
    Axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideo(response.data.videos);
      } else {
        alert("비디오 가져오기를 실패 했습니다.");
      }
    });
  }, []);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title
        level={2}
        style={{ paddingBottom: "20px", borderBottom: "1px solid #ddd" }}
      >
        Recommended
      </Title>
      <Row gutter={[32, 16]} style={{ marginBottom: "20px" }}>
        {video.length > 0 &&
          video.map((video, index) => (
            <Col lg={6} md={8} xs={24} key={index}>
              <div style={{ position: "relative", marginBottom: "15px" }}>
                <a href={`/video/${video._id}`}>
                  <img
                    style={{ width: "100%" }}
                    src={`http://localhost:5000/${video.thumbnail}`}
                    alt="thumbnail"
                  />
                  <div className="duration">
                    <span>
                      {Math.floor(video.duration / 60)} :
                      {Math.floor(
                        video.duration - Math.floor(video.duration / 60) * 60
                      )}
                    </span>
                  </div>
                </a>
              </div>
              <Meta
                avatar={<Avatar src={video.writer.image} />}
                title={video.title}
                description=""
              />
              <span style={{ display: "block" }}>{video.writer.name}</span>
              <span style={{ marginLeft: "3rem" }}>{video.view} views</span> -
              <span>{moment(video.createAt).format("YYYY/MM/DD")}</span>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default LandingPage;
