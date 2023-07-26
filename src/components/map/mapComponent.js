import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import greenImage from "../../icon/green_marker.png";
import yellowImage from "../../icon/yellow_marker.png";
import orangeImage from "../../icon/orange_marker.png";
import redImage from "../../icon/red_marker.png";
import BuildingInfoPage from "./buildingInfoPage";

const MapComponent = ({ searchResults }) => {
  const [initialized, setInitialized] = useState(false);
  const [mapObject, setMapObject] = useState(null);
  const [geoObject, setGeoObject] = useState();
  const [baseMarkers, setBaseMarkers] = useState();
  const [searchedMarkers, setSearchedMarkers] = useState([]);
  const [showBuildingInfo, setShowBuildingInfo] = useState(false);
  const [tradeDatas, setTradeDatas] = useState([]);
  const [rentDatas, setRentDatas] = useState([]);
  const [uniqueDatas, setUniqueDatas] = useState([]);
  const [clickedPlaceName, setClickedPlaceName] = useState("");
  const [clickedGu, setClickedGu] = useState("");
  const [clickedDong, setClickedDong] = useState("");
  const [clickedJibun, setClickedJibun] = useState("");
  const [clickedRisk, setclickedRisk] = useState(90);

  const [mapLevel, setMapLevel] = useState(2);
  const [newGu, setNewGu] = useState("");

  const guLatLngList = [
    { gu: "강남구", x: "127.0495556", y: "37.514575", show: false },
    { gu: "강동구", x: "127.1258639", y: "37.52736667", show: false },
    { gu: "강북구", x: "127.0277194", y: "37.63695556", show: false },
    { gu: "강서구", x: "126.851675", y: "37.54815556", show: false },
    { gu: "관악구", x: "126.9538444", y: "37.47538611", show: false },
    { gu: "광진구", x: "127.0845333", y: "37.53573889", show: false },
    { gu: "구로구", x: "126.8895972", y: "37.49265", show: false },
    { gu: "금천구", x: "126.9041972", y: "37.44910833", show: false },
    { gu: "노원구", x: "127.0583889", y: "37.65146111", show: false },
    { gu: "도봉구", x: "127.0495222", y: "37.66583333", show: false },
    { gu: "동대문구", x: "127.0421417", y: "37.571625", show: false },
    { gu: "동작구", x: "126.941575", y: "37.50965556", show: false },
    { gu: "마포구", x: "126.9105306", y: "37.56070556", show: false },
    { gu: "서대문구", x: "126.9388972", y: "37.57636667", show: false },
    { gu: "서초구", x: "127.0348111", y: "37.48078611", show: false },
    { gu: "성동구", x: "127.039", y: "37.56061111", show: false },
    { gu: "성북구", x: "127.0203333", y: "37.58638333", show: false },
    { gu: "송파구", x: "127.1079306", y: "37.51175556", show: false },
    { gu: "양천구", x: "126.8687083", y: "37.51423056", show: false },
    { gu: "영등포구", x: "126.8983417", y: "37.52361111", show: false },
    { gu: "용산구", x: "126.9675222", y: "37.53609444", show: false },
    { gu: "은평구", x: "126.9312417", y: "37.59996944", show: false },
    { gu: "종로구", x: "126.9816417", y: "37.57037778", show: false },
    { gu: "중구", x: "126.9996417", y: "37.56100278", show: false },
    { gu: "중랑구", x: "127.0947778", y: "37.60380556", show: false },
  ];

  useEffect(() => {
    const mapScriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=51065c0b917224030b3b3905d372a82b&libraries=services,clusterer,drawing`;
    const existingScript = document.querySelector(
      `script[src="${mapScriptSrc}"]`
    );
    if (existingScript) {
      existingScript.remove();
    }

    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = mapScriptSrc;

    document.head.appendChild(mapScript);

    var container = document.getElementById("map");
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        setInitialized(true);
        const options = {
          center: new window.kakao.maps.LatLng(
            37.5858280343867,
            126.995896931187
          ),
          level: mapLevel,
          preventDraggable: true,
          zoomControl: true,
        };
        if (mapObject == null) {
          const map = new window.kakao.maps.Map(container, options);
          setMapObject(map);
          var geocoder = new window.kakao.maps.services.Geocoder();
          setGeoObject(geocoder);

          // 위도 경도 찾는 event
          window.kakao.maps.event.addListener(
            map,
            "click",
            function (mouseEvent) {
              // 클릭한 위도, 경도 정보를 가져옵니다
              var latlng = mouseEvent.latLng;

              var message =
                "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
              message += "경도는 " + latlng.getLng() + " 입니다";

              console.log(message);
              setShowBuildingInfo(false);
            }
          );
          // 경계 찾는 이벤드
          window.kakao.maps.event.addListener(
            map,
            "bounds_changed",
            function () {
              // 지도 영역정보를 얻어옵니다
              let bounds = map.getBounds();
              let center = map.getCenter();
              let swLatlng = bounds.getSouthWest();
              // 영역정보의 북동쪽 정보를 얻어옵니다
              var neLatlng = bounds.getNorthEast();
              const newBounds = new window.kakao.maps.LatLngBounds(
                swLatlng,
                neLatlng
              ); // 인자를 주지 않으면 빈 영역을 생성한다.
              let isBreak = false;
              for (const guLatLng of guLatLngList) {
                let guLoc = new window.kakao.maps.LatLng(
                  guLatLng.y,
                  guLatLng.x
                );
                if (newBounds.contain(guLoc)) {
                  if (!guLatLng.show && map.getLevel() < 5) {
                    console.log(
                      `Getting the info of ${guLatLng.gu} / This is Map Level : ${mapLevel}`
                    );
                    setNewGu(guLatLng.gu);
                    guLatLng.show = true;
                    isBreak = true;
                    break;
                  }
                }
              }

              let minDist = 10000000;
              let minGu = "";
              if (!isBreak) {
                for (const guLatLng of guLatLngList) {
                  let guDist =
                    Math.abs(guLatLng.y - center.getLng()) +
                    Math.abs(guLatLng.x - center.getLat());
                  if (guDist <= minDist) {
                    minGu = guLatLng.gu;
                  }
                }
                if (minGu !== "") {
                  for (const guLatLng of guLatLngList) {
                    if (guLatLng.gu === minGu) {
                      if (!guLatLng.show) {
                        setNewGu(minGu);
                        console.log(`Get info of ${minGu}`);
                        guLatLng.show = true;
                      }
                    }
                  }
                }
              }
            }
          );

          // 확대 축소 이벤트
          window.kakao.maps.event.addListener(map, "zoom_changed", function () {
            // 지도의 현재 레벨을 얻어옵니다
            let curLevel = map.getLevel();
            setMapLevel(curLevel);
            // level 4까지만 load 시키자.
            console.log(`This is the level of current map : ${curLevel}`);
          });
        }
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, []);

  useEffect(() => {
    const tradeUrl = `http://172.10.5.130:80/jipsa/api/v1/leastTrade-gu?gu=${newGu}`;
    const rentUrl = `http://172.10.5.130:80/jipsa/api/v1/leastRent-gu?gu=${newGu}`;
    // const tradeUrl = "http://172.10.5.130:80/jipsa/api/v1/leastTrade";
    // const rentUrl = "http://172.10.5.130:80/jipsa/api/v1/leastRent";
    // Axios를 사용하여 GET 요청 보내기
    axios
      .get(tradeUrl)
      .then((response) => {
        setTradeDatas(response.data.officetel);
      })
      .catch((error) => {
        console.error("Trade 데이터를 불러오는 데 실패했습니다:", error);
      });

    axios
      .get(rentUrl)
      .then((response) => {
        setRentDatas(response.data.officetel);
      })
      .catch((error) => {
        console.error("Rent 데이터를 불러오는 데 실패했습니다:", error);
      });
  }, [newGu]);

  // set unique array
  useEffect(() => {
    // console.log(mapDatas.officetel);
    const tradeArr = Array.from(tradeDatas);
    const rentArr = Array.from(rentDatas);
    setUniqueDatas(getUniqueArray(tradeArr, rentArr));
  }, [tradeDatas, rentDatas]);

  useEffect(() => {
    if (
      uniqueDatas !== null &&
      uniqueDatas !== [] &&
      uniqueDatas !== undefined
    ) {
      async function fetchAddresses() {
        for (const item of Array.from(uniqueDatas)) {
          try {
            fetchMarker(item, 82);
            // TODO: percent 반환 api 만들어지면 연결하기
            // const percentUrl = `http://172.10.5.130:80/jipsa/api/v1/highest-percent-gu?gu=${item.gu}&dong=${item.dong}&jibun=${item.jibun}`;
            // axios
            //   .get(percentUrl)
            //   .then((response) => {
            //     fetchMarker(item, response.data.percent);
            //   })
            //   .catch((error) => {
            //     console.error(
            //       "Trade 데이터를 불러오는 데 실패했습니다:",
            //       error
            //     );
            //   });
          } catch (error) {
            console.error("Error searching address:", error);
          }
        }
      }

      async function fetchMarker(item, percent) {
        const address = `서울시 ${item.gu} ${item.dong} ${item.jibun}`;
        const risk = percent;

        try {
          const result = await addressSearchPromise(geoObject, address);
          var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          var imageSrc = greenImage;
          if (risk <= 80) {
            imageSrc = greenImage;
          } else if (risk > 80 && risk <= 90) {
            imageSrc = yellowImage;
          } else if (risk > 90 && risk <= 100) {
            imageSrc = orangeImage;
          } else {
            imageSrc = redImage;
          }
          // 마커이미지의 주소입니다
          var imageSize = new window.kakao.maps.Size(32, 35); // 마커이미지의 크기입니다
          const imageOption = {
            offset: new window.kakao.maps.Point(27, 69),
          }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new window.kakao.maps.Marker({
            map: mapObject,
            position: coords,
            image: markerImage,
          });

          window.kakao.maps.event.addListener(marker, "click", function () {
            // 마커 위에 인포윈도우를 표시합니다
            getMarkerClick(item.name, item.gu, item.dong, item.jibun, risk);
          });
        } catch (error) {
          console.error("Error searching address:", error);
        }
      }

      fetchAddresses();
    }
  }, [uniqueDatas, geoObject, mapObject]);

  function addressSearchPromise(geoObject, address) {
    return new Promise((resolve, reject) => {
      geoObject.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(result);
        } else {
          reject(new Error("Failed to search address."));
        }
      });
    });
  }

  // 검색 결과 처리
  useEffect(() => {
    if (initialized && searchResults.length > 0 && searchResults !== null) {
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

        newMarkers.push(marker);
      });
      mapObject.setBounds(bounds);
      setSearchedMarkers(newMarkers);
    } else if (searchResults.length === 0) {
      removeMarkers();
    }
  }, [searchResults, initialized]);

  const removeMarkers = () => {
    for (var i = 0; i < searchedMarkers.length; i++) {
      searchedMarkers[i].setMap(null);
    }
    setSearchedMarkers([]);
  };

  const getMarkerClick = (placeName, gu, dong, jibun, risk) => {
    console.log(`Click Marker placeName : ${placeName}`);
    console.log(`Click Marker placeaddress : ${gu} ${dong} ${jibun}`);

    setShowBuildingInfo(true);
    setClickedPlaceName(placeName);
    setClickedGu(gu);
    setClickedDong(dong);
    setClickedJibun(jibun);
    setclickedRisk(risk);
  };

  const getUniqueArray = (arr1, arr2) => {
    const combinedArray = [...arr1, ...arr2];

    // 합친 JSON 객체 배열에서 'gu', 'dong', 'jibun' 값을 합친 문자열 프로퍼티를 생성
    const newArray = combinedArray.map((item) => ({
      ...item,
      combinedKey: `${item.gu}-${item.dong}-${item.jibun}`,
    }));

    // 중복 항목을 제거하여 새로운 JSON 객체 배열 생성
    const uniqueArray = newArray.filter(
      (item, index, self) =>
        index === self.findIndex((i) => i.combinedKey === item.combinedKey)
    );

    // 'combinedKey' 프로퍼티를 삭제하여 원래 형태의 JSON 객체 배열로 변환
    const uniqueArr = uniqueArray.map(({ combinedKey, ...rest }) => rest);
    // console.log(uniqueArr);
    return uniqueArr;
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
            risk={clickedRisk}
          />,
          document.getElementById("building-info-root") // 새 창을 생성할 DOM 요소 지정
        )}
    </div>
  );
};

export default MapComponent;
