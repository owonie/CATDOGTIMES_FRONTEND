import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./PullDownSearch.css";

function PullDownSearch({ data }) {
  const imgPath = "http://localhost:8088/times/resources/upload/";
  const path = "http://localhost:3000/exploreId";

  const [feeds, setFeeds] = useState([]);
  const [toMemberNo, setToMemberNo] = useState(-1);
  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  // useEffect(() => {
  //   const loadExplore = async () => {
  //     const response = await fetch(`explore?toMemberNo=${toMemberNo}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         ACCESS_TOKEN: accessToken,
  //       },
  //     });
  //     let data = await response.json();
  //     setFeeds(data);
  //     console.log(data);

  //     if (response.status === 401) {
  //       const res = await fetch(`explore?toMemberNo=${toMemberNo}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           ACCESS_TOKEN: accessToken,
  //           REFRESH_TOKEN: refreshToken,
  //         },
  //       });
  //       data = await res.json();
  //     }
  //     setFeeds(data);
  //   };
  //   loadExplore();
  // }, []);

  return (
    <>
      {Object.keys(data).map((key) => (
        <div className="PullDownBox">
          <a href={path}>
            <div className="searchUserProfile" onClick="#">
              <img src={imgPath + data[key].photo} alt="user" className="userImg" />
              <div>
                <div className="userName">{data[key].id}</div>
                <div className="userPR">{data[key].nickName}</div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  );
}

export default PullDownSearch;
