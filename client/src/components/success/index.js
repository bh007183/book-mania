import React from 'react'
import Alert from '@mui/material/Alert';

export default function SuccessMessage(props) {
    return (
        <div style={{width: "100%"}}>
          
   
    <Alert severity="success">{props.message}</Alert>
      
   

            
        </div>
    )
}
