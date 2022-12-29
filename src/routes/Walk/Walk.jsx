import React, { useRef, useState } from 'react';
import WalkMap from '../../components/WalkMap/WalkMap';
import styles from './Walk.module.css';

const Walk = (props) => {
  const [searchPlace, setSearchPlace] = useState();
  const [markerPositions, setMarkerPositions] = useState([]);
  const searchRef = useRef();
  const [tabState, setTabState] = useState('');

  const handleTabStateChanged = (e) => {
    setTabState(e);
  };
  const handleSearchInput = () => {
    setSearchPlace(searchRef.current.value);
  };
  return (
    <>
      <header>walk page</header>
      <div className={styles.container}>
        <div className={styles.walkNavbar}>
          <div>지도 네이게이션바</div>
          <div className={styles.navbarHeader}>
            <div className={styles.searchBarHeader}>
              <button className={styles.burgerButton}>햄버거</button>
              <button className={styles.homeButton}>멍냥일보</button>
            </div>
            <div className={styles.searchBar}>
              <div className={styles.searchBox}>
                <input
                  id='ID'
                  data-testid='input-box'
                  placeholder='장소, 주소, 버스 검색'
                  type='text'
                  className={styles.searchInput}
                  ref={searchRef}
                />
              </div>
              <button
                className={styles.searchButton}
                onClick={handleSearchInput}
              >
                검색버튼
              </button>
            </div>
            <div className={styles.navTabButton}>
              <button onClick={() => handleTabStateChanged('검색')}>
                검색
              </button>
              <button onClick={() => handleTabStateChanged('루트')}>
                루트
              </button>
              <button onClick={() => handleTabStateChanged('MY')}>MY</button>
            </div>
          </div>
          <div className={styles.navbarBody}>
            <div
              style={tabState === '검색' ? null : { display: 'none' }}
              className={styles.navigateTab}
            >
              <div className={styles.infoWeather}>이거슨 날씨여</div>
              <div className={styles.infoAround}>
                <h3>주변 탐색</h3>
                <ul className={styles.infoAroundButtons}>
                  <li className={styles.infoAroundList}>
                    <button className={styles.infoAroundButton}>
                      <span className={styles.infoAroundText}>공원</span>
                    </button>
                  </li>
                  <li className={styles.infoAroundList}>
                    <button className={styles.infoAroundButton}>
                      <span className={styles.infoAroundText}>반려카페</span>
                    </button>
                  </li>
                  <li className={styles.infoAroundList}>
                    <button className={styles.infoAroundButton}>
                      <span className={styles.infoAroundText}>동물병원</span>
                    </button>
                  </li>
                  <li className={styles.infoAroundList}>
                    <button className={styles.infoAroundButton}>
                      <span className={styles.infoAroundText}>펫 샵</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div
              style={tabState === '루트' ? null : { display: 'none' }}
              className={styles.directionsTab}
            >
              이건 길찾기
              <div className={styles.infoRouteSearchBox}>
                <div className={styles.infoRouteList}>
                  <div className={styles.infoRouteStart}>출발지</div>
                  <div className={styles.infoRouteVia}>경유지</div>
                  <div className={styles.infoRouteEnd}>도착지</div>
                </div>
              </div>
            </div>
            <div
              style={tabState === 'MY' ? null : { display: 'none' }}
              className={styles.myRouteTab}
            >
              이건 마이루트
            </div>
          </div>
        </div>
        <div className={styles.walkMap}>
          <WalkMap searchPlace={searchPlace} />
        </div>
      </div>
    </>
  );
};

export default Walk;
