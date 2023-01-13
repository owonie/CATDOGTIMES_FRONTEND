import React, { useEffect, useState } from "react";
import axios from "axios";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const postId = 1;

  useEffect(() => {
    try {
      const loadData = async () => {
        console.log("LoadDATA안" + postId);
        const response = await axios.get("/post/readReply", {
          params: {
            postId: 1,
          },
        });
        console.log(postId);
        console.log(response.data);
        setComments(response.data);
      };
      loadData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {comments.map((comment) => {
        <>
          <div className="commentCase">
            <div className="comments">
              <div>{comment.replyId}</div>
              <span className="user_nickname">{comment.replyNickname}</span>
              <span className="user_comment">{comment.replyContent}</span>
            </div>
            <div className="commentImg">
              <i className="fa-regular fa-heart fa-sm"></i>
            </div>
          </div>
          ;
        </>;
      })}
    </>
  );
};

export default Comment;
