import React, { useState } from "react";
import "./Bookmark.css";
import { useSelector } from "react-redux";

const Bookmark = ({ postId }) => {
  const [bookmark, setBookmark] = useState([true, "far fa-bookmark fa-lg"]); //흰색 하트
  const [bookmarkId, setBookmarkId] = useState(-1);

  const accessToken = useSelector((state) => state.userData.catdogtimes_accessToken);
  const refreshToken = useSelector((state) => state.userData.catdogtimes_refreshToken);

  function clickBookmark() {
    bookmark[0] ? setBookmark([false, "fa fa-bookmark fa-lg"]) : setBookmark([true, "far fa-bookmark fa-lg"]);
  }

  let bookmarkData = {
    postId: postId,
    bookmarkId: bookmarkId,
  };

  const handleOk = (e) => {
    //하트 누르면 빨강으로 바꿔주는 function
    clickBookmark();

    // bookmark get방식 요청, memberNo가 일치하는 bookmark 가져옴.
    const loadData = async () => {
      const response = await fetch(`post/bookmark?postId=${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
        },
      });
      let data = await response.json();
      console.log(data);

      if (response.status === 401) {
        const res = await fetch(`post/bookmark?postId=${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ACCESS_TOKEN: accessToken,
            REFRESH_TOKEN: refreshToken,
          },
        });
        data = await res.json();
        console.log(data);
      }
      console.log(data);
      console.log(bookmark[0]);
      bookmark[0] ? setBookmarkId(data[0].bookmarkId) : setBookmarkId(-1);
    };
    console.log("get 이전 :" + bookmarkId);
    loadData();

    console.log("get한 이후 :" + bookmarkId);

    const loadData2 = async () => {
      const response = await fetch(`post/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ACCESS_TOKEN: accessToken,
        },
        body: JSON.stringify(bookmarkData),
      });
      let data = await response.json();
      console.log(data);

      if (response.status === 401) {
        const res = await fetch(`post/bookmark`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ACCESS_TOKEN: accessToken,
            REFRESH_TOKEN: refreshToken,
          },
          body: JSON.stringify(bookmarkData),
        });
        data = await res.json();
      }
    };
    loadData2();

    e.preventDefault();
  };

  return (
    <a className="Bookmark" href="#" onClick={handleOk} on>
      <i id="bookmarkIcon" className={bookmark[1]}></i>
    </a>
  );
};

export default Bookmark;
