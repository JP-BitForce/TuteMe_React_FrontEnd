import React, {useEffect, useState} from 'react'

import AppBar from '../../components/AppBar/AppBar'
import MobileBar from '../../components/AppBar/MobileBar'

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
            <div className ="landing_root">
                {
                    mobileView ? <MobileBar/> : <AppBar/>
                }
            </div>
        </div>
    )
}

export default LandingPage