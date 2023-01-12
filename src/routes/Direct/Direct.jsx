import React, { useState, useEffect } from 'react';
import ChatBox from '../../components/DM/ChatBox/ChatBox';
import NavBar from '../../components/NavBar/NavBar';
import styles from './Direct.module.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  updateRoomId,
  updateInRoom,
  updateLocation,
} from '../../reducers/userData';

const DirectMessage = ({ roomRepository, messageRepository }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userData.catdogtimes_userId);
  const roomId = useSelector((state) => state.userData.catdogtimes_roomId);

  // 방추가
  const addRoom = (room) => {
    roomRepository.saveRoom(userId, room);
    messageRepository.initMessage(room);
  };

  // 방 입장
  const joinRoom = (room) => {
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
            <div className={styles.dmList}>
              <ul>
                <li>사람1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
              </ul>
            </div>
          </div>
          <div className={styles.chatRoom}>
            <div className={styles.chatHeader}>
              <div className={styles.yourProfile}>
                <button className={styles.yourProfileButton}>Gowon</button>
              </div>
            </div>
            <div className={styles.chatBox}>
              <ChatBox messageRepository={messageRepository} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DirectMessage;
