import React, { useEffect, useState } from "react";
import { Row, Col, List } from "antd";
import Axios from "axios";
import SideVideo from "./Section/SideVideo";
import Subscribe from "./Section/Subscribe";
import Comment from "./Section/Comment";
import LikeDislikes from "./Section/LikeDislikes";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId };
  const [videoDetail, setVideoDetail] = useState([]);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    Axios.post(`/api/video/getVideoDetail`, variable).then((response) => {
      if (response.status === 200) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("비디오 정보를 가져오는데 실패했습니다");
      }
    });

    Axios.post("/api/comment/getComments", variable).then((response) => {
      if (response.status === 200) {
        setComments(response.data.comments);
      } else {
        alert("코멘트 정보를 가져오는데 실패했습니다");
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  let subscribe;
  if (videoDetail.writer) {
    subscribe = videoDetail.writer._id !== localStorage.getItem("userId") && (
      <Subscribe
        userTo={videoDetail.writer._id}
        userFrom={localStorage.getItem("userId")}
      />
    );
  }

  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
          <video
            style={{ width: "100%" }}
            src={`http://localhost:5000/${videoDetail.filePath}`}
            controls
          />
          {videoDetail.writer && (
            <List.Item
              actions={[
                <LikeDislikes
                  video
                  userId={localStorage.getItem("userId")}
                  videoId={videoId}
                />,
                subscribe,
              ]}
            >
              <List.Item.Meta
                avatar={videoDetail.writer?.image}
                title={videoDetail.writer?.name}
                description={videoDetail?.description}
              />
            </List.Item>
          )}
          <Comment
            refreshFunction={refreshFunction}
            commentList={Comments}
            postId={videoId}
          />
        </div>
      </Col>
      <SideVideo />
      <Col lg={6} xs={24}></Col>
    </Row>
  );
}

export default VideoDetailPage;
