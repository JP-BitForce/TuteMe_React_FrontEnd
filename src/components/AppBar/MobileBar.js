import React, {useState} from 'react'

//Boostarp
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

//Material-UI
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import './AppBar.css'


const MobileBar = ({
    handleLoginRoute, 
    handleSignUpRoute
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const auth = false

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderMobileView = () => {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" className = "scrolled">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Home</Nav.Link>
                        <Nav.Link href="#pricing">Features</Nav.Link>
                        <NavDropdown title="Breadcrumb" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand>
                    <AccountCircle onClick={handleClick}/>
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
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem>logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick = {handleLoginRoute}>Sign in</MenuItem>
                                    <MenuItem onClick = {handleSignUpRoute}>Sign up</MenuItem>
                                </>
                            )
                        }

                    </Menu>
                </Navbar.Brand>
            </Navbar>
        )
    }

    return (
        <div className = "appBar_div_root">
            { renderMobileView() }
        </div>
    )
}

export default MobileBar
