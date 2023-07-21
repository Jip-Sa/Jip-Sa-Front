import React from "react";

const MarkerInfoWindow = (props) => {
  return (
    <div style={{ width: "150px", "text-align": "center", padding: "10px" }}>
      The Letter is <b> {props.title} </b>.
    </div>
  );
};

export default MarkerInfoWindow;
