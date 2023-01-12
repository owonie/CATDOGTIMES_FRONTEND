import React, { useState } from "react";
import { Drawer, Button, Space } from "antd";
import RecommendList from "../List/RecommendList";
import "./Notification.css";
import AlarmList from "../List/AlarmList";

const Notification = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
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
          <span>읽지 않음</span>
          <AlarmList />
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
