import React, { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import "./ExploreDetail.css";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { Avatar, Image, List } from "antd";

const ExploreId = () => {
  const users = useSelector((state) => {
    return state.memberInfo.data;
  });

  const [feeds, setFeeds] = useState([]);
  const [toMemberNo, setToMemberNo] = useState(-1);

  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  //이미지 src
  const imgPath = "http://localhost:8088/times/resources/upload/";

  //타이틀용 더미데이터
  const data = [
    {
      title: "Ant Design Title 1",
    },
  ];

  useEffect(() => {
    setToMemberNo(1); //우선 1이라고 해보겠다.
    const loadData = async () => {
      const response = await fetch(`post/explore?toMemberNo=${toMemberNo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
        },
      });
      let data = await response.json();
      setFeeds(data);
      console.log(feeds);
      if (response.status === 401) {
        const res = await fetch(`post/explore?toMemberNo=${toMemberNo}`, {
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
      console.log(feeds);
    };
    loadData();
  }, []);

  return (
    <>
      <div className="explore">
        <nav id="nav">
          <NavBar />
        </nav>
        <section className="center">
          <div className="search">
            <Search />
          </div>
          <div id="searchUser">
            <List.Item.Meta
              avatar={
                <Avatar
                  size={{
                    xs: 80,
                    sm: 98,
                    md: 116,
                    lg: 134,
                    xl: 152,
                    xxl: 170,
                  }}
                  src={users !== null ? `${imgPath}${users.memberPhoto}` : "`${imgPath}`undefined.jpg"}
                />
              }
              title={users !== null ? users.memberNickname : "NoData"}
              description="님의 게시물 사진모음입니다."
            />
          </div>
          <div className="explore__content">
            {Object.keys(feeds).map((key) => (
              <Image className="randomImg" width={300} preview="false" src={imgPath + feeds[key].imageSavedName} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
export default ExploreId;
