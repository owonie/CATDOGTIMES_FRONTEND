import React, { useEffect, useState } from "react";
import { Avatar, List, message } from "antd";
import VirtualList from "rc-virtual-list";

const fakeDataUrl = "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 400;

//이미지 src
const imgPath = "http://localhost:8088/times/resources/upload/";

const AlarmList = ({ alarm }) => {
  const [data, setData] = useState([]);
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
      });
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
      <VirtualList data={alarm} height={ContainerHeight} itemHeight={47} itemKey="memberNo" onScroll={onScroll}>
        {(item) => (
          <List.Item key={item.memberNo}>
            <List.Item.Meta avatar={<Avatar src={imgPath + item.memberPhoto} />} title={<a href="#">{item.memberNickName}</a>} />
            <span>님이 회원님의 사진에 좋아요를 눌렀습니다. </span>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default AlarmList;
