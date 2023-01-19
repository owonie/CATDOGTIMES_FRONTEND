import React, { useState } from "react";
import DetailReply from "../Comment/ViewDetailComment";
import "./ViewDetail.css";

const ViewDetail = ({ id, imgSrc, writerPhoto, writerName, postContent }) => {
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

  const showModal = (e) => {
    setIsOpen(true);
    e.preventDefault();
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <a onClick={showModal} href="#">
        <i className="far fa-comment fa-lg"></i>
      </a>
      {Object.keys(posts).map((key) => (
        <div className={`modal-overlay ${isOpen ? "modal-open" : "modal-closed"}`}>
          <div className="modal-footer">
            <a onClick={hideModal} href="#">
              <i className="fas fa-times fa-xl"></i>
            </a>
          </div>
          <div className="modal-content">
            <div className="modal-body">
              <div key={posts[key].id} className="post">
                <img src={posts[key].imageSrc} alt="Bami" />
              </div>

              <div id="aside">
                <div id="aside__user">
                  <div id="aside__user-info">
                    <img src={posts[key].writerPhoto} />
                    <span>{posts[key].writerName}</span>
                  </div>
                  <p id="aside__user__text">{posts[key].postContent}</p>
                </div>
                <DetailReply postId={posts[key].id} />
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
