import React from 'react'

import AppBar from '../../components/AppBar/AppBar'
import Footer from '../../components/Footer/Footer'
import Content from './Content'

import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className = "landing_root_div">
            <AppBar/>
            <Content/>
            <Footer/>
        </div>
    )
}

export default LandingPage