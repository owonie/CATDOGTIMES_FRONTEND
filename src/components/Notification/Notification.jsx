import React, { useState } from "react";
import { Drawer } from "antd";
import RecommendList from "../List/RecommendList";
import "./Notification.css";
import AlarmList from "../List/AlarmList";
import { useSelector } from "react-redux";

const Notification = () => {
  const [open, setOpen] = useState(false);
  const [alarm, setAlarm] = useState("");
  const [recommends, setRecommends] = useState("");

  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  //AlarmList
  const loadAlarm = async () => {
    const response = await fetch(`post/notifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCESS_TOKEN: accessToken,
      },
    });
    let data = await response.json();
    setAlarm(data);

    if (response.status === 401) {
      const res = await fetch(`post/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
          REFRESH_TOKEN: refreshToken,
        },
      });
      data = await res.json();
      setAlarm(data);
    }
  };

  //RecommendList
  const loadRecommend = async () => {
    const response = await fetch(`post/recommends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCESS_TOKEN: accessToken,
      },
    });
    let data = await response.json();
    setRecommends(data);

    if (response.status === 401) {
      const res = await fetch(`post/recommends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
          REFRESH_TOKEN: refreshToken,
        },
      });
      data = await res.json();
      setRecommends(data);
    }
    console.log(recommends);
  };

  const showDrawer = () => {
    setOpen(true);
    loadAlarm();
    loadRecommend();
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <a href="#" onClick={showDrawer}>
        <i className="far fa-bell fa-lg"></i>
        <span>알림</span>
      </a>
      <Drawer title="알림" placement="right" onClose={onClose} open={open} size="large">
        <div className="alarm">
          <span>오늘</span>
          <AlarmList alarm={alarm} />
        </div>

        <div className="recommend">
          <div className="recommend__title">회원님을 위한 추천</div>
          <RecommendList />
        </div>
      </Drawer>
    </>
  );
};
export default Notification;
