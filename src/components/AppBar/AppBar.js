import React, {useState} from 'react'
import './AppBar.css'

//Boostrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

//Material-UI
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const AppBar = () => {
    const [auth,setAuth] = useState(false)

    const handleLoginRoute = () => {
        window.location.replace('/signIn')
    }

    const handleSignUpRoute = () => {
        window.location.replace('/signUp')
    }

    return (
        <div className = "appBar_div_root">
            <Navbar bg="light" variant="light">
                <Toolbar>
                    <IconButton edge="start" aria-label="drawer">
                        <MenuIcon />
                    </IconButton>

                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Toolbar>

                <Navbar.Collapse className="justify-content-end">
                    {
                        auth ? <Navbar.Text>Signed in as: <a href="#profile">Mark Otto</a></Navbar.Text> :
                        (
                        <ButtonGroup size="large" variant="text" aria-label="large outlined primary button group">
                            <Button className = "auth" onClick = {handleLoginRoute}>LOGIN</Button>
                            <Button onClick = {handleSignUpRoute}>SIGN UP</Button>
                        </ButtonGroup>
                        )
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default AppBar