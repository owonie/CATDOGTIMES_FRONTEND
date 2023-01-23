import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AsideBox from '../../components/AsideBox/AsideBox';
import useWatchLocation from '../../hook/useWatchLocation';
import getAddressFromLocation from '../../services/getAddressFromLocation';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import styles from './Walk.module.css';
import WalkModal from '../../components/Walk/WalkModal';

const { kakao } = window;
const { Meta } = Card;
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const Walk = ({ weatherKey, routeRepository }) => {
  const navigate = useNavigate();
  const [searchPlace, setSearchPlace] = useState();
  const searchRef = useRef();
  const [tabState, setTabState] = useState('검색');
  const [routeList, setRouteList] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [realRoute, setRealRoute] = useState([{}]);
  const [myRouteList, setMyRouteList] = useState([]);

  const [kakaoMap, setKakaoMap] = useState(null);
  const [kakaoInfoWindow, setKakaoInfoWindow] = useState(null);
  const [kakaoMapTypeControl, setKakaoMapTypeControl] = useState(null);
  const [kakaoZoomControl, setKakaoZoomControl] = useState(null);
  const [kakaoPs, setKakaoPs] = useState(null);
  const [kakaoMapSettings, setKakaoMapSettings] = useState(false);
  const [kakaoDrawingManager, setKakaoDrawingManager] = useState(null);
  const [kakaoToolbox, setKakaoToolbox] = useState(null);

  const [posImage, setPosImage] = useState(null);

  const [departuresPoint, setDeparturesPoint] = useState(null);
  const [arrivalsPoint, setArrivalsPoint] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState();

  const [isWalking, setIsWalking] = useState(false);
  const [userPolyline, setUserPolyline] = useState(null);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const { location, cancleLocationWatch, error } =
    useWatchLocation(geolocationOptions);

  const posmarkerImageUrl =
      'http://pixelart.pe.kr/data/editor/2010/20201016164213_b6e7bde336df07f9a972e6a4f1933c45_6t89.gif',
    posmarkerImageSize = new kakao.maps.Size(55, 55), // 마커 이미지의 크기
    posmarkerImageOptions = {
      offset: new kakao.maps.Point(20, 20), // 마커 좌표에 일치시킬 이미지 안의 좌표
    };

  const strokeColor = '#b3ecee',
    fillColor = '#cce6ff',
    fillOpacity = 0.3,
    hintStrokeStyle = 'dash';
  // drawing manager 옵션 설정

  const container = useRef();

  const userId = useSelector((state) => state.userData.catdogtimes_userId);

  // 위치 입력 함수

  // route 데이터 관련
  const getRouteList = () => {
    routeRepository.getRouteList(userId, (data) => {
      const event = data;
      setMyRouteList(event);
    });
  };

  const getRoute = (routeId) => {
    routeRepository.getRoute(routeId, (data) => {
      const event = data;
      setMyRouteList(event);
    });
  };

  // 작성중

  const handleTabStateChanged = (e) => {
    setTabState(e);
    // if (tabState === '루트') {
    //   createCenterMarker();
    // }
  };
  const handleSearchInput = () => {
    setSearchPlace(searchRef.current.value);
  };
  const handleExploreStateChanged = (theme) => {
    setSearchPlace(theme);
  };
  const pointsToPath = (points) => {
    let len = points.length,
      path = [],
      i = 0;
    for (; i < len; i++) {
      let latlng = new kakao.maps.LatLng(points[i].y, points[i].x);
      path.push(latlng);
    }

    return path;
  };

  // route drawing data
  const handleData = () => {
    const data = kakaoDrawingManager.getData();
    if (data.marker.length === 0) {
      console.log('출발지와 도착지를 정해주세요!');
      return;
    }
    if (data.marker.length === 1) {
      console.log('출발지와 도착지가 동일합니다.');
    }

    console.log(data);
    getAddressFromLocation(data.marker[0].x, data.marker[0].y).then((data) => {
      setDeparturesPoint(data);
    });
    getAddressFromLocation(
      data.marker[data.marker.length - 1].x,
      data.marker[data.marker.length - 1].y
    ).then((data) => {
      setArrivalsPoint(data);
    });
    const route = {
      photoURL: '',
      name: 'test2',
      type: 'history',
      routeNo: 1,
    };
    routeRepository.saveRoute(route, data);
    // 산책 시작
    setIsWalking(true);
    // setRealRoute([{ y: currentLocation[0], x: currentLocation[1] }]);
    const testRoute = [
      { y: 36.9936926, x: 126.9218479 },
      { y: 36.98859349105513, x: 126.92108955856537 },
      { y: 36.98151095733185, x: 126.9210744097322 },
      {
        y: 36.981642977147246,
        x: 126.91648047573365,
      },
      { y: 36.98912176569058, x: 126.91618024494058 },
    ];
    setRealRoute(testRoute);
    console.log(realRoute);
  };

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

    // 유저 현재위치 마커 이미지
    const userPosMarkerImage = new kakao.maps.MarkerImage(
      posmarkerImageUrl,
      posmarkerImageSize,
      posmarkerImageOptions
    );

    // 유저 실 경로
    const polyline = new kakao.maps.Polyline({
      path: [], // 선을 구성하는 좌표배열 입니다
      strokeWeight: 10, // 선의 두께 입니다
      strokeColor: '#de8ae1', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일입니다
      zIndex: 100,
    });
    polyline.setMap(map);
    setUserPolyline(polyline);

    // 객체 상태저장 (재활용)
    setKakaoMap(map);
    setKakaoInfoWindow(infowindow);
    setKakaoPs(ps);
    setKakaoMapTypeControl(mapTypeControl);
    setKakaoZoomControl(zoomControl);
    setPosImage(userPosMarkerImage);

    const drawingManagerOptions = {
      map: map,
      drawingMode: [
        kakao.maps.Drawing.OverlayType.MARKER,
        kakao.maps.Drawing.OverlayType.ARROW,
        kakao.maps.Drawing.OverlayType.RECTANGLE,
        kakao.maps.Drawing.OverlayType.CIRCLE,
        kakao.maps.Drawing.OverlayType.POLYGON,
      ],
      // 사용자에게 제공할 그리기 가이드 툴팁입니다
      // 사용자에게 도형을 그릴때, 드래그할때, 수정할때 가이드 툴팁을 표시하도록 설정합니다
      guideTooltip: ['draw', 'drag', 'edit'],
      markerOptions: {
        draggable: true,
        removable: true,
      },
      arrowOptions: {
        draggable: true,
        removable: true,
        strokeColor: strokeColor,
        hintStrokeStyle: hintStrokeStyle,
        strokeWeight: 16,
        strokeOpacity: 0.8,
      },
      rectangleOptions: {
        draggable: true,
        removable: true,
        strokeColor: strokeColor,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
      },
      circleOptions: {
        draggable: true,
        removable: true,
        strokeColor: strokeColor,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
      },

      polygonOptions: {
        draggable: true,
        removable: true,
        strokeColor: strokeColor,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
      },
    };

    const drawingManager = new kakao.maps.Drawing.DrawingManager(
      drawingManagerOptions
    );

    setKakaoDrawingManager(drawingManager);
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

    //drawing manager 컨트롤러 등록
    const toolbox = new kakao.maps.Drawing.Toolbox({
      drawingManager: kakaoDrawingManager,
    });
    setKakaoToolbox(toolbox);
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
    };

    // 검색기능 마커표시 함수
    const displayMarker = (place) => {
      let marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    };

    kakaoPs.keywordSearch(searchPlace, placesSearchCB);
  }, [searchPlace]);

  // 현재위치 받아오기

  useEffect(() => {
    if (!location) return;
    setTimeout(() => {
      cancleLocationWatch();
    }, 3000);
  }, []);

  // 현재위치 표시
  useEffect(() => {
    if (!kakaoMap) {
      return;
    }
    if (!userMarker && location) {
      let marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: new kakao.maps.LatLng(location.latitude, location.longitude),
        image: posImage,
        draggable: true,
      });
      setUserMarker(marker);
      return;
    }
    userMarker.setPosition(
      new kakao.maps.LatLng(location.latitude, location.longitude)
    );

    const point = { y: location.latitude, x: location.longitude };
    // 산책 중 실 경로 저장

    if (isWalking) {
      setRealRoute([...realRoute, point]);
      userPolyline.setPath(pointsToPath(realRoute));
      console.log(pointsToPath(realRoute));
    }
    console.log('위치변경!:', point.y, point.x);

    // 산책 중 실시간 위치 드로잉
  }, [location, isWalking]);

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
                    <button onClick={() => handleData()}>산책루트 확인</button>

                    <ul className={styles.routeList}>
                      {location != null && (
                        <div>{`현재위치 - 위도:${location.latitude},경도:${location.longitude}`}</div>
                      )}
                      {departuresPoint != null && (
                        <div>{`출발위치 :${departuresPoint}`}</div>
                      )}
                      {arrivalsPoint != null && (
                        <div>{`도착위치 :${arrivalsPoint}`}</div>
                      )}
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
              >
                <Card
                  style={{
                    width: 300,
                  }}
                  cover={
                    <img
                      alt='example'
                      className={styles.myRouteCover}
                      src='./img/bami.jpg'
                    />
                  }
                  actions={[
                    <SettingOutlined key='setting' />,
                    <EditOutlined key='edit' />,
                    <EllipsisOutlined key='ellipsis' />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src='./img/bami.jpg' />}
                    title='바미의 산책루트'
                    description='Owon'
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.walkMap}>
          <button className={styles.button}>
            <span className={styles.span}>
              <WalkModal
                kakaoMap={kakaoMap}
                kakaoDrawingManager={kakaoDrawingManager}
                kakao={kakao}
                kakaoToolbox={kakaoToolbox}
                isWalking={isWalking}
                setIsWalking={setIsWalking}
              />
            </span>
          </button>
          <div id='container' ref={container} className={styles.mapComponent} />
        </div>
        <aside id='asideBox'>
          <AsideBox />
        </aside>
      </div>
    </>
  );
};

export default Walk;
