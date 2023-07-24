import React, { useEffect, useState } from "react";

const MapComponent = ({ searchResults }) => {
  const [initialized, setInitialized] = useState(false);
  const [mapObject, setMapObject] = useState();
  const [markers, setMakers] = useState([]);

  useEffect(() => {
    var container = document.getElementById("map");

    window.kakao.maps.load(() => {
      if (!initialized) {
        setInitialized(true);
        const options = {
          center: new window.kakao.maps.LatLng(
            37.5858280343867,
            126.995896931187
          ),
          level: 2,
          preventDraggable: true,
          zoomControl: true,
        };

        const map = new window.kakao.maps.Map(container, options);
        setMapObject(map);
      }
    });
  }, []);

  useEffect(() => {
    if (initialized && searchResults !== []) {
      removeMarkers();

      // 새로운 경계 생성
      const bounds = new window.kakao.maps.LatLngBounds();

      var newMarkers = [];
      searchResults.forEach((item) => {
        // 마커를 생성합니다
        const position = new window.kakao.maps.LatLng(item.y, item.x);
        var marker = new window.kakao.maps.Marker({
          map: mapObject,
          position: position,
        });

        bounds.extend(position); // bound에 좌표를 추가합니다.

        marker.setMap(mapObject); // 마커가 지도 위에 표시되도록 설정합니다

        newMarkers.push(marker); // 마커를 배열에 저장합니다.
      });
      mapObject.setBounds(bounds);
      setMakers(newMarkers);
    }
  }, [searchResults]);

  const removeMarkers = () => {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMakers([]);
  };

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
