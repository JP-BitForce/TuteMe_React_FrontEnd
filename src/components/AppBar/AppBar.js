import React, {useState} from 'react'
import {connect} from 'react-redux'

//Boostrap
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

//Material-UI
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

import MoreIcon from '@material-ui/icons/MoreVert';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

import './AppBar.css'

const AppBar = ({auth}) => {
  const [anchorEl, setAnchorEl] = useState(null);

    const nav = [
      {label:"Home", href:"/", icon: <HomeIcon className = "icon" />},
      {label:"All Courses", href:"/", icon: <GrainIcon className = "icon" />},
      {label:"Staffs", href:"/", icon: <WhatshotIcon className = "icon" />},
      {label:"Contact", href:"/", icon: <InboxIcon className = "icon" />},
    ];

    const handleLoginRoute = () => {
        window.location.replace('/signIn')
    }

    const handleSignUpRoute = () => {
        window.location.replace('/signUp')
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(false)
    }

    return (
        <div className = "appBar_div_root">
          <Navbar collapseOnSelect expand="lg" fixed="top" className="appbar">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {
                  nav.map(item => {
                    const {label, href, icon} = item
                    return (
                      <Nav.Link href = {href} style = {{fontWeight:'bold'}}> {icon} {label} </Nav.Link>
                    )
                  })
                }
              </Nav>
            </Navbar.Collapse>

            <Navbar.Collapse className="justify-content-end">
                <div className = "section_desktop">
                  {
                    !auth ? (
                      <div className = "setion_desktop_container">
                        <Button variant="outline-primary" onClick = {handleLoginRoute}> SIGN IN </Button>
                        <div className = "horizontal_seperator"/>
                        <Button variant="outline-primary" onClick = {handleSignUpRoute}> SIGN UP </Button>
                        <div className = "horizontal_seperator"/>
                      </div>
                    )
                    :
                    <div className = "setion_desktop_container">
                      <Button variant="outline-primary" onClick = {handleLoginRoute}> LOG OUT </Button>
                    </div>
                  }
                </div>
            </Navbar.Collapse>
            <div className = "section_mobile">
              <IconButton aria-label="display more actions" edge="end" color="inherit" onClick = {handleClick}>
                <MoreIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {
                    auth ? (
                      <>
                        <MenuItem>PROFILE</MenuItem>
                        <MenuItem>LOGOUT</MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem onClick = {handleLoginRoute}>SIGN IN</MenuItem>
                        <MenuItem onClick = {handleSignUpRoute}>SIGN UP</MenuItem>
                      </>
                    )
                }
              </Menu>      
            </div>
          </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
      auth: state.auth.user
  }
}

export default connect(mapStateToProps)(AppBar)