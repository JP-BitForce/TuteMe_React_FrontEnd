import React from 'react'

import Batch from '../../components/Badge/BadgeButton'
import ChipButton from '../../components/Button/ChipButton'

//Boostarp
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'

//Material-UI
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor:'white'
    },
    backgroundColor:'white',
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
  },

}));

const TopBar = ({
    handleDrawerToggle, 
    mobileMoreAnchorEl, 
    isMobileMenuOpen, 
    handleMobileMenuClose, 
    handleMobileMenuOpen,
    handleSearch
}) => {
    const classes = useStyles();

    const handleBackOnPress = () => {
      window.location.replace('/')
    }

    const renderIconButton = (onClick, icon) => {
        return (
          <Nav.Link onClick = {onClick} className = "icon_btn">{icon}</Nav.Link>
        )
    }

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

                <div className={classes.sectionDesktop}>
                    <ChipButton label = "back" icon = { <ArrowBackIos />} handleClick = {handleBackOnPress}/>
                    { renderIconButton(handleSearch, <SearchIcon />) }
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    </Form>
                </div>

                <div className = "grow"/>
                <div className={classes.sectionDesktop}>
                    <Batch content = {4} icon = {<MailIcon />} />
                    <Batch content = {17} icon = {<NotificationsIcon />} />
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
