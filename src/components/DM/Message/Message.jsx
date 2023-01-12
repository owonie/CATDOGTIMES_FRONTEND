import React from 'react';
import styles from './Message.module.css';

const Message = ({ message, userName }) => {
  const { content, userId, displayName, photoURL } = message;
  return (
    <li className={userId === userName ? styles.myMessages : styles.messages}>
      <img
        className={styles.avatar}
        src={photoURL}
        alt='profile photo'
        referrerPolicy='no-referrer'
      />
      <div className={styles.message}>
        <h1 className={userId === userName ? styles.myUserId : styles.userId}>
          {displayName}
        </h1>
        <p className={userId === userName ? styles.myContent : styles.content}>
          {content}
        </p>
      </div>
    </li>
  );
};

export default Message;
