import React, { useEffect, useState } from "react";

const MapComponent = ({ location }) => {
  const [initialized, setInitialized] = useState(false);
  const [mapObject, setMapObject] = useState(null);
  const [infoWindowObject, setInfoWindowObject] = useState(null);
  const [placeObject, setPlaceObject] = useState();
  const [boundObject, setBoundOBject] = useState();

  const markers = [];

  useEffect(() => {
    var container = document.getElementById("map");

    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(37.2965, 126.9717),
        level: 5,
        preventDraggable: true,
        zoomControl: true,
      };

      const map = new window.kakao.maps.Map(container, options);
      setMapObject(map);
      const place = new window.kakao.maps.services.Places();
      setPlaceObject(place);
      const info = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      setInfoWindowObject(info);
      const bounds = new window.kakao.maps.LatLngBounds();
      setBoundOBject(bounds);

      setInitialized(true);
    });
  }, []);

  useEffect(() => {
    function placesSearchCB(data, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        console.log(`success!`);
        console.log(data);
        displayPlace(data);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }

    function displayPlace(places) {
      for (var i = 0; i < places.length; i++) {
        var placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x
          ),
          marker = addMarker(placePosition, i);
      }
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new window.kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(mapObject); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    if (initialized && location !== "" && location !== null) {
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      placeObject.keywordSearch(location, placesSearchCB);
    }
  }, [location, initialized, placeObject]);

  const getMapClick = (e) => {
    console.log(`click!`);
  };

  return (
    <div
      id="map"
      onClick={getMapClick}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default MapComponent;
