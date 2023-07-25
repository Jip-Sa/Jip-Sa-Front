import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import BuildingInfoPage from "./buildingInfoPage";

const MapComponent = ({ searchResults }) => {
  const [initialized, setInitialized] = useState(false);
  const [mapObject, setMapObject] = useState();
  const [geoObject, setGeoObject] = useState();
  const [baseMarkers, setBaseMarkers] = useState();
  const [searchedMarkers, setSearchedMarkers] = useState([]);
  const [showBuildingInfo, setShowBuildingInfo] = useState(false);
  const [mapDatas, setMapDatas] = useState([]);
  const [clickedPlaceName, setClickedPlaceName] = useState("");
  const [clickedGu, setClickedGu] = useState("");
  const [clickedDong, setClickedDong] = useState("");
  const [clickedJibun, setClickedJibun] = useState("");

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
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new window.kakao.maps.services.Geocoder();
        setGeoObject(geocoder);

        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent) {
            // 클릭한 위도, 경도 정보를 가져옵니다
            var latlng = mouseEvent.latLng;

            var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
            message += "경도는 " + latlng.getLng() + " 입니다";

            console.log(message);
            console.log(`Click Map`);
            setShowBuildingInfo(false);
          }
        );
      }
    });
  }, []);

  // "http://172.10.5.130:80/jipsa/api/v1/rentInfo-dong?gu=성동구&dong=용답동&jibun=229-1";
  useEffect(() => {
    const apiUrl =
      "http://172.10.5.130:80/jipsa/api/v1/rentInfo-dong?gu=강남구&dong=대치동";

    // Axios를 사용하여 GET 요청 보내기
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);

        setMapDatas(response.data);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다:", error);
      });
  }, []);

  // 거래 목록을 바탕으로 marker를 띄웁니다.
  useEffect(() => {
    // console.log(mapDatas.officetel);
    if (
      mapDatas !== null &&
      mapDatas !== [] &&
      mapDatas.officetel !== undefined
    ) {
      for (const item of Array.from(mapDatas.officetel)) {
        // console.log(item);
        const address = `서울시 ${item.gu} ${item.dong} ${item.jibun}`;
        // 주소로 좌표를 검색합니다
        console.log(address);
        // geoObject.addressSearch(address, function (result, status) {
        //   // 정상적으로 검색이 완료됐으면
        //   if (status === window.kakao.maps.services.Status.OK) {
        //     var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        //     // 결과값으로 받은 위치를 마커로 표시합니다
        //     var marker = new window.kakao.maps.Marker({
        //       map: mapObject,
        //       position: coords,
        //     });
        //   }
        // });
      }
    }
  }, [mapDatas]);

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
          clickable: true,
        });

        bounds.extend(position); // bound에 좌표를 추가합니다.

        marker.setMap(mapObject); // 마커가 지도 위에 표시되도록 설정합니다

        newMarkers.push(marker); // 마커를 배열에 저장합니다.
        window.kakao.maps.event.addListener(marker, "click", function () {
          // 마커 위에 인포윈도우를 표시합니다
          getMarkerClick(item.place, item.gu, item.dong, item.jibun);
        });
      });
      mapObject.setBounds(bounds);
      setSearchedMarkers(newMarkers);
    }
  }, [searchResults]);

  const removeMarkers = () => {
    for (var i = 0; i < searchedMarkers.length; i++) {
      searchedMarkers[i].setMap(null);
    }
    setSearchedMarkers([]);
  };

  const getMarkerClick = (placeName, gu, dong, jibun) => {
    console.log(`Click Marker placeName : ${placeName}`);
    setShowBuildingInfo(true);
    setClickedPlaceName(placeName);
    setClickedGu(gu);
    setClickedDong(dong);
    setClickedJibun(jibun);
  };

  const onInfoClose = (e) => {
    console.log(`set false`);
    setShowBuildingInfo(false);
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
      {showBuildingInfo &&
        ReactDOM.createPortal(
          <BuildingInfoPage
            placeName={clickedPlaceName}
            gu={clickedGu}
            dong={clickedDong}
            jibun={clickedJibun}
          />,
          document.getElementById("building-info-root") // 새 창을 생성할 DOM 요소 지정
        )}
    </div>
  );
};

export default MapComponent;
