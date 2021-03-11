import React, {useState} from 'react';

import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const auth = true 

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const renderMenu = () => {
      return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
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
        <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
            <AccountCircle />
            </IconButton>
            <p>Profile</p>
        </MenuItem>
        </Menu>
      )
  }
  
  const renderBatch = (content, icon) => {
      return (
        <IconButton aria-label="show" color="primary">
            <Badge badgeContent={content} color="secondary">
                {icon}
            </Badge>
        </IconButton>
      )
  }

  const renderIconButton = (onClick, icon) => {
      return (
        <Nav.Link onClick = {onClick} style = {{color:'blue'}}>{icon}</Nav.Link>
      )
  }

  const renderMenuItem = (content, icon, title) => {
      return (
        <MenuItem>
            { renderBatch(content, icon) }
            <p>{title}</p>
        </MenuItem>
      )
  }


  return (
    <div className = "grow">
        <AppBar position="static" style = {{ backgroundColor:"white"}}>
            <Toolbar>
                { renderIconButton(null, <SearchIcon />) }

                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>

                <div className = "grow"/>

                <div className={classes.sectionDesktop}>
                    { renderBatch(4, <MailIcon />) }
                    { renderBatch(17, <NotificationsIcon />) }
                    { renderIconButton(handleProfileMenuOpen, <AccountCircle />) }
                    {/* <FormGroup>
                      <FormControlLabel
                        control={<Switch checked={auth} onChange={()=>{}} aria-label="login switch" />}
                        label={auth ? 'Logout' : 'Login'}
                        style = {{color:"black"}}
                      />
                    </FormGroup> */}
                </div>

                <div className={classes.sectionMobile}>
                    { renderIconButton(handleMobileMenuOpen, <MoreIcon />) }
                </div>
            </Toolbar>
        </AppBar>
        { renderMobileMenu() }
        { renderMenu() }
    </div>
  );
}