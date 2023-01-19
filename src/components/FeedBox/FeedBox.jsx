import React, { useEffect, useState } from 'react';
import './feedbox.css';
import '../ViewDetail/ViewDetail.css';
import ViewDetail from '../ViewDetail/ViewDetail';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Comment from '../Comment/Comment';
import Settings from '../Settings/Settings';
import ShareButton2 from '../Share/Share2';
import CommentInputBox from '../CommentInputBox/CommentInputBox';
import { useSelector } from 'react-redux';
import Like from './Like';

const FeedBox = () => {
  const [feeds, setFeeds] = useState([]);
  const accessToken = useSelector(
    (state) => state.userData.catdogtimes_accessToken
  );
  const refreshToken = useSelector(
    (state) => state.userData.catdogtimes_refreshToken
  );

  //이미지 src
  const imgPath = 'http://localhost:8088/times/resources/upload/';

  console.log(feeds);

  useEffect(() => {
    // try {
    //   const loadData = async () => {
    //     const response = await axios(
    //       {
    //         method: 'GET',
    //         url: 'post/list',
    //         headers: {
    //           ACCESS_TOKEN: accessToken,
    //         },
    //       },
    //       { withCredentials: true }
    //     );

    //     setFeeds(response.data);
    //   };

    //   loadData();
    // } catch (error) {
    //   console.log(error);
    // }
    const loadData = async () => {
      const response = await fetch(`post/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: accessToken,
        },
      });
      let data = await response.json();

      if (response.status === 401) {
        const res = await fetch(`post/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ACCESS_TOKEN: accessToken,
            REFRESH_TOKEN: refreshToken,
          },
        });
        data = await res.json();
      }
      setFeeds(data);
    };
    loadData();
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
          <section className='feedBox' key={feeds[key].feedId}>
            <div className='feedTop'>
              <div className='feedTopLeft' onClick={linkClick}>
                <img src={imgPath + feeds[key].writerPhoto} alt='writer' />
                <div>{feeds[key].writerName}</div>
              </div>
              <div className='feedTopRight'>
                <Settings feedId={feeds[key].feedId} />
              </div>
            </div>
            <article className='feedMiddleImg'>
              <img src={imgPath + feeds[key].feedImage} alt='feed' />
            </article>
            <div className='feedBottom'>
              <div className='bottomMenu'>
                <div className='bottomMenuLeft'>
                  <Like postId={feeds[key].feedId} />
                  <ViewDetail
                    id={feeds[key].feedId}
                    imgSrc={imgPath + feeds[key].feedImage}
                    writerPhoto={imgPath + feeds[key].writerPhoto}
                    writerName={feeds[key].writerName}
                    postContent={feeds[key].feedContent}
                  />
                  <ShareButton2 />
                </div>
                <div className='bottomMenuRight'>
                  <i className='far fa-bookmark fa-lg'></i>
                </div>
              </div>
              <div className='like'>
                <img src={imgPath + feeds[key].likerPhoto} alt='liker' />
                <span className='userName'>{feeds[key].likerName}</span>님 외{' '}
                {feeds[key].postLikeCount}명이 좋아합니다
              </div>
              <div className='postContent'>
                <span className='writer_nickname'>{feeds[key].writerName}</span>
                <span className='writer_comment'>{feeds[key].feedContent}</span>
              </div>
            </div>
            <section className='reply'>
              <div className='commentContainer'>
                <div className='commentCount'>댓글 3개</div>
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
