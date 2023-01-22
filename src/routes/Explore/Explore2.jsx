import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import { useSelector } from "react-redux";

//이미지 src
const imgPath = "http://localhost:8088/times/resources/upload/";

const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
];

const Explore2 = () => {
  // toMemberNo
  const [toMemberNo, setToMemberNo] = useState(-1);
  const [feeds, setFeeds] = useState();
  const [data, setData] = useState([feeds]);

  //토큰
  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`post/explore?toMemberNo=${toMemberNo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
        },
      });
      let data = await response.json();

      if (response.status === 401) {
        const res = await fetch(`post/explore`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ACCESS_TOKEN: accessToken,
            REFRESH_TOKEN: refreshToken,
          },
        });
        data = await res.json();
      }
      setFeeds(data);
    };
    loadData();
    console.log(feeds);
  }, []);

  return (
    <List
      grid={{
        gutter: 16,
        column: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.title}></Card>
        </List.Item>
      )}
    />
  );
};

export default Explore2;
