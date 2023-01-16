import React, { useState } from "react";
import "./CommentInputBox.css";
import axios from "axios";

const CommentInputBox = ({ postId }) => {
  const [replyContent, setReplyContent] = useState("");

  const handleOk = () => {
    axios
      .post("/post/insertReply", {
        replyContent: replyContent,
        postId: postId,
        memberNo: 1, //임시로 1이라고 해놓음
      })
      .then((res) => {
        console.log("comment insert success");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="commentInputBox">
      <input
        type="text"
        placeholder="댓글 달기..."
        id="commentInput"
        onChange={(e) => {
          setReplyContent(e.target.value);
          console.log(e.target.value);
        }}
      />
      <button onClick={handleOk}>게시</button>
    </form>
  );
};

export default CommentInputBox;
