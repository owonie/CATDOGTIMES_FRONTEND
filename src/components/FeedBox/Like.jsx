import React from "react";
import "./Like.module.css";
import axios from "axios";

const Like = ({ postId }) => {
  const handleOk = () => {
    axios
      .post("/post/like", {
        postId: postId,
      })
      .then((res) => {
        console.log("postLike insert success");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <a className="postLike" href="#" onClick={handleOk}>
      <i className="far fa-bookmark fa-lg"></i>
    </a>
  );
};

export default Like;
