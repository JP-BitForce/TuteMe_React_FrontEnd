import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import TopBar from './TopBar'
import SideBarAlt from '../../components/SideBar/SideBarAlt'
import Modal from '../../components/Modal/SignOutModal'
import { logout } from '../../redux/actions/authAction'

import Home from '../Home/Home'
import Profile from '../Profile/Profile'
import Chat from '../My Chat/MyChat'
import TrustedTutors from '../Tutors/TrustedTutors'
import MyCourses from '../Courses/MyCourses'
import OnlineCourses from '../Courses/OnlineCourses'
import Blog from '../Blog/Blog'
import Payments from '../Payments/Payments'
import Calendar from '../Calendar/Calendar'
import OneStep from '../OneStep/OneStep'

//Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import './GettingStarted.css'

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

const GettingStarted = ({logoutUser, history, auth}) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [active, setActiveItem] = useState("HOME")
    const [modalOpen, setModalOpen] = useState(false)
    
    useEffect(() => {
      if(!auth) {
        history.push('/')
      }
      // eslint-disable-next-line
    }, [])
  
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleModalClode = () => {
      setModalOpen(false)
    }
    
    const handleSetActiveItem = (id) => {
      if (id === "SIGN_OUT") {
        setModalOpen(true)
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
                active === "ONE_STEP" ? <OneStep/>
                :
                active === "TRUSTED_TUTORS" ? <TrustedTutors/>
                :
                active === "MY_CHATS" ? <Chat/>
                :
                active === "MY_PROFILE" ? <Profile/>
                :
                active === "BLOG" ? <Blog/>
                :
                active === "PAYMENTS"  ? <Payments/>
                :
                active === "CALENDAR" && <Calendar/>
              }
          </main>
          <Modal
            open = {modalOpen}
            handleClose = {handleModalClode}
            title = "Alert!"
            handleCancel = {handleModalClode}
            handleOk = {handleSignOut}
            content = "Are you sure about sign-out ?"
          />
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
      auth: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
      logoutUser: () => { dispatch(logout()) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GettingStarted)