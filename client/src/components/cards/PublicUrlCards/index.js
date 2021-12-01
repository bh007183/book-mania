import React from "react";
import "../style.css";
export default function PublicUrlCards(props) {
  return (
    <div className="Card">
      

      <div className="cardContent">
      <p style={{ textAlign: "center", width: "100%", margin: "5px" }}>
        {props.bestSeller.contributor}
      </p>
      <h4 style={{ textAlign: "center", width: "100%", margin: "5px" }}>
        {props.bestSeller.title}
      </h4>
        
          <span className="cardDescript centerAlign">
            {props.bestSeller.description.substring(0, 150)}
          </span>
     
        <br></br>
      </div>
      <div className="cardImage">
        <img src={props.bestSeller.book_image}></img>
      </div>
    </div>
  );
}
