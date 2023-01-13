import React, { useState, useEffect, useRef } from 'react';
import ChatBox from '../../components/DM/ChatBox/ChatBox';
import NavBar from '../../components/NavBar/NavBar';

import { serverTimestamp } from 'firebase/firestore';
import styles from './Direct.module.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  updateRoomId,
  updateInRoom,
  updateLocation,
} from '../../reducers/userData';

const DirectMessage = ({ roomRepository, messageRepository }) => {
  const [rooms, setRooms] = useState({});
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userData.catdogtimes_userId);
  const displayName = useSelector(
    (state) => state.userData.catdogtimes_displayName
  );
  const roomId = useSelector((state) => state.userData.catdogtimes_roomId);
  const inRoom = useSelector((state) => state.userData.catdogtimes_inRoom);
  const photoURL = useSelector((state) => state.userData.catdogtimes_photoURL);

  const messageRef = useRef();
  const formRef = useRef();

  // 방 추가
  const addRoom = (room) => {
    // photoURL에는 상대방 프로필사진 요
    roomRepository.saveRoom(userId, room, photoURL);
    messageRepository.initMessage(room);
  };

  // 방 입장
  const joinRoom = (room) => {
    console.log(room);
    roomRepository.getRoom(room, (data) => {
      const event = data;
      if (event === true) {
        dispatch(updateRoomId(room));
        //   dispatch(updateLocation('room'));
        dispatch(updateInRoom(true));
        messageRepository.initMessage(room);
        console.log('direct page room coming');
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const message = {
      userId: 'Dev_Owon',
      roomId: roomId,
      content: messageRef.current.value,
      time: serverTimestamp(),
      displayName: '도원',
      photoURL: '/img/dog1.jpg',
    };
    messageRepository.saveMessage(message);
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
    const stopSync = roomRepository.syncDmList((docs) => {
      setRooms(docs);
    });
    return () => stopSync();
  }, [inRoom, roomRepository]);

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
                Dev_Owon
                <button
                  onClick={() => joinRoom('chatroom')}
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
                      onClick={() => joinRoom(rooms[key].roomId)}
                    >
                      <div className={styles.roomInfo}>
                        <img
                          className={styles.dmThumbnail}
                          src={rooms[key].photoURL}
                          alt='dm thumbnail'
                          referrerPolicy='no-referrer'
                        />
                        <div className={styles.dmDetail}>
                          {rooms[key].roomId}
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
                <button>{roomId}</button>
              </div>
            </div>
            <div className={styles.chatBox}>
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
