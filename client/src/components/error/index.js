import React from 'react'
import Alert from '@mui/material/Alert';

export default function ErrorMessage(props) {
    return (
        <div style={{width: "100%"}}>
          
   
    <Alert severity="error">{props.message}</Alert>
      
   

            
        </div>
    )
}
