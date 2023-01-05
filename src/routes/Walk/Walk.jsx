import { current } from '@reduxjs/toolkit';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WalkMap from '../../components/WalkMap/WalkMap';
import styles from './Walk.module.css';

const { kakao } = window;

const Walk = ({ weatherKey }) => {
  const navigate = useNavigate();
  const [searchPlace, setSearchPlace] = useState();
  const searchRef = useRef();
  const [tabState, setTabState] = useState('검색');
  const [routeList, setRouteList] = useState([
    [126.91819368838091, 36.98654607004041],
    [126.9209006816433, 36.98658394792954],
    [126.92080561346718, 36.980771888609524],
  ]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [myRouteList, setMyRouteList] = useState([]);

  const [kakaoMap, setKakaoMap] = useState(null);
  const [kakaoInfoWindow, setKakaoInfoWindow] = useState(null);
  const [kakaoMapTypeControl, setKakaoMapTypeControl] = useState(null);
  const [kakaoZoomControl, setKakaoZoomControl] = useState(null);
  const [kakaoPs, setKakaoPs] = useState(null);
  const [kakaoMapSettings, setKakaoMapSettings] = useState(false);
  const [markerPositions, setMarkerPositions] = useState([]);

  const container = useRef();

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

  useLayoutEffect(() => {
    const getCurrentLocation = () => {
      // 현재 위치 가져오기
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setCurrentLocation([lat, lon]);
        console.log('현재 위치', lat, lon);
        getWeatherByCurrentLocation(lat, lon);
      });
    };

    // 현재 위치 날씨 API 가져오기
    const getWeatherByCurrentLocation = (lat, lon) => {
      // &units=metric => 섭씨 사용
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
        });
    };
    getCurrentLocation();
  }, []);

  // 맵 및 초기설정 생성
  useEffect(() => {
    if (currentLocation === null) {
      console.log('currentlocation is null');
      return;
    }
    console.log(currentLocation);
    const options = {
      center: new kakao.maps.LatLng(currentLocation[0], currentLocation[1]),
      level: 3,
    };

    // infowindow객체, 맵, 검색, 컨트롤 객체 생성
    const map = new kakao.maps.Map(container.current, options);
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const ps = new kakao.maps.services.Places();
    const mapTypeControl = new kakao.maps.MapTypeControl();
    const zoomControl = new kakao.maps.ZoomControl();
    // 객체 상태저장 (재활용)
    setKakaoMap(map);
    setKakaoInfoWindow(infowindow);
    setKakaoPs(ps);
    setKakaoMapTypeControl(mapTypeControl);
    setKakaoZoomControl(zoomControl);
    console.log('맵 생성!');
  }, [container, currentLocation]);

  useEffect(() => {
    if (kakaoMap === null || kakaoMapSettings === true) {
      return;
    }
    setKakaoMapSettings(true);
    // 맵에 컨트롤러 추가
    kakaoMap.addControl(
      kakaoMapTypeControl,
      kakao.maps.ControlPosition.TOPRIGHT
    );
    kakaoMap.addControl(kakaoZoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마우스 이벤트 등록
    kakao.maps.event.addListener(kakaoMap, 'click', (mouseEvent) => {
      const latlng = mouseEvent.latLng;
      console.log(latlng);
    });

    // 컨트롤러, 마우스 이벤트 중복추가 방지
    setKakaoMapSettings(true);
  });

  useEffect(() => {
    if (kakaoPs === null) {
      return;
    }

    //검색 함수
    const placesSearchCB = (data, status) => {
      let bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }
      kakaoMap.setBounds(bounds);
      if (status === kakao.maps.services.Status.OK) {
        const newMarkerPositions = data.map((pos) => {
          return [pos.x, pos.y];
        });
        setMarkerPositions(newMarkerPositions);
      }
    };

    // 마커표시 함수
    const displayMarker = (place) => {
      let marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    };

    kakaoPs.keywordSearch(searchPlace, placesSearchCB);
  }, [searchPlace]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbarWrapper}>
          <div className={styles.walkNavbar}>
            <div className={styles.navbarHeader}>
              <div className={styles.searchBarHeader}>
                <button className={styles.burgerButton}>
                  <i className='fa-solid fa-bars '></i>
                </button>
                <button
                  className={styles.homeButton}
                  onClick={() => navigate('/post')}
                >
                  멍냥일보
                </button>
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
                        <i className='fa-solid fa-wind fa-2x'></i>
                        <span>{weather && weather.wind.speed}m/s</span>
                      </div>
                      <div>
                        <i className='fa-solid fa-water fa-2x'></i>
                        <span>{weather && weather.main.humidity}%</span>
                      </div>
                      <div>
                        <i className='fa-solid fa-cloud fa-2x'></i>
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
                        onClick={() => handleExploreStateChanged('안중 공원')}
                      >
                        <i className='fa-solid fa-tree fa-2x'></i>
                      </button>
                    </li>
                    <li className={styles.infoAroundList}>
                      <button
                        className={styles.infoAroundButton}
                        onClick={() =>
                          handleExploreStateChanged('주변 동물카페')
                        }
                      >
                        <i className='fa-solid fa-mug-saucer fa-2x'></i>
                      </button>
                    </li>
                    <li className={styles.infoAroundList}>
                      <button
                        className={styles.infoAroundButton}
                        onClick={() =>
                          handleExploreStateChanged('안중 동물병원')
                        }
                      >
                        <i className='fa-solid fa-hospital fa-2x'></i>
                      </button>
                    </li>
                    <li className={styles.infoAroundList}>
                      <button
                        className={styles.infoAroundButton}
                        onClick={() => handleExploreStateChanged('안중 펫샵')}
                      >
                        <i className='fa-solid fa-bag-shopping fa-2x'></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                style={tabState === '루트' ? null : { display: 'none' }}
                className={styles.directionsTab}
              >
                <div className={styles.infoRoute}>
                  <div className={styles.routeSearchBox}>
                    <ul className={styles.routeList}>
                      {Object.keys(routeList).map((key) => (
                        <div className={styles.routePointBox}>
                          <div className={styles.dragArea}>
                            <span className={styles.wayPoint}></span>
                          </div>
                          <div className={styles.wayPointWindow}>
                            <input
                              type='text'
                              className={styles.routeSearchInputBox}
                            />
                            <button className={styles.wayPointDeleteBtn}>
                              삭제
                            </button>
                          </div>
                          {routeList[key]}
                        </div>
                      ))}

                      <li className={styles.routeListItem}></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                style={tabState === 'MY' ? null : { display: 'none' }}
                className={styles.myRouteTab}
              ></div>
            </div>
          </div>
        </div>
        <div className={styles.walkMap}>
          <div id='container' ref={container} className={styles.mapComponent} />
          ;
        </div>
      </div>
    </>
  );
};

export default Walk;
