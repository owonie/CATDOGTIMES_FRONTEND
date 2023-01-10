import React, { useEffect, useRef } from 'react';
import Message from '../Message/Message';
import { serverTimestamp } from 'firebase/firestore';
import styles from './ChatBox.module.css';
import { useSelector } from 'react-redux';

const ChatBox = ({ sendMessage, messages, messageRepository }) => {
  const userId = useSelector((state) => state.userData.catdogtimes_userId);
  const displayName = useSelector(
    (state) => state.userData.catdogtimes_displayName
  );
  const roomId = useSelector((state) => state.userData.catdogtimes_roomId);
  const photoURL = useSelector((state) => state.userData.catdogtimes_photoURL);

  const messageRef = useRef();
  const formRef = useRef();
  const scrollRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const message = {
      userId: userId,
      roomId: roomId,
      content: messageRef.current.value,
      time: serverTimestamp(),
      displayName: displayName,
      photoURL: photoURL,
    };
    sendMessage(message, scrollRef);
    formRef.current.reset();
  };
  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (messageRef.current.value.trim() == '') {
        return event.preventDefault();
      }
      onSubmit(event);
    }
  };

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);
  return (
    <section className={styles.chatBox}>
      <div className={styles.container}>
        <ul className={styles.messages} ref={scrollRef}>
          <li>안녕하세요</li>
          <li>안녕하세요</li>
          <li>안녕하세요</li>
          <li>안녕하세요</li>
          <li>안녕하세요</li>
          <li>안녕하세요</li>
          <li>안녕하세요</li>
          <li>안녕하세요</li>
          <li>안녕하세요</li>
          <li>안녕하세요</li>
          {messages &&
            Object.keys(messages).map((key) => (
              <Message key={key} message={messages[key]} userName={userId} />
            ))}
        </ul>
        <div className={styles.messageInput}>
          <div className={styles.inputMessage}>
            <form className={styles.inputForm} ref={formRef} action=''>
              <textarea
                className={styles.textArea}
                ref={messageRef}
                row='4'
                onKeyUp={() => onKeyPress}
              ></textarea>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatBox;
