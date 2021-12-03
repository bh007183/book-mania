import * as React from "react";
import { Link } from "react-router-dom";
import "../style.css";

export default function RecommendCards(props) {
  console.log(props)
  let url = `/browse/${props.book._id}/recommended`;
  return (
    <Link style={{ textDecoration: "none", color: "black" }} to={url}>
    <div className="Card">
      

      <div className="cardContent">
      <p style={{ textAlign: "center", width: "100%", margin: "5px" }}>
        {props.book.recommended.firstName +
          " " +
          props.book.recommended.lastName +
          " " +
          "recommended:"}
      </p>
      <h4 style={{ textAlign: "center", width: "100%", margin: "5px" }}>
        {props.book.title}
      </h4>
       
          <span className="cardDescript">
            {props.book.description.substring(0, 150)} + ...
          </span>
       
        <br></br>
      </div>
      <div className="cardImage">
        <img src={props.book.thumbnail}></img>
      </div>
    </div>
     </Link>
  );
}
