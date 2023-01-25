import React, { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import "./ExploreDetail.css";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import ExploreDetailView from "./ExploreDetailView";

const ExploreDetail = () => {
  const [feeds, setFeeds] = useState([]);
  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  //이미지 src
  const imgPath = "http://localhost:8088/times/resources/upload/";

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`post/random`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
        },
      });
      let data = await response.json();
      console.log(data);
      if (response.status === 401) {
        const res = await fetch(`post/random`, {
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
export default ExploreDetail;
