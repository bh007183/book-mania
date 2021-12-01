import * as React from "react";

import "../style.css";

export default function RecommendCards(props) {
  return (
    <div className="Card">
      

      <div className="cardContent">
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
       
          <span className="cardDescript">
            {props.recommended.description.substring(0, 150)} + ...
          </span>
       
        <br></br>
      </div>
      <div className="cardImage">
        <img src={props.recommended.thumbnail}></img>
      </div>
    </div>
  );
}
