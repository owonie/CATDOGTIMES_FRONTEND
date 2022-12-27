import React, { useEffect } from 'react';
import styles from './WalkMap.module.css';

const { kakao } = window;

const WalkMap = (props) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mapWrapper}>
          <div id='map' className={styles.walkMap}></div>
        </div>
      </div>
    </>
  );
};

export default WalkMap;
