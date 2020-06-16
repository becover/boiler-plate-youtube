import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "../Section/SingleComment";
import ReplyComment from "../Section/ReplyComment";

function Comment(props) {
  const user = useSelector((state) => state.user);
  const videoId = props.postId;
  const [commentValue, setCommentValue] = useState("");
  const handleClick = (e) => {
    setCommentValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.status === 200) {
        console.log(response.data.result);
        setCommentValue("");
        props.refreshFunction(response.data.result);
      } else {
        alert("댓글 정보를 저장하는데 실패했습니다");
      }
    });
  };

  return (
    <div>
      <p
        style={{
          padding: "10px 0",
          marginTop: "10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        Replies
      </p>

      {props.commentList &&
        props.commentList.map(
          (comment, index) =>
            !comment.responseTo && (
              <>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  key={index}
                  comment={comment}
                  postId={videoId}
                />
                <ReplyComment
                  refreshFunction={props.refreshFunction}
                  parentCommentId={comment._id}
                  commentList={props.commentList}
                  postId={videoId}
                />
              </>
            )
        )}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
