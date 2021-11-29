import React, {useEffect, useRef, useState} from 'react'
import { authenticated } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {notLoggedIn, getUserApi, updateUserApi, resetError, resetSuccess } from "../../state/user-slice";
import {handleFormInput} from "../../utils"
import { Navigate } from "react-router-dom";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
//model imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./style.css"

export default function ManageAccount() {
  // initialize dispatch
  const dispatch = useDispatch();
      // Get User Data To set redux state
      useEffect(() => {
        dispatch(getUserApi({ token: `bearer ${localStorage.getItem("Token")}` }));
      }, []);
    const error = useSelector((state) => state.Store.User.Error);
    const success = useSelector((state) => state.Store.User.Success);
    const state = useSelector((state) => state.Store.User);
//local state for account edit
  const [edit, setEdit] = useState({})
  //local state for current password
  const [pass, setPass] = useState({
    currentPassword: ""
  })
  //Handle Model State
  const [open, setOpen] = React.useState(false);
  // Handle Model Open Close
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    if(error){
      dispatch(resetError())
    }
    if(success){
      dispatch(resetSuccess())
    }
    
    
  };
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
    const saveChanges = (e) => {
      e.preventDefault()
      let obj = {
        edit,
        password: pass.currentPassword,
        token: `bearer ${localStorage.getItem("Token")}`
      }
      dispatch(updateUserApi(obj))
    }

   
    return (
        <div id="manageAccount">
          <h1>Edit Account Info</h1>
          <div id="editGrandparent">
            <div id="editContain">
              <div className="inputContain">
                <input onChange={(event) => {handleFormInput(event, edit, setEdit)}} ref={firstNameEl} disabled={true} placeholder={state.firstName} name="firstName" value={edit.firstName} ></input>
                <ListItem width="100px" button onClick={()=>editStuff(firstNameEl)}>
              <ListItemIcon> <EditIcon style={{color: "black"}} className="icon" /></ListItemIcon>
              <ListItemText primary="Edit First Name" />
            </ListItem>
                
              </div>
              <div className="inputContain">
                <input onChange={(event) => {handleFormInput(event, edit, setEdit)}} ref={lastNameEl} disabled={true} placeholder={state.lastName} name="lastName" value={edit.lastName}></input>
                
                <ListItem onClick={()=>editStuff(lastNameEl)}  button onClick={()=>editStuff(firstNameEl)}>
              <ListItemIcon> <EditIcon  style={{color: "black"}} className="icon" /></ListItemIcon>
              <ListItemText primary="Edit Last Name" />
            </ListItem>
                
              </div>
              <div className="inputContain">
                <input onChange={(event) => {handleFormInput(event, edit, setEdit)}} ref={emailEl} disabled={true} placeholder={state.email} name="email" value={edit.email}></input>
                
                <ListItem  onClick={()=>editStuff(emailEl)}>
              <ListItemIcon> <EditIcon  style={{color: "black"}} className="icon" /></ListItemIcon>
              <ListItemText primary="Edit Email" />
            </ListItem>
                
              </div>
              <div className="inputContain">
                <input type="password" onChange={(event) => {handleFormInput(event, edit, setEdit)}} ref={passwordEl} disabled={true} placeholder="New Password" name="password"></input>
                
                <ListItem button onClick={()=>editStuff(passwordEl)}>
              <ListItemIcon> <EditIcon  style={{color: "black"}} className="icon" /></ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
                
              </div>
            </div>
            </div>
            <Button id="saveChanges" variant="contained" color="error" onClick={handleOpen}>Save Changes</Button>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="modal" >
          <form onSubmit={saveChanges}>
          <div style={{textAlign: "center", color: "white", padding:"20px"}} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Current Password To Save Changes
          </Typography>
          </div>
          <div style={{padding: "10px", color: "red"}}>{error ? <p>{error}</p> : <></>}</div>
         <div className="centerAlign" style={{padding: "20px"}}>
         <input type="password" onChange={(event) => {handleFormInput(event, pass, setPass)}} name="currentPassword" value={pass.currentPassword} placeholder="Current Password"></input>
         </div>
         
         {success ? <div className="centerAlign" style={{padding: "20px"}}>
         <Button onClick={handleClose} variant="contained" color="success" >Updates Saved</Button>
         </div> : <div className="centerAlign" style={{padding: "20px"}}>
         <Button type="submit" variant="contained" color="error" >Enter</Button>
         </div>}
         
         </form>
            
            
          
        </Box>
       
      </Modal>
        </div>
    )
}
