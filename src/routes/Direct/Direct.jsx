import React, { useState, useEffect, useRef } from 'react';
import ChatBox from '../../components/DM/ChatBox/ChatBox';
import NavBar from '../../components/NavBar/NavBar';
import { serverTimestamp } from 'firebase/firestore';
import styles from './Direct.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateRoomId, updateInRoom } from '../../reducers/userData';
import { Button, Modal } from 'antd';

const DirectMessage = ({ roomRepository, messageRepository }) => {
  const imgPath = 'http://localhost:8088/times/resources/upload/';
  const [rooms, setRooms] = useState({});
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userData.catdogtimes_userId);
  const displayName = useSelector(
    (state) => state.userData.catdogtimes_displayName
  );
  const memberPhoto = useSelector((state) => state.memberInfo.data.memberPhoto);
  const roomId = useSelector((state) => state.userData.catdogtimes_roomId);
  const inRoom = useSelector((state) => state.userData.catdogtimes_inRoom);
  const photoURL = useSelector((state) => state.userData.catdogtimes_photoURL);
  const accessToken = useSelector(
    (state) => state.userData.catdogtimes_accessToken
  );
  const refreshToken = useSelector(
    (state) => state.userData.catdogtimes_refreshToken
  );
  const messageRef = useRef();
  const formRef = useRef();
  const [roomName, setRoomName] = useState('');
  const [open, setOpen] = useState(false); //팔로 모달
  const [followlist, setFollowlist] = useState(); //팔로 리스트

  const showModal = () => {
    setOpen(true);
    console.log(followlist);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const followers = () => {
    console.log(userId);
    let reqdata = {
      type: 'follower',
      memberNo: parseInt(userId),
    };
    const loadData = async () => {
      const response = await fetch(`/mypage/followSearch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: accessToken,
        },
        body: JSON.stringify(reqdata),
      });
      let data = await response.json();

      if (response.status === 401) {
        console.log(401);
        const res = await fetch(`/mypage/followSearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ACCESS_TOKEN: accessToken,
            REFRESH_TOKEN: refreshToken,
          },
          body: JSON.stringify(reqdata),
        });
        data = await res.json();
      }
      setFollowlist(data);
      showModal();
    };
    loadData();
  };

  // 방 추가
  const addRoom = (room, pfp, memberNickname) => {
    // photoURL에는 상대방 프로필사진 요
    roomRepository.saveRoom(userId, room, pfp, memberNickname);
    messageRepository.initMessage(userId, room);
    dispatch(updateRoomId(room));
    joinRoom(room);
  };

  // 방 입장
  const joinRoom = (room) => {
    console.log(room);
    roomRepository.getRoom(userId, room, (data) => {
      const event = data;
      if (event === true) {
        dispatch(updateRoomId(room));
        dispatch(updateInRoom(true));
        // messageRepository.initMessage(userId, room);
        console.log('direct page room coming');
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const message = {
      userId: userId,
      roomId: roomId,
      content: messageRef.current.value,
      time: serverTimestamp(),
      displayName: displayName,
      photoURL: `${imgPath}${memberPhoto}`,
    };
    messageRepository.saveMessage(userId, message);
    formRef.current.reset();
  };
  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (messageRef.current.value.trim() === '') {
        return event.preventDefault();
      }
      onSubmit(event);
    }
  };

  useEffect(() => {
    console.log('inroom', inRoom);

    const stopSync = roomRepository.syncDmList(userId, (docs) => {
      setRooms(docs);
    });
    return () => stopSync();
  }, [roomRepository]);

  return (
    <div className={styles.DM}>
      <nav className={styles.navbar}>
        <NavBar />
      </nav>
      <section className={styles.center}>
        <div className={styles.wrapper}>
          <div className={styles.dmListBar}>
            <div className={styles.dmListHeader}>
              <div>
                {displayName}
                <button
                  onClick={() => {
                    followers();
                    console.log('rooms', rooms);
                  }}
                  className={styles.newMessageButton}
                >
                  new message
                </button>
              </div>
            </div>
            <div className={styles.dmList} ref={scrollRef}>
              <div className={styles.dmContainer}>
                <ul className={styles.rooms}>
                  {Object.keys(rooms).map((key) => (
                    <li
                      key={key}
                      className={styles.room}
                      onClick={() => {
                        joinRoom(rooms[key].roomId);
                        setRoomName(rooms[key].roomName);
                      }}
                    >
                      <div className={styles.roomInfo}>
                        <img
                          className={styles.dmThumbnail}
                          src={rooms[key].photoURL}
                          alt='dm thumbnail'
                          referrerPolicy='no-referrer'
                        />
                        <div className={styles.dmDetail}>
                          {rooms[key].roomName}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.chatRoom}>
            <div className={styles.chatHeader}>
              <div className={styles.oppenentUserId}>
                <button>{roomName}</button>
              </div>
            </div>
            <div className={styles.chatBox}>
              {' '}
              {followlist === null ? (
                'NoData'
              ) : (
                <Modal
                  open={open}
                  onOk={handleCancel}
                  onCancel={handleCancel}
                  footer={[]}
                >
                  <h3>
                    {followlist && followlist.length > 0
                      ? followlist[0].type
                      : ''}
                  </h3>
                  <ul className='followlist' style={{ overflow: 'none ' }}>
                    {followlist && followlist.length > 0
                      ? followlist.map((da, i) => (
                          <li key={i} className='d-flex'>
                            <a href='#' className='d-flex'>
                              <span className='thum'>
                                <img
                                  src={`${imgPath}${da.memberPhoto}`}
                                  alt={da.memberNickname}
                                />
                              </span>
                              <span
                                className='ptitle'
                                style={{ width: '250px' }}
                              >
                                {da.memberNickname}
                              </span>
                              <Button
                                key='submit'
                                type='primary'
                                style={{
                                  backgroundColor: '#e48663',
                                }}
                                onClick={() => {
                                  const pfp = `${imgPath}${da.memberPhoto}`;
                                  addRoom(da.memberNo, pfp, da.memberNickname);

                                  setOpen(false);
                                }}
                              >
                                <span>대화 하기</span>
                              </Button>
                            </a>
                          </li>
                        ))
                      : 'NoData'}
                  </ul>
                </Modal>
              )}
              <ChatBox messageRepository={messageRepository} />
            </div>
            <div className={styles.messageInput}>
              <div className={styles.inputMessage}>
                <form className={styles.inputForm} ref={formRef} action=''>
                  <textarea
                    className={styles.textArea}
                    ref={messageRef}
                    row='4'
                    onKeyPress={onKeyPress}
                  ></textarea>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DirectMessage;
