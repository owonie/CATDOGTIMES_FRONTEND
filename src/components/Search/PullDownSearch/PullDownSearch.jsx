import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./PullDownSearch.css";

function PullDownSearch({ data }) {
  const path = "http://localhost:3000/exploreId";

  //이미지 src
  const imgPath = "http://localhost:8088/times/resources/upload/";

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
