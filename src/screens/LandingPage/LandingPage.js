import React from 'react'

import AppBar from '../../components/AppBar/AppBar'
import Carousel from '../../components/Carousel/ImageCarousel'

import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className = "landing_root_div">
            <AppBar/>
            <Carousel/>
        </div>
    )
}

export default LandingPage
