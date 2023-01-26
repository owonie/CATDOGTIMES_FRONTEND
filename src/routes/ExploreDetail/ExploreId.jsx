import React, { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import "./ExploreDetail.css";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { Avatar, Image, List } from "antd";
import axios from "axios";
import ExploreDetailView from "./ExploreDetailView";

const ExploreId = () => {
  const users = useSelector((state) => {
    return state.memberInfo.data;
  });

  const imgPath = "http://localhost:8088/times/resources/upload/";

  let memberNo = "41";

  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      axios
        .post("post/searchId", null, {
          params: {
            memberNo: memberNo,
          },
        })
        .then((res) => {
          console.log(res.data);
          setFeeds(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
            <div className="userProfile">
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
              />
            </div>
            <div className="userInfo">
              <div id="exploreUserName" className="userName">
                {users !== null ? users.memberNickname : "NoData"}
              </div>
              <div className="description">님의 게시물입니다.</div>
            </div>
          </div>
          <div className="explore__content">
            {Object.keys(feeds).map((key) => (
              <ExploreDetailView
                id={feeds[key].feedId}
                imgSrc={imgPath + feeds[key].feedImage}
                writerPhoto={imgPath + feeds[key].writerPhoto}
                writerName={feeds[key].writerName}
                postContent={feeds[key].feedContent}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
export default ExploreId;
