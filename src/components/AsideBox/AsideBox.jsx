import React from "react";
import "./AsideBox.css";
import Ranking from "./Ranking/Ranking";

function AsideBox() {
  return (
    <div className="AsideBox">
      <div className="AsideBox__member">
        <a className="AsideBox__member-login" href="#">
          <span>로그인</span>
        </a>
        <a className="AsideBox__member-register" href="#">
          <span>회원가입</span>
        </a>
      </div>
      <div className="AsideBox__animal"></div>
      <Ranking />
    </div>
  );
}

export default AsideBox;
