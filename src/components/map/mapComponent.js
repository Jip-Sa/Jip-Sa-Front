import React, { useEffect } from "react";
import MarkerInfoWindow from "./MarkerInfoWindow";
import ReactDOMServer from "react-dom/server";

const MapComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=n6l9jjqqf3&submodules=geocoder";
    script.async = true;
    document.body.appendChild(script);
    const title = "Test";
    script.onload = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };
      const map = new window.naver.maps.Map("map", mapOptions);

      const markerOptions = {
        position: new window.naver.maps.LatLng(37.3595704, 127.105399),
        title: title,
        map: map,
      };
      var marker = new window.naver.maps.Marker(markerOptions);
      console.log(
        `This is the clickable of markger : ${marker.getClickable()}`
      );

      const componentAsString = ReactDOMServer.renderToString(
        <MarkerInfoWindow title={title} />
      );
      var infoWindow = new window.naver.maps.InfoWindow({
        content: componentAsString,
      });
      window.naver.maps.Event.addListener(
        marker,
        "click",
        onMarkerClick(marker, infoWindow)
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;

  function onMarkerClick(marker, infoWindow) {
    return function (e) {
      console.log(marker.title);
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(marker.getMap(), marker);
      }
    };
  }
};

export default MapComponent;
