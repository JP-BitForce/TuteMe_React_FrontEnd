import React, {useState, useEffect} from 'react'
import './AppBar.css'

//Boostrap
import Navbar from 'react-bootstrap/Navbar'

//Material-UI
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.grey[100],
      height: theme.spacing(3),
      color: theme.palette.grey[800],
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.grey[300],
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(theme.palette.grey[300], 0.12),
      },
    },
  }))(Chip);

const AppBar = () => {
    const [auth,setAuth] = useState(false)

    const [scrolled,setScrolled]= useState(false);

    const handleScroll = () => {
      const offset = window.scrollY;
      if(offset > 450 ) {
        setScrolled(true);
      }
      else {
        setScrolled(false);
      }
    } 

    useEffect(() => {
      window.addEventListener('scroll',handleScroll)
    })
  
    let x=['appBar_div_root'];

    if(scrolled){
      x.push('scrolled');
    }

    const handleLoginRoute = () => {
        window.location.replace('/signIn')
    }

    const handleSignUpRoute = () => {
        window.location.replace('/signUp')
    }

    const handleClick = () => {

    }

    return (
        <div className = "appBar_div_root">
            <Navbar fixed="top" className={x.join(" ")} >
                <Toolbar>
                    <IconButton edge="start" aria-label="drawer" style = {{color:'white'}}>
                        <MenuIcon />
                    </IconButton>

                    <Breadcrumbs aria-label="breadcrumb">
                        <StyledBreadcrumb
                            component="a"
                            href="/"
                            label="Home"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb 
                            component="a" 
                            href="#" 
                            label="Catalog" 
                            onClick={handleClick} 
                        />
                        <StyledBreadcrumb
                            label="Accessories"
                            deleteIcon={<ExpandMoreIcon />}
                            onClick={handleClick}
                            onDelete={handleClick}
                        />
                    </Breadcrumbs>
                </Toolbar>

                <Navbar.Collapse className="justify-content-end">
                    {
                        auth ? <Navbar.Text>Signed in as: <a href="#profile">Mark Otto</a></Navbar.Text> :
                        (
                        <ButtonGroup size="large" variant="text" aria-label="large outlined primary button group">
                            <Button className = "auth" onClick = {handleLoginRoute} style = {{color:'white'}}>LOGIN</Button>
                            <Button onClick = {handleSignUpRoute} style = {{color:'white'}}>SIGN UP</Button>
                        </ButtonGroup>
                        )
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default AppBar