import React, {useEffect, useState} from 'react'

import AppBar from '../../components/AppBar/AppBar'
import Carousels from '../../components/Carousel/Carousels'
import LandingContent from '../../components/LandingContent/LandingContent'
import Footer from '../../components/Footer/Footer'

import './LandingPage.css'

const LandingPage = () => {
    const [mobileView, setMobileView] = useState(false)

    useEffect(() => {
        window.addEventListener("resize", resize.bind(this));
        resize();
    })

    const resize = () => {
        let mobileView = (window.innerWidth <= 992);
        setMobileView(mobileView)
    }

    return (
        <div className = "landing_root_div">
            <Carousels mobileView = {mobileView}/>
            <AppBar mobileView = {mobileView}/>
            <LandingContent mobileView = {mobileView}/>
            <Footer mobileView = {mobileView}/>
        </div>
    )
}

export default LandingPage