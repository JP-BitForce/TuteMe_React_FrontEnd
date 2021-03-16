import React, {useState} from 'react'

import SideBar from '../../components/SideBar/SideBar'
import TopBar from './TopBar'

import Profile from '../Profile/Profile'
import Chat from '../My Chat/MyChat'
import TrustedTutors from '../Tutors/TrustedTutors'

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
    padding: theme.spacing(3),
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  toolbar: theme.mixins.toolbar,

}));

const GettingStarted = () => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [active, setItemActive] = useState({
      HOME: true,
      COURSES: false,
      ONE_STEP: false,
      TRUSTED_TUTORS: false,
      MY_CHATS: false,
      MY_PROFILE: false
    })

    const [subItemActive, setSubItemActive] = useState({
        MY_COURSES: false,
        ONLINE_COURSES: false,
        VIEW_QAs: false,
        NEW: false
    })
  
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleSidebarItemOnClick = (name, value) => {
      setItemActive({
        HOME: false,
        COURSES: false,
        ONE_STEP: false,
        TRUSTED_TUTORS: false,
        MY_CHATS: false,
        MY_PROFILE: false,
        [name]: value
      })
    }
    
    const handleSidebarSubItemOnClick = (name, value) => {
      setSubItemActive({
        MY_COURSES: false,
        ONLINE_COURSES: false,
        VIEW_QAs: false,
        NEW: false,
        [name]: value
      })
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

    const handleSearch = () => {

    }

    const renderPermanentDrawer = () => {
        return (
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{ paper: classes.drawerPaper}}
              variant="permanent"
              open
            >
              <SideBar 
                itemOnClick = {handleSidebarItemOnClick} 
                subItemOnClick = {handleSidebarSubItemOnClick}
                active = {active}
                subItemActive = {subItemActive}
              />
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
                <SideBar 
                  itemOnClick = {handleSidebarItemOnClick} 
                  subItemOnClick = {handleSidebarSubItemOnClick}
                  active = {active}
                  subItemActive = {subItemActive}
                />
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
            handleSearch = {handleSearch}
          />

          <nav className={classes.drawer} aria-label="mailbox folders">
              { renderMobileDrawer() }
              { renderPermanentDrawer() }
          </nav>
  
          <main className={classes.content}>
              <div className={classes.toolbar} />
              { 
                active["HOME"] ? null 
                :
                active["COURSES"] ? null
                :
                active["ONE_STEP"] ? null
                :
                active["TRUSTED_TUTORS"] ? <TrustedTutors/>
                :
                active["MY_CHATS"] ? <Chat/>
                :
                active["MY_PROFILE"] && <Profile/>  
              }
          </main>
      </div>
    );
}

export default GettingStarted