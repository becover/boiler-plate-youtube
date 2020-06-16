import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";

function LikeDislikes({ video, videoId, userId, commentId }) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DisLikeAction, setDisLikeAction] = useState(null);

  let variable = {};

  if (video) {
    variable = { videoId, userId };
  } else {
    variable = { commentId, userId };
  }

  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.status === 200) {
        setLikes(response.data.likes.length);
        response.data.likes.filter(
          (like) => like.userId === userId && setLikeAction("liked")
        );
      } else {
        alert("Likes에 정보를 가져오지 못했습니다.");
      }
    });

    Axios.post("/api/like/getDislikes", variable).then((response) => {
      if (response.status === 200) {
        setDislikes(response.data.dislikes.length);
        response.data.dislikes.filter(
          (dislike) => dislike.userId === userId && setDisLikeAction("disliked")
        );
      } else {
        alert("Disikes에 정보를 가져오지 못했습니다.");
      }
    });
  }, []);

  const onLike = () => {
    if (LikeAction === null) {
      Axios.post("/api/like/upLike", variable).then((response) => {
        if (response.status === 200) {
          setLikes(Likes + 1);
          setLikeAction("liked");
          if (DisLikeAction !== null) {
            setDisLikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert("Like를 올리지 못했습니다");
        }
      });
    } else {
      Axios.post("/api/like/unLike", variable).then((response) => {
        if (response.status === 200) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("Like를 내리지 못했습니다");
        }
      });
    }
  };

  const onDislike = () => {
    if (DisLikeAction !== null) {
      Axios.post("/api/like/unDislike", variable).then((response) => {
        if (response.status === 200) {
          setDislikes(Dislikes - 1);
          setDisLikeAction(null);
        } else {
          alert("Dislike을 지우지 못했습니다");
        }
      });
    } else {
      Axios.post("/api/like/upDislike", variable).then((response) => {
        if (response.status === 200) {
          setDislikes(Dislikes + 1);
          setDisLikeAction("disliked");

          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert("Dislike을 올리지 못했습니다");
        }
      });
    }
  };

  return (
    <div>
      <span key="comment-basic-like" style={{ marginRight: "8px" }}>
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={LikeAction === "liked" ? "filled" : "outlined"}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      <span key="comment-basic-like" style={{ marginRight: "8px" }}>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={DisLikeAction === "disliked" ? "filled" : "outlined"}
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislikes;
