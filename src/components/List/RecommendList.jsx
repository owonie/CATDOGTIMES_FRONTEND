import React, { useEffect, useState } from "react";
import { Avatar, List, message, Button } from "antd";
import VirtualList from "rc-virtual-list";
import Follow from "./Follow";

const ContainerHeight = 400; //container 높이
const imgPath = "http://localhost:8088/times/resources/upload/"; //이미지 src

const RecommendList = ({ recommends }) => {
  console.log(recommends);
  const appendData = () => {
    message.success(recommends.length + " 명이 추천목록에 올랐습니다.");
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  return (
    <List>
      <VirtualList data={recommends} height={ContainerHeight} itemHeight={47} itemKey="email" onScroll={onScroll}>
        {(item) => (
          <List.Item key={item.memberNo}>
            <List.Item.Meta avatar={<Avatar src={imgPath + item.memberPhoto} />} title={<a href="#">{item.memberNickName}</a>} description={item.email} />
            <Follow memberNo={item.memberNo} />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default RecommendList;
