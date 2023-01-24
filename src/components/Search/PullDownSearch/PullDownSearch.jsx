import React from "react";
import "./PullDownSearch.css";

function PullDownSearch({ data }) {
  console.log(data);
  const imgPath = "http://localhost:8088/times/resources/upload/";
  const path = "http://localhost:3000/explore/";

  return (
    <>
      {Object.keys(data).map((key) => (
        <div className="PullDownBox">
          <a href={path + data[key].id}>
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
