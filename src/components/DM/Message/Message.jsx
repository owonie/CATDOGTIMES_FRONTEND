import React from 'react';
import styles from './Message.module.css';

const Message = ({ message, userName }) => {
  const { content, userId, displayName, photoURL } = message;
  return (
    <li className={userId === 'Dev_Owon' ? styles.myMessages : styles.messages}>
      <img
        className={styles.avatar}
        src={photoURL}
        alt='profile photo'
        referrerPolicy='no-referrer'
      />
      <div className={styles.message}>
        <div
          className={
            userId === 'Dev_Owon'
              ? styles.myMessageWrapper
              : styles.messageWrapper
          }
        >
          <div
            className={userId === userName ? styles.myContent : styles.content}
          >
            {content}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Message;
