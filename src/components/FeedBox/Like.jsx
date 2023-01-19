import React, { useEffect, useState } from "react";
import "./Like.css";
import { useSelector } from "react-redux";

const Like = ({ postId, feedCount }) => {
  const [heart, setHeart] = useState([true, "far fa-heart fa-lg"]); //흰색 하트
  const [postLikeId, setPostLikeId] = useState();
  console.log("기본값 없앤 후 :" + postLikeId);

  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  function clickHeart() {
    heart[0] ? setHeart([false, "fa fa-heart fa-lg"]) : setHeart([true, "far fa-heart fa-lg"]);
  }

  let postLike = {
    postId: postId,
    postLikeId: postLikeId,
  };

  //select로 postLike data 있는지 확인
  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`post/like?postId=${postId}?${data[0].memberNo}`, {
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

      console.log(data);
      console.log(data[0].memberNo);
      console.log("하트 실행 전:" + postLikeId);
      heart[0] ? setPostLikeId(-1) : setPostLikeId(data[0].postLikeId);
      console.log("하트 실행 후:" + postLikeId);
    };
    loadData();
  }, [heart]);

  const handleOk = (e) => {
    //하트 누르면 빨강으로 바꿔주는 function
    clickHeart();
    // heart[0] ? setPostLikeId(postLikeId) : setPostLikeId(-1);
    const loadData = async () => {
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
        //data = await res.json();
        //console.log(data);
      }
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
