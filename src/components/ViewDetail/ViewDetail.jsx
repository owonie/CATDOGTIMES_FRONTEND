import React, { useState } from "react";
import "./ViewDetail.css";

const ViewDetail = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      imageSrc: "/img/bami.jpg",
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
      <div className={`modal-overlay ${isOpen ? "modal-open" : "modal-closed"}`}>
        <div className="modal-footer">
          <a onClick={hideModal} href="#">
            <i className="fas fa-times fa-xl"></i>
          </a>
        </div>
        <div className="modal-content">
          <div className="modal-body">
            {posts.map((post) => (
              <div key={post.id} className="post">
                <img src={post.imageSrc} alt="Bami" />
              </div>
            ))}
            <div id="aside">
              <div id="aside__user">
                <div id="aside__user-info">
                  <img src="/img/bami.jpg" />
                  <span>Bami</span>
                </div>
                <p id="aside__user__text">새해복 많이 받으라냥</p>
              </div>
              <div className="comment">
                <div className="comment__customer">
                  <div className="comment__customer__column">
                    <img src="/img/doge.jpg" className="comment__customer__avatar" />
                    <div className="comment__customer__text">
                      <h4 className="comment__customer__title">
                        도지
                        <span className="comment__customer__content"> 너도 많이 받개</span>
                      </h4>
                      <h6 className="comment__customer__subtitle">좋아요 2명</h6>
                    </div>
                  </div>
                  <div className="comment__customer__column">
                    <i className="far fa-heart"></i>
                  </div>
                </div>

                <div className="comment__customer">
                  <div className="comment__customer__column">
                    <img src="/img/doge.jpg" className="comment__customer__avatar" />
                    <div className="comment__customer__text">
                      <h4 className="comment__customer__title">
                        도지
                        <span className="comment__customer__content"> 너도 많이 받개</span>
                      </h4>
                      <h6 className="comment__customer__subtitle">좋아요 2명</h6>
                    </div>
                  </div>
                  <div className="comment__customer__column">
                    <i className="far fa-heart"></i>
                  </div>
                </div>

                <div className="comment__customer">
                  <div className="comment__customer__column">
                    <img src="/img/doge.jpg" className="comment__customer__avatar" />
                    <div className="comment__customer__text">
                      <h4 className="comment__customer__title">
                        도지
                        <span className="comment__customer__content"> 너도 많이 받개</span>
                      </h4>
                      <h6 className="comment__customer__subtitle">좋아요 2명</h6>
                    </div>
                  </div>
                  <div className="comment__customer__column">
                    <i className="far fa-heart"></i>
                  </div>
                </div>
              </div>
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
                <input defaultValue="" type="text" placeholder="댓글..." className="commentInput2" />
                <button>게시</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDetail;
