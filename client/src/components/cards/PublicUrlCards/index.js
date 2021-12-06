 import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
export default function PublicUrlCards(props) {
  let url;
  if(props.book._id){
    url = `/browse/viewLink/${props.book._id}/${props.category}`;
  }else{
    url = `/browse/${props.book.id}/${props.category}`;
  }
 
  return (
    <Link style={{ textDecoration: "none", color: "black" }} to={url}>
    <div className="Card">
      

      <div className="cardContent">
      <p style={{ textAlign: "center", width: "100%", margin: "5px" }}>
        {/* If name is a props than the connections name is displayed in place of author so user can see what friend is reading this book */}
        {props.name ? props.name : props.book.author}
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
        <img src={props.book.thumbnail}></img>
      </div>
    </div>
    </Link>
  );
}
