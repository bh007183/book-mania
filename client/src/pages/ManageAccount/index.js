import React, {useEffect, useRef, useState} from 'react'
import { authenticated } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { loginUserApi, notLoggedIn, getUserApi, updateUserApi } from "../../state/user-slice";
import {handleFormInput} from "../../utils"
import { Navigate } from "react-router-dom";

//model imports

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//model style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ManageAccount() {
  // initialize dispatch

  const dispatch = useDispatch();
      // Get User Data To set redux state
      useEffect(() => {
        dispatch(getUserApi({ token: `bearer ${localStorage.getItem("Token")}` }));
      }, []);

    const error = useSelector((state) => state.Store.User.Error);
   
    const state = useSelector((state) => state.Store.User);


//local state for account edit
  const [edit, setEdit] = useState({

  })
  //local state for current password

  const [pass, setPass] = useState({
    currentPassword: ""
  })
  //Handle Model State
  const [open, setOpen] = React.useState(false);
  // Handle Model Open Close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
//set refs
    
    const firstNameEl = useRef(null);
    const lastNameEl = useRef(null);
    const emailEl = useRef(null);
    const passwordEl = useRef(null);


//handle client side authentication
    console.log(state);
    if (!authenticated()) {
      dispatch(notLoggedIn());
      return <Navigate to="/login" />;
    }

    // Sets Refs to be updated
    const editStuff = (ref) => {
      if(ref.current.disabled === false){
        ref.current.disabled = true
       
      }else{
        setEdit({
          ...edit, [ref.current.name]: ref.current.value
        })
        ref.current.disabled = false
      }
      

    }
    // Saves/Updates User
    const saveChanges = () => {
      let obj = {
        edit,
        password: pass.currentPassword,
        token: `bearer ${localStorage.getItem("Token")}`
      }
      dispatch(updateUserApi(obj))
    }


    return (
        <div>
          <h1>Edit Account Info</h1>
            <div id="editContain">
              <div>
                <input onChange={(event) => {handleFormInput(event, edit, setEdit)}} ref={firstNameEl} disabled={true} placeholder={state.firstName} name="firstName" value={edit.firstName} ></input>
                <button onClick={()=>editStuff(firstNameEl)} >Edit</button>
              </div>
              <div>
                <input onChange={(event) => {handleFormInput(event, edit, setEdit)}} ref={lastNameEl} disabled={true} placeholder={state.lastName} name="lastName" value={edit.lastName}></input>
                <button onClick={()=>editStuff(lastNameEl)}>Edit</button>
              </div>
              <div>
                <input onChange={(event) => {handleFormInput(event, edit, setEdit)}} ref={emailEl} disabled={true} placeholder={state.email} name="email" value={edit.email}></input>
                <button onClick={()=>editStuff(emailEl)}>Edit</button>
              </div>
              <div>
                <input onChange={(event) => {handleFormInput(event, edit, setEdit)}} ref={passwordEl} disabled={true} placeholder="New Password" name="password"></input>
                <button onClick={()=>editStuff(passwordEl)}>Edit</button>
              </div>
            </div>
            <button onClick={handleOpen}>Save Changes</button>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Current Password
          </Typography>
         
            <input onChange={(event) => {handleFormInput(event, pass, setPass)}} name="currentPassword" value={pass.currentPassword} placeholder="Current Password"></input>
            <Button onClick={saveChanges}>Enter</Button>
          
        </Box>
       
      </Modal>
        </div>
    )
}
