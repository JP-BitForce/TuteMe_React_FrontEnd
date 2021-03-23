import React, {useState} from 'react'

import SideBar from '../../components/SideBar/SideBar'
import TopBar from './TopBar'

import Home from '../Home/Home'
import Profile from '../Profile/Profile'
import Chat from '../My Chat/MyChat'
import TrustedTutors from '../Tutors/TrustedTutors'
import MyCourses from '../Courses/MyCourses'
import OnlineCourses from '../Courses/OnlineCourses'

//Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import './GettingStarted.css'

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#2c333a'
  },

  content: {
    flexGrow: 1,
  },

  toolbar: theme.mixins.toolbar,

}));

const GettingStarted = () => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [active, setActiveItem] = useState("HOME")
  
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
    const handleSetActiveItem = (id) => {
      setActiveItem(id)
    }

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleSignOut = () => {
      
    }

    const renderPermanentDrawer = () => {
        return (
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{ paper: classes.drawerPaper}}
              variant="permanent"
              open
            >
              <div className={classes.toolbar} />
              <Divider/>
              <SideBar itemOnClick = {handleSetActiveItem} active = {active}/>
              <div className = "grow"/>
              <Divider/>
              <div button onClick = {handleSignOut} className = "list_item_div sign_out_div ">
                  <span>SIGN-OUT</span>
              </div>
            </Drawer>
          </Hidden>
        )
    }
  
    const renderMobileDrawer = () => {
        return (
          <Hidden smUp implementation="css">
              <Drawer
                  variant = "temporary"
                  anchor = 'left'
                  open = {mobileOpen}
                  onClose = {handleDrawerToggle}
                  classes = {{ paper: classes.drawerPaper }}
                  ModalProps={{ keepMounted: true }}
              >
                <SideBar itemOnClick = {handleSetActiveItem} active = {active}/>
                <div className = "grow"/>
                <Divider/>
                <div button onClick = {handleSignOut} className = "list_item_div sign_out_div ">
                  <span>SIGN-OUT</span>
                </div>
              </Drawer>
          </Hidden>
        )
    }
  
    return (
      <div className={classes.root}>
          <CssBaseline />
          <TopBar 
            handleDrawerToggle = {handleDrawerToggle}
            mobileMoreAnchorEl = {mobileMoreAnchorEl}
            isMobileMenuOpen = {isMobileMenuOpen}
            handleMobileMenuClose = {handleMobileMenuClose}
            handleMobileMenuOpen = {handleMobileMenuOpen}
          />

          <nav className={classes.drawer} aria-label="mailbox folders">
              { renderMobileDrawer() }
              { renderPermanentDrawer() }
          </nav>
  
          <main className={classes.content}>
              <div className={classes.toolbar} />
              { 
                active === "HOME" ? <Home/> 
                :
                active === "MY_COURSES" ? <MyCourses/>
                :
                active === "ONLINE_COURSES" ? <OnlineCourses/>
                :
                active === "ONE_STEP" ? null
                :
                active === "TRUSTED_TUTORS" ? <TrustedTutors/>
                :
                active === "MY_CHATS" ? <Chat/>
                :
                active === "MY_PROFILE"  && <Profile/>  
              }
          </main>
      </div>
    );
}

export default GettingStarted