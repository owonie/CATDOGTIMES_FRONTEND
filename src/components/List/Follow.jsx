import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import "./Follow.css";

const Follow = ({ memberNo }) => {
  const [follows, setFollows] = useState([true, "팔로우", "none"]);
  const [followId, setFollowId] = useState(-1);

  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  function clickFollow() {
    follows[0] ? setFollows([false, "팔로우 취소", "followCancel"]) : setFollows([true, "팔로우", "follow"]);
  }

  let followDto = {
    followId: followId, //내 멤버 아이디값
    followingId: memberNo, //팔로우하는 대상의 멤버번호
  };

  const getFollow = async () => {
    console.log("post/follow GET이다!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const response = await fetch(`post/follow`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCESS_TOKEN: accessToken,
      },
    });
    let data = await response.json();
    console.log(data.length > 0 && data[0].followingId === memberNo);
    if (data.length > 0 && data[0].followingId === memberNo) {
      setFollows([false, "팔로우 취소", "followCancel"]);
      setFollowId(data[0].followId);
    }

    if (response.status === 401) {
      const res = await fetch(`post/follow`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
          REFRESH_TOKEN: refreshToken,
        },
      });
      data = await res.json();
    }
  };

  const follow = async (e) => {
    e.preventDefault();
    clickFollow();
    const response = await fetch(`post/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCESS_TOKEN: accessToken,
      },
      body: JSON.stringify(followDto),
    });
    let data = await response.json();
    setFollowId(data.followId);

    if (response.status === 401) {
      const res = await fetch(`post/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
          REFRESH_TOKEN: refreshToken,
        },
        body: JSON.stringify(followDto),
      });
      data = await res.json();
      setFollowId(data.followId);
    }
    console.log(follows[0]);
  };

  function onClick(e) {
    e.preventDefault();
    getFollow();
  }

  return (
    <>
      <a onClick={(e) => onClick(e)} href="#">
        <Button type="primary" onClick={follow} className={follows[2]}>
          {follows[1]}
        </Button>
      </a>
    </>
  );
};
export default Follow;
