import React, { useState } from "react";
import DetailReply from "../Comment/ViewDetailComment";
import "./ViewDetail.css";

const ViewDetail = ({ id, imgSrc, writerPhoto, writerName, postContent }) => {
  console.log("viewDetail:" + id);
  console.log("viewDetail:" + imgSrc);

  //이미지 src
  const imgPath = "http://localhost:8088/times/resources/upload/";

  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: id,
      imageSrc: imgSrc,
      writerPhoto: writerPhoto,
      writerName: writerName,
      postContent: postContent,
    },
  ]);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <a onClick={showModal} href="#">
        <i className="far fa-comment fa-lg"></i>
      </a>
      {posts.map((post) => (
        <div className={`modal-overlay ${isOpen ? "modal-open" : "modal-closed"}`}>
          <div className="modal-footer">
            <a onClick={hideModal} href="#">
              <i className="fas fa-times fa-xl"></i>
            </a>
          </div>
          <div className="modal-content">
            <div className="modal-body">
              <div key={post.id} className="post">
                <img src={post.imageSrc} alt="Bami" />
              </div>

              <div id="aside">
                <div id="aside__user">
                  <div id="aside__user-info">
                    <img src={post.writerPhoto} />
                    <span>{post.writerName}</span>
                  </div>
                  <p id="aside__user__text">{post.postContent}</p>
                </div>
                <DetailReply postId={post.id} />
                <div className="bottomMenu">
                  <div className="bottomMenuLeft">
                    <i className="fa-regular fa-heart fa-lg"></i>
                    <i className="far fa-comment fa-lg"></i>
                    <i className="fas fa-share-alt fa-lg"></i>
                  </div>
                  <div className="bottomMenuRight">
                    <i className="far fa-bookmark fa-lg"></i>
                  </div>
                </div>
                <form className="commentInputBox2">
                  <input defaultValue="" type="text" placeholder="댓글..." id="commentInput2" />
                  <button>게시</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ViewDetail;
