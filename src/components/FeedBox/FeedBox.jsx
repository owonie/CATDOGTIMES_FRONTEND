import React, { useEffect, useState } from "react";
import "./feedbox.css";
import "../ViewDetail/ViewDetail.css";
import ViewDetail from "../ViewDetail/ViewDetail";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Comment from "../Comment/Comment";
import Settings from "../Settings/Settings";

const FeedBox = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    try {
      const loadData = async () => {
        const response = await axios.get("/post/list");
        console.log(response.data);
        setFeeds(response.data);
      };
      loadData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const linkClick = () => {
    {
      feeds.map((feed) => Navigate(`/post/${feed.memberNo}`));
    }
  };

  return (
    <div>
      {feeds.map((feed) => (
        <>
          <section className="feedBox" key={feed.feedId}>
            <div className="feedTop">
              <div className="feedTopLeft" onClick={linkClick}>
                <img src={feed.writerPhoto} alt="writer" />
                <div>{feed.writerName}</div>
              </div>
              <div className="feedTopRight">
                <Settings feedId={feed.feedId} />
              </div>
            </div>
            <article className="feedMiddleImg">
              <img src={feed.feedImage} alt="feed" />
            </article>
            <div className="feedBottom">
              <div className="bottomMenu">
                <div className="bottomMenuLeft">
                  <i className="fa-regular fa-heart fa-lg"></i>
                  <ViewDetail
                    id={feed.feedId}
                    imgSrc={feed.feedImage}
                    writerPhoto={feed.writerPhoto}
                    writerName={feed.writerName}
                    postContent={feed.feedContent}
                  />
                  <i className="fas fa-share-alt fa-lg"></i>
                </div>
                <div className="bottomMenuRight">
                  <i className="far fa-bookmark fa-lg"></i>
                </div>
              </div>
              <div className="like">
                <img src={feed.likerPhoto} alt="liker" />
                <span className="userName">{feed.likerName}</span>님 외 {feed.replyLikeCount}명이 좋아합니다
              </div>
              <div className="postContent">
                <span className="writer_nickname">{feed.writerName}</span>
                <span className="writer_comment">{feed.feedContent}</span>
              </div>
            </div>
            <section className="reply">
              <div className="commentContainer">
                <div className="commentCount">댓글 3개</div>
                <Comment postId={feed.feedId} />
                {/* <div className="commentCase">
                  <div className="comments">
                    <span className="user_nickname">nyang</span>
                    <span className="user_comment"> 와~! 너무 멋있다</span>
                  </div>
                  <div className="commentImg">
                    <i className="fa-regular fa-heart fa-sm"></i>
                  </div>
                </div>
                <div className="commentCase">
                  <div className="comments">
                    <span className="user_nickname">meow</span>
                    <span className="user_comment"> 어디인지?</span>
                  </div>
                  <div className="commentImg">
                    <i className="fa-regular fa-heart fa-sm"></i>
                  </div>
                </div>
                <div className="commentCase">
                  <div className="comments">
                    <span className="user_nickname">mung</span>
                    <span className="user_comment"> 심심하다</span>
                  </div>
                  <div className="commentImg">
                    <i className="fa-regular fa-heart fa-sm"></i>
                  </div>
                </div> */}
              </div>
              <form className="commentInputBox">
                <input defaultValue="" type="text" placeholder="댓글 달기..." id="commentInput" />
                <button>게시</button>
              </form>
            </section>
          </section>
        </>
      ))}
    </div>
  );
};

export default FeedBox;

// axios
// .get("/post/list")
// .then((res) => {
//   console.log("insert Success");
//   console.log(res.data);
// })
// .catch((error) => {
//   console.log(error);
// });
