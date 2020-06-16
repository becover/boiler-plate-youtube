import React, { useEffect, useState } from "react";
import Axios from "axios";

function SideVideo() {
  const [sideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    Axios.get(`/api/video/getVideos`).then((response) => {
      if (response.status === 200) {
        setSideVideos(response.data.videos);
      } else {
        alert("비디오 정보를 가져오는데 실패했습니다");
      }
    });
  }, []);

  return (
    <div style={{ marginTop: "3rem" }}>
      {sideVideos.map((video, idx) => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration - minutes * 60);
        return (
          <div
            key={idx}
            style={{ display: "flex", marginBottom: "1rem", padding: "0 2rem" }}
          >
            <div style={{ width: "40%", marginRight: "1rem" }}>
              <a href>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={`http://localhost:5000/${video.thumbnail}`}
                  alt={`thumbnail`}
                />
              </a>
            </div>
            <div style={{ width: "50%" }}>
              <a href style={{ color: "gray" }}>
                <span
                  style={{
                    fontSize: "1rem",
                    color: "black",
                    display: "block",
                  }}
                >
                  {video.title}
                </span>
                <span style={{ display: "block" }}>{video.writer.name}</span>
                <span style={{ display: "block" }}>{video.views} views</span>
                <span style={{ display: "block" }}>
                  {minutes} : {seconds}
                </span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SideVideo;
