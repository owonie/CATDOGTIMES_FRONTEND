import React from "react";

const Tab02 = ({ data }) => {
  console.log(data);
  const imgPath = "http://localhost:8088/times/resources/upload/";
  return (
    <>
      {/* <h1>좋아요</h1>  */}

      <ul className="likedlist">
        {data !== null ? (
          data.map((da, i) => (
            <li key={i}>
              <a href="#">
                <span className="no"> {i + 1} </span>
                <span className="thum">
                  <img src={`${imgPath}${da.imageSavedName}`} alt="{da.postContent}" />
                </span>
                <span className="flex column ptxt">
                  <span className="ptitle"> {da.postContent} </span>
                  <span className="writer">@{da.memberNickname}</span>
                  <span className="cnt">
                    {" "}
                    좋아요( {da.likeCnt} ) 댓글( {da.replyCnt} )
                  </span>
                  <span className="lastUpdate">{da.postUpdateDate}</span>
                </span>
              </a>
            </li>
          ))
        ) : (
          <li>NoData</li>
        )}
      </ul>
    </>
  );
};

export default Tab02;
