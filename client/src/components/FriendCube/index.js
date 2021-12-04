import React, {useRef, useEffect} from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addRecommendation, resetSuccess } from "../../state/user-slice";
export default function FriendCube(props) {
  let view = useSelector((state) => state.Store.Book.view);
  let success = useSelector((state) => state.Store.User.Success)
  let error = useSelector(state => state.Store.User.Error)
  const dispatch = useDispatch();
  const recommendBook = () => {
    dispatch(addRecommendation({token: `bearer ${localStorage.getItem("Token")}`, friendId: props._id, title: view.title, description: view.description, thumbnail: view.thumbnail, externalLink: view.externalLink}));
  };
  let friendRef = useRef({})
  
    if(success === friendRef.current.value){
      friendRef.current.disabled = true
      friendRef.current.style.backgroundColor = "blue"

      dispatch(resetSuccess)
    }
 
 console.log("render")
    return (
      <button  ref={friendRef} value={props._id} onClick={recommendBook} className="friendCube centerAlign">
        <span style={{ color: "white" }}>
          {props.firstName + " " + props.lastName}
        </span>
      </button>
    );

  
  
}
