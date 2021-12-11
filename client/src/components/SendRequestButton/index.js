import React, {useRef} from "react";
import "./style.css"
import { useDispatch, useSelector } from "react-redux";

export default function FriendComponent(props) {
    const success = useSelector((state) => state.Store.User.Success);
   
  return (
    <>
      {success === props.user._id ? (
        <button
          
          disabled={true}
          className="addUserButton"
        >
          Request Sent
        </button>
      ) : (
        <button
       
        onClick={props.addConnection}
          value={props.user._id}
          className="addUserButton"
        >
          Connect
        </button>
      )}
    </>
  );
}
