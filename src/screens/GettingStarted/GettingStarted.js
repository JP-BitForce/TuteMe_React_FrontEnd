import React from 'react'

import SideBar from '../../components/SideBar/SideBar'
import NavBar from '../../components/AppBar/NavBar'

import './GettingStarted.css'

const GettingStarted = () => {
    return (
        <div className = "getting_started_root">
            <NavBar/>
            <SideBar/>
        </div>
    )
}

export default GettingStarted