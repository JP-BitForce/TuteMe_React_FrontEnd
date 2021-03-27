import React from 'react'

import Batch from '../../components/Badge/BadgeButton'

//Material-UI
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import minimal_avatar from '../../assets/images/shared/minimal_avatar.jpg'

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: 'rgba(255, 255, 255, .15)'
    },
    backgroundColor:'white',
    backdropFilter: 'blur(4px)'
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  toolbar: theme.mixins.toolbar,

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    '&:hover, &:focus': {
      cursor:"pointer"
    },
  },

  profile_image : {
    marginLeft: "2%"
  }

}));

const TopBar = ({
    handleDrawerToggle, 
    mobileMoreAnchorEl, 
    isMobileMenuOpen, 
    handleMobileMenuClose, 
    handleMobileMenuOpen
}) => {
    const classes = useStyles();

    const renderMenuItem = (content, icon, title) => {
        return (
          <MenuItem>
                <Batch content = {content} icon = {icon}/>
                <p>{title}</p>
          </MenuItem>
        )
    }

    const renderMobileMenu = () => {
        return (
          <Menu
              anchorEl={mobileMoreAnchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
          >
          { renderMenuItem(4, <MailIcon />, "Messages") }
          { renderMenuItem(11, <NotificationsIcon />, "Notifications") }
          </Menu>
        )
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>

                <div className = "grow"/>
                <div className={classes.sectionDesktop}>
                    <Batch content = {4} icon = {<MailIcon />} />
                    <Batch content = {17} icon = {<NotificationsIcon />} />
                </div>

                <div className = {classes.profile_image}>
                  <Tooltip title="Profile" aria-label="back">
                      <Avatar src = {minimal_avatar}/>
                  </Tooltip>
                </div>

                <IconButton 
                        aria-label="display more actions" 
                        edge="end" 
                        className={classes.menuButton}
                        onClick = {handleMobileMenuOpen}
                    >
                    <MoreIcon />
                </IconButton>
            </Toolbar>
            { renderMobileMenu() }
        </AppBar>
    )
}

export default TopBar
