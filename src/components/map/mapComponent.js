import React, { useEffect, useState } from "react";

const MapComponent = ({ location }) => {
  const [initialized, setInitialized] = useState(false);
  const [mapObject, setMapObject] = useState(null);
  const [infoWindow, setInfoWindowObject] = useState(null);

  useEffect(() => {
    const mapScriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=51065c0b917224030b3b3905d372a82b&autoload=false`;

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
        const options = {
          center: new window.kakao.maps.LatLng(37.2965, 126.9717),
          level: 5,
          preventDraggable: true,
          zoomControl: true,
        };

        const map = new window.kakao.maps.Map(container, options);
        setMapObject(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, []);

  useEffect(() => {
    if (initialized && location !== "" && location !== null) {
      console.log(`This is Query : ${location}`);
      console.log("Before Initialize");
      // window.naver.maps.Service.geocode(
      //   {
      //     query: location,
      //   },
      //   function (status, response) {
      //     if (status === window.naver.maps.Service.Status.ERROR) {
      //       return alert("Something Wrong!");
      //     }

      //     if (response.v2.meta.totalCount === 0) {
      //       return alert("totalCount" + response.v2.meta.totalCount);
      //     }

      //     var htmlAddresses = [],
      //       item = response.v2.addresses[0],
      //       point = new window.naver.maps.Point(item.x, item.y);

      //     if (item.roadAddress) {
      //       htmlAddresses.push("[도로명 주소] " + item.roadAddress);
      //     }

      //     if (item.jibunAddress) {
      //       htmlAddresses.push("[지번 주소] " + item.jibunAddress);
      //     }

      //     if (item.englishAddress) {
      //       htmlAddresses.push("[영문명 주소] " + item.englishAddress);
      //     }

      //     infoWindow.setContent(
      //       [
      //         '<div style="padding:10px;min-width:200px;line-height:150%;">',
      //         '<h4 style="margin-top:5px;">검색 주소 : ' +
      //           location +
      //           "</h4><br />",
      //         htmlAddresses.join("<br />"),
      //         "</div>",
      //       ].join("\n")
      //     );

      //     mapObject.setCenter(point);
      //     infoWindow.open(mapObject, point);
      //   }
      // );
    }
  }, [location, mapObject, infoWindow, initialized]);

  const getMapClick = (e) => {
    mapObject.addListener("click", function (e) {
      searchCoordinateToAddress(mapObject, e.coord, infoWindow);
    });
  };

  return (
    <div
      id="map"
      onClick={getMapClick}
      style={{ width: "100%", height: "100vh" }}
    />
  );

  function searchCoordinateToAddress(map, latlng, infoWindow) {
    infoWindow.close();

    window.naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [
          window.naver.maps.Service.OrderType.ADDR,
          window.naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      function (status, response) {
        if (status === window.naver.maps.Service.Status.ERROR) {
          return alert("Something Wrong!");
        }

        var items = response.v2.results,
          address = "",
          htmlAddresses = [];

        for (var i = 0, ii = items.length, item, addrType; i < ii; i++) {
          item = items[i];
          address = makeAddress(item) || "";
          addrType = item.name === "roadaddr" ? "[도로명 주소]" : "[지번 주소]";

          htmlAddresses.push(i + 1 + ". " + addrType + " " + address);
        }

        infoWindow.setContent(
          [
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
            htmlAddresses.join("<br />"),
            "</div>",
          ].join("\n")
        );

        infoWindow.open(map, latlng);
      }
    );
  }

  function makeAddress(item) {
    if (!item) {
      return;
    }

    var name = item.name,
      region = item.region,
      land = item.land,
      isRoadAddress = name === "roadaddr";

    var sido = "",
      sigugun = "",
      dongmyun = "",
      ri = "",
      rest = "";

    if (hasArea(region.area1)) {
      sido = region.area1.name;
    }

    if (hasArea(region.area2)) {
      sigugun = region.area2.name;
    }

    if (hasArea(region.area3)) {
      dongmyun = region.area3.name;
    }

    if (hasArea(region.area4)) {
      ri = region.area4.name;
    }

    if (land) {
      if (hasData(land.number1)) {
        if (hasData(land.type) && land.type === "2") {
          rest += "산";
        }

        rest += land.number1;

        if (hasData(land.number2)) {
          rest += "-" + land.number2;
        }
      }

      if (isRoadAddress === true) {
        if (checkLastString(dongmyun, "면")) {
          ri = land.name;
        } else {
          dongmyun = land.name;
          ri = "";
        }

        if (hasAddition(land.addition0)) {
          rest += " " + land.addition0.value;
        }
      }
    }

    return [sido, sigugun, dongmyun, ri, rest].join(" ");
  }

  function hasArea(area) {
    return !!(area && area.name && area.name !== "");
  }

  function hasData(data) {
    return !!(data && data !== "");
  }

  function checkLastString(word, lastString) {
    return new RegExp(lastString + "$").test(word);
  }

  function hasAddition(addition) {
    return !!(addition && addition.value);
  }
};

export default MapComponent;
