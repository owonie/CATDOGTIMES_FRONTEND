import React from "react";
import "./PullDownSearch.css";

function PullDownSearch({ search }) {
  return (
    <>
      <div className="PullDownBox">
        <div className="searchUserProfile" onClick="#">
          <img src="/img/userdog.jpg" alt="user" className="userImg" />
          <div>
            <div className="userName">user_name</div>
            <div className="userPR">userPR</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PullDownSearch;
