import React from 'react'

import './AppBar.css'

//Boostrap
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

//Material-UI
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import Link from '@material-ui/core/Link';

const DesktopBar = ({handleLoginRoute, handleSignUpRoute}) => {
    const nav = [
      {label:"Home", href:"/", icon: <HomeIcon className = "icon" />},
      {label:"Features", href:"/features", icon: <GrainIcon className = "icon" />},
      {label:"Breadcrumb", href:"/breadcrumb", icon: <WhatshotIcon className = "icon" />},
    ];

    const renderDesktopView = () => {
      return (
        <Navbar fixed="top" className="scrolled">
          <Toolbar>
            <Breadcrumbs aria-label="breadcrumb">
              {
                nav.map(item => {
                  return (
                    <Link color="inherit" href= {item.href} className = "link">
                      {item.icon}  {item.label}
                    </Link>
                  )
                })
              }
            </Breadcrumbs>
          </Toolbar>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-primary" onClick = {handleLoginRoute}> SIGN IN </Button>
            <div className = "horizontal_seperator"/>
            <Button variant="outline-primary" onClick = {handleSignUpRoute}> SIGN UP</Button>
            <div className = "horizontal_seperator"/>
          </Navbar.Collapse>
        </Navbar>
      )
    }

    return (
        <div className = "appBar_div_root">
          { renderDesktopView() }
        </div>
    )
}

export default DesktopBar
