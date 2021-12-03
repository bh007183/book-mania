import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
export default function PublicUrlCards(props) {

  let url = `/browse/${props.book.primary_isbn13}/${props.category}`;
  return (
    <Link style={{ textDecoration: "none", color: "black" }} to={url}>
    <div className="Card">
      

      <div className="cardContent">
      <p style={{ textAlign: "center", width: "100%", margin: "5px" }}>
        {props.book.contributor}
      </p>
      <h4 style={{ textAlign: "center", width: "100%", margin: "5px" }}>
        {props.book.title}
      </h4>
        
          <span className="cardDescript centerAlign">
            {props.book.description.substring(0, 150)}
          </span>
     
        <br></br>
      </div>
      <div className="cardImage">
        <img src={props.book.book_image}></img>
      </div>
    </div>
    </Link>
  );
}
