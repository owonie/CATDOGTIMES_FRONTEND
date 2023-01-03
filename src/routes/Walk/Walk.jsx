import React, { useEffect, useRef, useState } from 'react';
import WalkMap from '../../components/WalkMap/WalkMap';
import styles from './Walk.module.css';

const Walk = (props) => {
  const [searchPlace, setSearchPlace] = useState();
  const searchRef = useRef();
  const [tabState, setTabState] = useState('검색');

  const handleTabStateChanged = (e) => {
    setTabState(e);
  };
  const handleSearchInput = () => {
    setSearchPlace(searchRef.current.value);
  };
  const handleExploreStateChanged = (theme) => {
    setSearchPlace(theme);
  };

  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState();

  const getCurrentLocation = () => {
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log('현재 위치', lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // 현재 위치 날씨 API 가져오기
  const getWeatherByCurrentLocation = (lat, lon) => {
    // &units=metric => 섭씨 사용
    const apiKey = 'dcb2faef4419a1705ca95578b43cfc10';
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.walkNavbar}>
          <div className={styles.navbarHeader}>
            <div className={styles.searchBarHeader}>
              <button className={styles.burgerButton}>
                <i className='fa-solid fa-bars fa-2x'></i>
              </button>
              <button className={styles.homeButton}>멍냥일보</button>
            </div>
            <div className={styles.searchBar}>
              <div className={styles.searchBox}>
                <input
                  id='ID'
                  data-testid='input-box'
                  placeholder='장소, 주소 검색'
                  type='text'
                  className={styles.searchInput}
                  ref={searchRef}
                />
                <button
                  className={styles.searchButton}
                  onClick={handleSearchInput}
                >
                  <i className='fa-solid fa-magnifying-glass'></i>
                </button>
              </div>
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
              <div className={styles.infoWeather}>
                <div className={styles.weatherBox}>
                  <div>
                    <i className='fa-solid fa-cloud-sun fa-2x'></i>
                    <span className={styles.infoWeatherTemp}>
                      {weather && Math.round(weather.main.temp)}°C
                    </span>
                  </div>
                  <div className={styles.infoWeatherDetail}>
                    <div>
                      <i class='fa-solid fa-wind fa-2x'></i>
                      <span>{weather && weather.wind.speed}m/s</span>
                    </div>
                    <div>
                      <i class='fa-solid fa-water fa-2x'></i>
                      <span>{weather && weather.main.humidity}%</span>
                    </div>
                    <div>
                      <i class='fa-solid fa-cloud fa-2x'></i>
                      <span>{weather && weather.clouds.all}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.infoAround}>
                <h3>주변 탐색</h3>
                <ul className={styles.infoAroundButtons}>
                  <li className={styles.infoAroundList}>
                    <button
                      className={styles.infoAroundButton}
                      onClick={() => handleExploreStateChanged('공원')}
                    >
                      <i class='fa-solid fa-tree fa-2x'></i>
                    </button>
                  </li>
                  <li className={styles.infoAroundList}>
                    <button
                      className={styles.infoAroundButton}
                      onClick={() => handleExploreStateChanged('애완동물카페')}
                    >
                      <i class='fa-solid fa-mug-saucer fa-2x'></i>
                    </button>
                  </li>
                  <li className={styles.infoAroundList}>
                    <button
                      className={styles.infoAroundButton}
                      onClick={() => handleExploreStateChanged('동물병원')}
                    >
                      <i class='fa-solid fa-hospital fa-2x'></i>
                    </button>
                  </li>
                  <li className={styles.infoAroundList}>
                    <button
                      className={styles.infoAroundButton}
                      onClick={() => handleExploreStateChanged('펫샵')}
                    >
                      <i class='fa-solid fa-bag-shopping fa-2x'></i>
                    </button>
                  </li>
                </ul>
                <div>{searchPlace}</div>
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
