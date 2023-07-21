import React, { useEffect } from "react";

const MapComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=n6l9jjqqf3&submodules=geocoder";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };
      const map = new window.naver.maps.Map("map", mapOptions);

      const markerOptions = {
        position: new window.naver.maps.LatLng(37.3595704, 127.105399),
        map: map,
      };
      var seoulMarker = new window.naver.maps.Marker(markerOptions);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
};

export default MapComponent;
