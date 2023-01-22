import { Modal } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ShareButton from "../Share/Share";
import "./Settings.css";

const Settings = ({ feedId, memberNo }) => {
  const [modal2Open, setModal2Open] = useState(false);
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

  //follow가 DB에 들어갔는지 확인 후 있으면 팔로우 취소 유지
  //그러려면 followId가 -1인지 아닌지 확인해야 함.
  //get으로 데이터 가져와야 한다.

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
    console.log(memberNo);
    console.log(data);
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
  };

  function onClick(e) {
    setModal2Open(true);
    e.preventDefault();
    getFollow();
  }

  const deletePost = () => {
    axios
      .post("/post/delete", null, {
        params: {
          postId: feedId,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log("delete Success");
      })
      .catch((error) => {
        console.log(error);
      });
    setModal2Open(false);
  };

  return (
    <>
      <a onClick={(e) => onClick(e)} href="#">
        <i className="fas fa-ellipsis-h fa-lg"></i>
      </a>

      <Modal footer={""} centered open={modal2Open} onOk={() => setModal2Open(false)} onCancel={() => setModal2Open(false)}>
        <div className="setting__row">
          <a href="#" onClick={deletePost}>
            게시물 삭제
          </a>
        </div>
        <div className="setting__row">
          <a href="#" onClick={follow} className={follows[2]}>
            {follows[1]}
          </a>
        </div>
        <div className="setting__row">
          <ShareButton />
        </div>
      </Modal>
    </>
  );
};
export default Settings;
