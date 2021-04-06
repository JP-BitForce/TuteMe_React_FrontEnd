import React, {useState} from 'react'
import {connect} from 'react-redux'

import TopBar from './TopBar'
import SideBarAlt from '../../components/SideBar/SideBarAlt'
import { logout } from '../../redux/actions/authAction'

import Home from '../Home/Home'
import Profile from '../Profile/Profile'
import Chat from '../My Chat/MyChat'
import TrustedTutors from '../Tutors/TrustedTutors'
import MyCourses from '../Courses/MyCourses'
import OnlineCourses from '../Courses/OnlineCourses'
import Blog from '../Blog/Blog'
import Payments from '../Payments/Payments'

//Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import './GettingStarted.css'

// const drawerWidth = 210;
const drawerWidth = 260;

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
  },

  content: {
    flexGrow: 1,
  },

  toolbar: theme.mixins.toolbar,

}));

const GettingStarted = ({logoutUser, history}) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [active, setActiveItem] = useState("HOME")
  
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
    const handleSetActiveItem = (id) => {
      if (id === "SIGN_OUT") {
        handleSignOut()
      } else {
        setActiveItem(id)
      }
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
      logoutUser()
      history.push('/')
    }

    const renderPermanentDrawer = () => {
        return (
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{ paper: classes.drawerPaper}}
              variant="permanent"
              open
            >
              <SideBarAlt itemOnClick = {handleSetActiveItem} active = {active}/>
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
                <SideBarAlt itemOnClick = {handleSetActiveItem} active = {active}/>
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
                active === "MY_PROFILE" ? <Profile/>
                :
                active === "BLOG" ? <Blog/>
                :
                active === "PAYMENTS"  && <Payments/>
              }
          </main>
      </div>
    );
}


const mapDispatchToProps = dispatch => {
  return {
      logoutUser: () => { dispatch(logout()) }
  }
}

export default connect(null,mapDispatchToProps)(GettingStarted)