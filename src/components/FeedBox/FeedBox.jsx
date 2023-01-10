import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import "./feedbox.css";
import "../ViewDetail/ViewDetail.css";
import ViewDetail from "../ViewDetail/ViewDetail";

const FeedBox = ({ id }) => {
  const [feedData, setData] = useState([]);

  const getFeedData = async () => {
    const json = await (await fetch("hello")).json();
    setData(json);
  };
  useEffect(() => {
    getFeedData();
  }, []);

  const linkClick = () => {
    <Link to={`/post/${id}`}></Link>;
  };

  return (
    <div>
      <section className="feedBox">
        <div className="feedTop">
          <div className="feedTopLeft" onClick={linkClick}>
            <img src="#" alt="writer" />
            <div>King Cat V</div>
          </div>
          <div className="feedTopRight">
            <i className="fas fa-ellipsis-h fa-lg"></i>
          </div>
        </div>
        <article className="feedMiddleImg">
          <img src="#" alt="feed" />
        </article>
        <div className="feedBottom">
          <div className="bottomMenu">
            <div className="bottomMenuLeft">
              <i className="fa-regular fa-heart fa-lg"></i>
              <ViewDetail />
              <i className="fas fa-share-alt fa-lg"></i>
            </div>
            <div className="bottomMenuRight">
              <i className="far fa-bookmark fa-lg"></i>
            </div>
          </div>
          <div className="like">
            <img src="#" alt="liker" />
            <span className="userName">catDog</span>님 외 777명이 좋아합니다
          </div>

          <div className="commentContainer">
            <div className="commentMore">댓글 3개</div>
            <div className="comment">nyang 와~! 너무 멋있다냥</div>
            <div className="comment">meow 표정 그윽한 거 보라냥</div>
            <div className="comment">mung 어디 보는거멍?</div>
          </div>
          <div className="commentTime">77분 전</div>

          <form className="commentInputBox">
            <input defaultValue="" type="text" placeholder="댓글 달기..." id="commentInput" />
            <button>게시</button>
          </form>
        </div>
      </section>
    </div>
  );
};

// Movie.propTyes = {
//   id: PropTypes.number.isRequired,
// };

export default FeedBox;
