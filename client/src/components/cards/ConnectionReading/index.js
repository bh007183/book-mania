
import * as React from 'react';

import "./style.css";

export default function ConnectionReadingCards(props) {
      return(
        <div className="Card">
        <p style={{textAlign:"center", width: "100%", margin: "5px"}}>
          {
            props.book.firstName +
            " " +
            props.book.lastName + " " + "is reading:"}
        </p>
      <h4 style={{textAlign:"center", width: "100%", margin: "5px"}}>{props.book.usercurrent.title}</h4>
    
      <div className="cardContent">
        <div style={{margin: "10px"}}>
        <span className="cardDescript">{props.book.usercurrent.description.substring(0, 150)} + ...</span>
        </div>
        <br></br>
        
      </div>
      <div className="cardImage">
      <img  src={props.book.usercurrent.thumbnail}></img>
      </div>
      
    </div>  
      )
}
