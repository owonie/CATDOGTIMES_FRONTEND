import React, { useState } from 'react';
import WalkMap from '../../components/WalkMap/WalkMap';
import styles from './Walk.module.css';

const Walk = (props) => {
  return (
    <>
      <header>walk page</header>
      <div className={styles.container}>
        <div className={styles.walkMap}>
          <WalkMap />
        </div>
      </div>
    </>
  );
};

export default Walk;
