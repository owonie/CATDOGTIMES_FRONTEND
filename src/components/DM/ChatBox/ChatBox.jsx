import React, { useEffect, useRef, useState } from 'react';
import Message from '../Message/Message';
import styles from './ChatBox.module.css';
import { useSelector } from 'react-redux';

const ChatBox = ({ messageRepository }) => {
  const [messages, setMessages] = useState({});
  const inRoom = useSelector((state) => state.userData.catdogtimes_inRoom);
  const roomId = useSelector((state) => state.userData.catdogtimes_roomId);
  const userId = useSelector((state) => state.userData.catdogtimes_userId);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    console.log('inroom', inRoom);
    if (inRoom === false) {
      return;
    }
    const stopSync = messageRepository.syncMessage(roomId, (docs) => {
      setMessages(docs);
    });
    return () => stopSync();
  }, [inRoom, roomId, messageRepository]);

  return (
    <section className={styles.chatBox} ref={scrollRef}>
      <div className={styles.container}>
        <ul className={styles.messages}>
          {Object.keys(messages).map((key) => (
            <Message key={key} message={messages[key]} userName={userId} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ChatBox;
