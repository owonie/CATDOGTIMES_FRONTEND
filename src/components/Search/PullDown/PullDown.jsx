import React from "react";
import "./PullDown.css";

function PullDown({ search }) {
  return (
    <div className="recentSearchBox">
      <div className="recentTop">
        <div className="text1">최근 검색 항목</div>
        <div className="text2">모두 지우기</div>
      </div>
      <div className="recentUser">
        <div className="recentUserProfile">
          <img src="/img/userdog.jpg" alt="user" className="userImg" />
          <div>
            <div className="userName">cutyDog</div>
            <div className="userPR">날 보고 가개</div>
          </div>
        </div>
        <i className="fa-solid fa-xmark fa-lg"></i>
      </div>
      <div className="recentUser">
        <div className="recentUserProfile">
          <img src="/img/bami.jpg" alt="user" className="userImg" />
          <div>
            <div className="userName">Bami</div>
            <div className="userPR">대답냥이</div>
          </div>
        </div>
        <i className="fa-solid fa-xmark fa-lg"></i>
      </div>
    </div>
  );
}

export default PullDown;
