import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import InfoIcon from '@material-ui/icons/Info';
import { Hidden } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";

import "./style.css"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function Nav() {
  
 
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const label = { inputProps: { 'aria-label': 'Translate' } }

  return (
    
    <header className={classes.root}>
      <CssBaseline />
      <AppBar
      >
        <Toolbar>
            <div id="logoContain">
              
        <Typography id="logoText" variant="h4" noWrap>
        <Link name="home" to="/" style={{textDecoration: "none", color: "white"}}>
         BookMania
            </Link>
          </Typography>
         
          </div>
          <div id="navLinksContain">
          <Hidden smDown  >
              <Link to="/who-we-are"className="navLinks">Who We Are</Link>
              <Link to="/costa-rica-mission-trips"className="navLinks">Get Involved</Link>
              <Link to="/contact"className="navLinks">Contact</Link>


              

              {/* checked={language} */}
              </Hidden>
          <Hidden mdUp  >
          
          <IconButton
           
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="end"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          </Hidden>

          </div>
          
         
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        // variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <Link name="home"onClick={handleDrawerClose} className="link" to="/">
            <ListItem button >
              <ListItemIcon> <HomeIcon className="icon" /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            </Link>
            <Divider />
           <Link  name="whoWeAre" onClick={handleDrawerClose} className="link"to="/who-we-are">
            <ListItem button >
              <ListItemIcon> <InfoIcon className="icon"/></ListItemIcon>
              <ListItemText primary="Who We Are" />
            </ListItem>
            </Link>
            <Divider />
           <Link name="contact" onClick={handleDrawerClose}  className="link"to="/contact">
            <ListItem button >
              <ListItemIcon> <EmailIcon className="icon"/></ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
            </Link>
            <Divider />
           <Link name="whatWeDo" onClick={handleDrawerClose}  className="link"to="/costa-rica-mission-trips">
            <ListItem button >
              <ListItemIcon> <GroupWorkIcon className="icon"/></ListItemIcon>
              <ListItemText primary="Get Involved" />
            </ListItem>
            </Link>
            <Divider />
            <ListItem style={{display: "flex", justifyContent: "center"}} >
         
            </ListItem>
            <Divider />
            
            
          
        </List>
        
      </Drawer>
    </header>

  );
}