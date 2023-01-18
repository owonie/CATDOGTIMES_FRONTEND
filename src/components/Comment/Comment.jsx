import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Comment.css";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);

  //좋아요 하트 색깔 바꾸기
  const [heart, setHeart] = useState([true, "far fa-heart"]);
  const clickHeart = () => {
    heart[0] ? setHeart([false, "fa fa-heart"]) : setHeart([true, "far fa-heart "]);
  };

  useEffect(() => {
    try {
      const loadData2 = async () => {
        console.log("LoadDATA안" + postId);
        const response = await axios.get("/post/readReply", {
          params: {
            postId: postId,
          },
        });
        console.log(postId);
        console.log(response.data);
        setComments(response.data);
      };
      loadData2();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {Object.keys(comments).map((key) => (
        <div className="commentCase" key={comments[key].replyId}>
          <div className="comments">
            <span className="user_nickname">{comments[key].replyNickname}</span>
            <span className="user_comment">{comments[key].replyContent}</span>
          </div>
          <a className="commentImg" href="#">
            <i
              className="far fa-heart"
              onClick={(e) => {
                e.preventDefault();
              }}
            ></i>
          </a>
        </div>
      ))}
    </>
  );
};

export default Comment;
