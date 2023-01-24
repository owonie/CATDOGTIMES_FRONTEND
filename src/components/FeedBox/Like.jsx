import React, { useState } from "react";
import "./Like.css";
import { useSelector } from "react-redux";

const Like = ({ postId }) => {
  const [heart, setHeart] = useState([true, "far fa-heart fa-lg"]); //흰색 하트
  const [postLikeId, setPostLikeId] = useState(-1);

  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  function clickHeart() {
    heart[0] ? setHeart([false, "fa fa-heart fa-lg"]) : setHeart([true, "far fa-heart fa-lg"]);
  }

  let postLike = {
    postId: postId,
    postLikeId: postLikeId,
  };

  const handleOk = (e) => {
    //하트 누르면 빨강으로 바꿔주는 function
    clickHeart();

    const loadData2 = async () => {
      const response = await fetch(`post/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
        },
        body: JSON.stringify(postLike),
      });
      let data = await response.json();
      console.log(data);

      if (response.status === 401) {
        const res = await fetch(`post/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ACCESS_TOKEN: accessToken,
            REFRESH_TOKEN: refreshToken,
          },
          body: JSON.stringify(postLike),
        });
        data = await res.json();
      }
    };
    loadData2();

    // like get방식 요청, memberNo가 일치하는 like 가져옴.
    const loadData = async () => {
      console.log("post/like GET이다!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      const response = await fetch(`post/like?postId=${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
        },
      });
      let data = await response.json();
      console.log(data);

      if (response.status === 401) {
        const res = await fetch(`post/like?postId=${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ACCESS_TOKEN: accessToken,
            REFRESH_TOKEN: refreshToken,
          },
        });
        data = await res.json();
        console.log(data);
      }

      heart[0] ? setPostLikeId(data[0].postLikeId) : setPostLikeId(-1);
    };
    loadData();

    e.preventDefault();
  };

  return (
    <a className="postLike" href="#" onClick={handleOk}>
      <i className={heart[1]}></i>
    </a>
  );
};

export default Like;
