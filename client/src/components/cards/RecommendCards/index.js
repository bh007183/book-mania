import * as React from "react";

import "./style.css";

export default function RecommendCards(props) {
  return (
    <div className="Card">
      <p style={{ textAlign: "center", width: "100%", margin: "5px" }}>
        {props.recommended.recommended.firstName +
          " " +
          props.recommended.recommended.lastName +
          " " +
          "recommended:"}
      </p>
      <h4 style={{ textAlign: "center", width: "100%", margin: "5px" }}>
        {props.recommended.title}
      </h4>

      <div className="cardContent">
        <div style={{ margin: "10px" }}>
          <span className="cardDescript">
            {props.recommended.description.substring(0, 150)} + ...
          </span>
        </div>
        <br></br>
      </div>
      <div className="cardImage">
        <img src={props.recommended.thumbnail}></img>
      </div>
    </div>
  );
}
