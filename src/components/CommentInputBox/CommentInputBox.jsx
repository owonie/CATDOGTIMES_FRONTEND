import React, { useState } from "react";
import "./CommentInputBox.css";
import { useSelector } from "react-redux";

const CommentInputBox = ({ postId }) => {
  const [replyContent, setReplyContent] = useState("");

  /* 토큰 */
  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  let reply = {
    replyContent: replyContent,
    postId: postId,
  };

  const addPost = async () => {
    const response = await fetch(`/post/insertReply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCESS_TOKEN: accessToken,
      },
      body: JSON.stringify(reply),
    });
    let data = await response.json();
    console.log(data);

    if (response.status === 401) {
      const res = await fetch(`/post/insertReply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
          REFRESH_TOKEN: refreshToken,
        },
        body: JSON.stringify(reply),
      });
      data = await res.json();
    }
  };

  const handleOk = (e) => {
    addPost();
    e.preventDefault();
    window.location.reload();
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
