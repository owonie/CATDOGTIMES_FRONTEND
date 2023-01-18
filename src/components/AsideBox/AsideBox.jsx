import React from "react";
import { useSelector } from "react-redux";
import Side from "../mypage/Side";
import "./AsideBox.css";
import Ranking from "./Ranking/Ranking";
import Side2 from "./Side2/Side2";

function AsideBox() {
  const memberInfo = useSelector((state) => {
    return state.memberInfo.data;
  });

  return (
    <div className="AsideBox">
      <div className="AsideBox__member">
        <Side2 users={memberInfo} />
      </div>
      <Ranking />
    </div>
  );
}

export default AsideBox;
