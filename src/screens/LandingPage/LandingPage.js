import React, {useEffect, useState} from 'react'

import AppBar from '../../components/AppBar/AppBar'
import Footer from '../../components/Footer/Footer'
import Content from './Content'

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
            <AppBar mobileView = {mobileView}/>
            <Content/>
            <Footer/>
        </div>
    )
}

export default LandingPage