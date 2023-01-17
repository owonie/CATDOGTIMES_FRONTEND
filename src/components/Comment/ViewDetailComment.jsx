import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewDetailComment.css";

const DetailReply = ({ postId }) => {
  const [comments, setComments] = useState([]);

  //이미지 src
  const imgPath = "http://localhost:8088/times/resources/upload/";

  useEffect(() => {
    try {
      const loadData2 = async () => {
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
      <div className="commentCrate">
        {Object.keys(comments).map((key) => (
          <div className="comment" key={comments[key].replyId}>
            <div className="comment__customer">
              <div className="comment__customer__column">
                <img src={imgPath + comments[key].writerPhoto} className="comment__customer__avatar" />
                <div className="comment__customer__text">
                  <h4 className="comment__customer__title">
                    {comments[key].replyNickname}
                    <span className="comment__customer__content"> {comments[key].replyContent}</span>
                  </h4>
                  <h6 className="comment__customer__subtitle">좋아요 2명</h6>
                </div>
              </div>
              <div className="comment__customer__column">
                <i className="far fa-heart"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailReply;
