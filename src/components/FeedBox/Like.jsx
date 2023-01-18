import React, { useState } from "react";
import "./Like.css";
import axios from "axios";

const Like = ({ token, postId }) => {
  const [heart, setHeart] = useState([true, "far fa-heart fa-lg"]);
  const [postLikeId, setPostLikeId] = useState(-1);

  function clickHeart() {
    heart[0] ? setHeart([false, "fa fa-heart fa-lg"]) : setHeart([true, "far fa-heart fa-lg"]);
  }

  console.log(postLikeId);
  console.log(postId);

  const handleOk = () => {
    //하트 누르면 빨강으로 바꿔주는 function
    clickHeart();

    // heart[0] ? setPostLikeId(postLikeId) : setPostLikeId(-1);
    // axios get으로 postLikeId 가져오기? 리턴값 1나오면 안되는데 큼...

    // axios + 토큰값 보내주기
    axios
      .post(
        "/post/like",
        {
          postId: postId,
          postLikeId: postLikeId, // -1
        }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: token,
        //   },
        // }
      )
      .then((res) => {
        console.log("postLike insert success");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <a className="postLike" href="javascript:void(0)" onClick={handleOk}>
      <i className={heart[1]}></i>
    </a>
  );
};

export default Like;
