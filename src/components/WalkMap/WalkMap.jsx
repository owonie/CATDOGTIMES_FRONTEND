import React, { useEffect, useRef, useState } from 'react';
import styles from './WalkMap.module.css';

const { kakao } = window;

const WalkMap = ({ searchPlace }) => {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [kakaoInfoWindow, setKakaoInfoWindow] = useState(null);
  const [kakaoMapTypeControl, setKakaoMapTypeControl] = useState(null);
  const [kakaoZoomControl, setKakaoZoomControl] = useState(null);
  const [kakaoPs, setKakaoPs] = useState(null);
  const [kakaoMapSettings, setKakaoMapSettings] = useState(false);

  const [markerPositions, setMarkerPositions] = useState([]);
  const [markers, setMarkers] = useState([]);

  const container = useRef();
  // 맵 및 초기설정 생성
  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(36.97320659, 126.938864432),
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
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null || kakaoMapSettings === true) {
      return;
    }
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
    kakaoPs.keywordSearch(searchPlace, placesSearchCB, {
      position: new kakao.maps.LatLng(36.97320659, 126.938864432),
    });
  }, [searchPlace]);

  // 마커표시 함수
  // useEffect(() => {
  // if (kakaoMap === null) {
  //   return;
  // }
  // const positions = markerPositions.map(
  //   (pos) => new kakao.maps.LatLng(...pos)
  // );
  // console.log('positions:', positions);
  // let marker = new kakao.maps.Marker({
  //   position: new kakao.maps.LatLng(33.450701, 126.570667),
  // });
  // marker.setMap(kakaoMap);
  // setMarkers(marker);
  // 포지션 정상출력
  // setMarkers((markers) => {
  //   markers.forEach((marker) => marker.setMap(null));
  //   return positions.map(
  //     (position) =>
  //       new kakao.maps.Marker({
  //         map: kakaoMap,
  //         position,
  //       })
  //   );
  // });
  //여기 위에 위치설정이 문제
  // if (positions.length > 0) {
  //   const bounds = positions.reduce(
  //     (bounds, latlng) => bounds.extend(latlng),
  //     new kakao.maps.LatLngBounds()
  //   );
  //   kakaoMap.setBounds(bounds);
  // }
  // }, [markerPositions]);

  return <div id='container' ref={container} className={styles.walkMap} />;
};
export default WalkMap;
