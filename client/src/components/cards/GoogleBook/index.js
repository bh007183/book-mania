import React from "react";
import "../style.css";
export default function GoogleBook(props) {

let title = props.book.volumeInfo.title
let authors;
if(props.book.volumeInfo.authors){
  
  authors = "by" + " " + props.book.volumeInfo.authors[0]
}else{
  authors = "No Author Available"
}
let image;

if(props.book.volumeInfo.imageLinks){
  image = props.book.volumeInfo.imageLinks.thumbnail || props.book.volumeInfo.imageLinks.smallThumbnail
}else{
  image = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png`
}
let description; 
if(props.book.volumeInfo.description){
  description = props.book.volumeInfo.description.substring(0, 150) + "..."
}else{
  description = "No Description Available"
}



  return (
    <div className="Card">
      <div className="cardContent">
      <p style={{ textAlign: "center", width: "100%", margin: "5px" }}>
        {authors}
      </p>
      <h4 style={{ textAlign: "center", width: "100%", margin: "5px" }}>
        {title}
      </h4>
        
          <span className="cardDescript centerAlign">
            {description}
          </span>
     
        <br></br>
      </div>
      <div className="cardImage">
        <img src={image}></img>
      </div>
    </div>
  );
}
