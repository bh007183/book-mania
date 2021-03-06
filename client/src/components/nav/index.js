import React, {useEffect} from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EmailIcon from "@material-ui/icons/Email";
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from "@material-ui/icons/Info";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { Hidden } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import {notLoggedIn} from "../../state/user-slice"
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useDispatch, useSelector} from "react-redux"
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoginIcon from '@mui/icons-material/Login';
import jwt_decode from "jwt-decode";
import {getUserApi} from "../../state/user-slice"
import {getBrowse} from "../../state/book-slice"
import swal from 'sweetalert';

import "./style.css";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function Nav() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let loggedIn = useSelector(state => state.Store.User.loggedIn)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
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
       notLoggedIn()
        return false;
      } else {
        console.log("Nav render")
        dispatch(getUserApi({ token: `bearer ${localStorage.getItem("Token")}` }))
        dispatch(getBrowse())
      }
  
    }
    
  }, [])

  const label = { inputProps: { "aria-label": "Translate" } };

  return (
    <header className={classes.root}>
      <CssBaseline />
      <AppBar >
        <Toolbar>
          <div id="logoContain">
            <Typography id="logoText" variant="h4" noWrap>
              <Link
                name="home"
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                BookMania
              </Link>
            </Typography>
          </div>
          <div id="navLinksContain">
            <Hidden smDown>
            <Link to="/browse" className="navLinks">
                Browse
              </Link>
              {loggedIn ? <><Link to="/dashboard" className="navLinks">
                Dashboard
              </Link>
              

              <FormControl sx={{ m: 1, width: 150, borderColore: "white" }}>
                <InputLabel
                  id="demo-multiple-name-label"
                  style={{ color: "white" }}
                >
                  Account
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  <MenuItem>
                    <Link
                      to="/manage-account"
                      style={{ color: "black", textDecoration: "none", width: "100%", height: "100%"}}
                    >
                      Manage Account
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/notifications"
                      style={{ color: "black", textDecoration: "none", width: "100%", height: "100%"}}
                    >
                      Notifications
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/manage-connections"
                      style={{ color: "black", textDecoration: "none", width: "100%", height: "100%"}}
                    >
                      Connect
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                    onClick={() => {
                      dispatch(notLoggedIn())
                      localStorage.clear()
                    }}
                      to="/login"
                      style={{ color: "black", textDecoration: "none", width: "100%", height: "100%"}}
                    >
                      Log Out
                    </Link>
                  </MenuItem>
                </Select>
              </FormControl></>: <Link to="/login" className="navLinks">
               Login
              </Link>}
              

              {/* checked={language} */}
            </Hidden>
            <Hidden mdUp>
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
            {theme.direction === "ltr" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        
        <List>
        <Link
            
            onClick={handleDrawerClose}
            className="link"
            to="/browse"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <ManageSearchIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Browse" />
            </ListItem>
          </Link>
          <Divider />
          {loggedIn ? <> 
            <Link name="home" style={{padding: "10px !important"}} onClick={handleDrawerClose} className="link" to="/">
            <ListItem  button>
              <ListItemIcon>
                {" "}
                <HomeIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Divider />
          <Link
           
            onClick={handleDrawerClose}
            className="link"
            to="/dashboard"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <InfoIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Divider />
          
          <Link
            name="contact"
            onClick={handleDrawerClose}
            className="link"
            to="/notifications"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <NotificationsIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
          </Link>
          <Divider />
          <Link
            name="contact"
            onClick={handleDrawerClose}
            className="link"
            to="/manage-account"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <ManageAccountsIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Manage Account" />
            </ListItem>
          </Link>
          <Divider />
          <Link
            name="contact"
            onClick={handleDrawerClose}
            className="link"
            to="/manage-connections"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <ConnectWithoutContactIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Manage Connections" />
            </ListItem>
          </Link>
          <Divider />
          <Link className="link"
                    onClick={() => {
                      dispatch(notLoggedIn())
                      localStorage.clear()
                      handleDrawerClose()
                    }}
                      to="/login"
                    
                    >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <LogoutIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </Link>
          

          <Divider /></> : <><Link
            
            onClick={handleDrawerClose}
            className="link"
            to="/login"
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <LoginIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </Link>
          <Divider /></>}
          
         
        </List>
      </Drawer>
    </header>
  );
}
