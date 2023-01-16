import React, { useEffect, useState } from "react";
import "./feedbox.css";
import "../ViewDetail/ViewDetail.css";
import ViewDetail from "../ViewDetail/ViewDetail";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Comment from "../Comment/Comment";
import Settings from "../Settings/Settings";
import ShareButton2 from "../Share/Share2";
import CommentInputBox from "../CommentInputBox/CommentInputBox";
import Like from "./Like";

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
      Object.keys(feeds).map((key) => Navigate(`/post/${feeds[key].memberNo}`));
    }
  };

  return (
    <div>
      {Object.keys(feeds).map((key) => (
        <>
          <section className="feedBox" key={feeds[key].feedId}>
            <div className="feedTop">
              <div className="feedTopLeft" onClick={linkClick}>
                <img src={feeds[key].writerPhoto} alt="writer" />
                <div>{feeds[key].writerName}</div>
              </div>
              <div className="feedTopRight">
                <Settings feedId={feeds[key].feedId} />
              </div>
            </div>
            <article className="feedMiddleImg">
              <img src={feeds[key].feedImage} alt="feed" />
            </article>
            <div className="feedBottom">
              <div className="bottomMenu">
                <div className="bottomMenuLeft">
                  <Like />
                  {/* <i className="fa-regular fa-heart fa-lg"></i> */}
                  <ViewDetail
                    id={feeds[key].feedId}
                    imgSrc={feeds[key].feedImage}
                    writerPhoto={feeds[key].writerPhoto}
                    writerName={feeds[key].writerName}
                    postContent={feeds[key].feedContent}
                  />
                  <ShareButton2 />
                </div>
                <div className="bottomMenuRight">
                  <i className="far fa-bookmark fa-lg"></i>
                </div>
              </div>
              <div className="like">
                <img src={feeds[key].likerPhoto} alt="liker" />
                <span className="userName">{feeds[key].likerName}</span>님 외 {feeds[key].postLikeCount}명이 좋아합니다
              </div>
              <div className="postContent">
                <span className="writer_nickname">{feeds[key].writerName}</span>
                <span className="writer_comment">{feeds[key].feedContent}</span>
              </div>
            </div>
            <section className="reply">
              <div className="commentContainer">
                <div className="commentCount">댓글 3개</div>
                <Comment postId={feeds[key].feedId} />
              </div>
              <CommentInputBox postId={feeds[key].feedId} />
            </section>
          </section>
        </>
      ))}
    </div>
  );
};

export default FeedBox;
