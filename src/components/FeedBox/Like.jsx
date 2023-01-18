import React, { useEffect, useState } from "react";
import "./Like.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateToken } from "../../reducers/userData";

const Like = ({ postId }) => {
  const [heart, setHeart] = useState([true, "far fa-heart fa-lg"]);
  const [postLikeId, setPostLikeId] = useState(-1);

  function clickHeart() {
    heart[0] ? setHeart([false, "fa fa-heart fa-lg"]) : setHeart([true, "far fa-heart fa-lg"]);
  }

  const token = useSelector((state) => state.userData.catdogtimes_token);
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const tokenArr = token.split("?refreshToken=");
  const ACCESS_TOKEN = tokenArr[0];
  const REFRESH_TOKEN = tokenArr[1];

  localStorage.setItem("jwt", ACCESS_TOKEN);

  useEffect(() => {
    if (!token) {
      const userToken = params.get("accessToken");
      console.log("token", userToken);
      dispatch(updateToken(userToken));
    }
    axios
      .post(
        "/post/like",
        {
          postId: postId,
          postLikeId: postLikeId, // -1
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ACCESS_TOKEN,
          },
        }
      )
      .then((res) => {
        console.log("postLike insert success");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleOk = (e) => {
    //하트 누르면 빨강으로 바꿔주는 function
    clickHeart();
    // heart[0] ? setPostLikeId(postLikeId) : setPostLikeId(-1);
    // axios get으로 postLikeId 가져오기? 리턴값 1나오면 안되는데 큼...

    // axios + 토큰값 보내주기
    e.preventDefault();
  };

  return (
    <a className="postLike" href="#" onClick={handleOk}>
      <i className={heart[1]}></i>
    </a>
  );
};

export default Like;
