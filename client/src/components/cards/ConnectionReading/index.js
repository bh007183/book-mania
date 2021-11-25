// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext'
import "./style.css";

export default function ConnectionReadingCards(props) {
    console.log(props)
    console.log("this")
   
      return(
         <Card className="recommendedCard" sx={{ display: 'flex' }}>
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
         <CardContent sx={{ flex: '1 0 auto' }}>
           <Typography component="div" variant="h5">
           { props.book.usercurrent.title}
           </Typography>
           <Typography variant="subtitle1" color="text.secondary" component="div">
           { props.book.usercurrent.description}
           <p>{"recommended by:" + " " +  props.book.fName + " " +  props.book.lName}</p>
           </Typography>
         </CardContent>
         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
           
         </Box>
       </Box>
       <CardMedia
         component="img"
         sx={{ width: 151 }}
         image={ props.book.usercurrent.thumbnail}
         alt="Live from space album cover"
       />
     </Card>
      )
   
    
}
