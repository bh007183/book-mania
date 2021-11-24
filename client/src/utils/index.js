import { Navigate } from "react-router-dom";
import swal from 'sweetalert';
import jwt_decode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux"

const handleFormInput = (event, state, setState) => {
  let name = event.target.name;
  let value = event.target.value;

  setState({
    ...state,
    [name]: value,
  });
};

const authenticated = () => {
  let token = localStorage.getItem("Token") || null;
  let currentTime = Date.now()
  
  if(token){
    let decoded = jwt_decode(token);
 
  
    if (Math.floor(currentTime/1000) > decoded.exp) {
        swal({
          title: "Session Expired!",
          text: "You must first login",
          icon: "warning",
          dangerMode: false,
        })
      return false;
    } else {
      return true;
    }

  }else{
    swal({
        title: "Not Authenticated!",
        text: "You must first login",
        icon: "warning",
        dangerMode: false,
      })
    return false;
  }

    
};

export { handleFormInput, authenticated };
