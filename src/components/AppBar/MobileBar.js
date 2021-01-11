import React, {useState} from 'react'

//Material-UI
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Chip from '@material-ui/core/Chip';
import { emphasize, withStyles } from '@material-ui/core/styles';

import Button from '../../components/Button/Button'

import './AppBar.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.grey[300],
      height: theme.spacing(5),
      color: theme.palette.grey[800],
      fontWeight: 'bold',
      '&:hover, &:focus': {
        backgroundColor: theme.palette.grey[500],
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(theme.palette.grey[500], 0.12),
      },
      width: "100%",
      marginTop:"4%",
    },
}))(Chip);

const MobileBar = () => {
    const [showDrawer,setDrawer] = useState(false)
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const classes = useStyles();
  
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const toggleDrawer = () => {
        setDrawer(!showDrawer)
    }

    const handleRoute = (route) => {
        window.location.replace(route)
    }

    const navList = () => {
        return (
            <div className = "mobile_drawer_block">
                <div className = "mobile_drawer_logo_block">
                    <div className = "mobile_drawer_logo_div">
                        <div className = "mobile_drawer_logo"/>
                    </div>
                    <div className = "mobile_drawer_logo_content">
                        <span className = "mobile_drawer_logo_content_01">Hello there!</span>
                        {
                            auth ? (
                                <span className = "mobile_drawer_logo_content_02">
                                    Login in as <span style = {{fontWeight:'bold'}}>raj@gmail.com </span>
                                </span>
                            ) : (
                                <span className = "mobile_drawer_logo_content_02">Login to connect with us</span>
                            )
                        }

                    </div>
                </div>
                <div className = "mobile_drawer_seperator"/>

                <div className = "mobile_drawer_list_block">
                    <StyledBreadcrumb
                        component="a"
                        href="/"
                        label="Home"
                        icon={<HomeIcon fontSize="small" />}
                    />

                    {
                        auth && (
                            <>
                                <StyledBreadcrumb
                                    component="a"
                                    href="#"
                                    label="One Step"
                                />
                                
                                <StyledBreadcrumb
                                    label="Accessories"
                                    deleteIcon={<ExpandMoreIcon />}
                                    onClick={() => {}}
                                    onDelete={() => {}}
                                />
                            </>
                        )
                    }

                    <StyledBreadcrumb 
                        component="a" 
                        href="#" 
                        label="About us" 
                    />
                </div>

                <div className = "mobile_drawer_seperator"/>

                <div className = "mobile_drawer_list_footer">
                    {
                        auth ? (
                            <>
                            <Button
                                label = "LOG IN"
                                handleClick = {() => { handleRoute('/signIn') }}
                            />
                            <Button
                                label = "SIGN UP"
                                handleClick = {() => { handleRoute('/signUp') }}
                            />
                            </>
                        ) : (
                            <Button
                                label = "LOG OUT"
                            />
                        )
                    }

                </div>
            </div>
        )
    }

    return (
        <div>
            <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
                { navList() }
            </Drawer>

            <AppBar position="static">
                <Toolbar className = "mobile_bar">
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        color="inherit" 
                        aria-label="menu"
                        onClick = { toggleDrawer }
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}/>
                    {
                        auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default MobileBar
