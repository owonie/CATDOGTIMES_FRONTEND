import React from "react";
import "./PullDownSearch.css";

function PullDownSearch({ data }) {
  console.log(data);
  const imgPath = "http://localhost:8088/times/resources/upload/";
  return (
    <>
      {Object.keys(data).map((key) => (
        <div className="PullDownBox">
          <div className="searchUserProfile" onClick="#">
            <img src={imgPath + data[key].photo} alt="user" className="userImg" />
            <div>
              <div className="userName">{data[key].id}</div>
              <div className="userPR">{data[key].nickName}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default PullDownSearch;
