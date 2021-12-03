import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addRecommendation } from "../../state/user-slice";
export default function FriendCube(props) {
  let view = useSelector((state) => state.Store.Book.view);
  const dispatch = useDispatch();
  const recommendBook = () => {
    dispatch(addRecommendation({token: `bearer ${localStorage.getItem("Token")}`, friendId: props._id, title: view.title, description: view.description, thumbnail: view.thumbnail, externalLink: view.externalLink}));
  };
  return (
    <button onClick={recommendBook} className="friendCube centerAlign">
      <span style={{ color: "white" }}>
        {props.firstName + " " + props.lastName}
      </span>
    </button>
  );
}
