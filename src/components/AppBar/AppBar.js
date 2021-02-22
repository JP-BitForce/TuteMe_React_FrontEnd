import React from 'react'

import DesktopBar from './DesktopBar'
import MobileBar from './MobileBar'

import './AppBar.css'

const AppBar = ({mobileView}) => {
    const handleLoginRoute = () => {
        window.location.replace('/signIn')
    }

    const handleSignUpRoute = () => {
        window.location.replace('/signUp')
    }

    return (
        <div className = "appBar_div_root">
            {
              !mobileView ? 
                <DesktopBar
                  handleLoginRoute = { handleLoginRoute }
                  handleSignUpRoute = { handleSignUpRoute }
                /> 
                : 
                <MobileBar
                  handleLoginRoute = { handleLoginRoute }
                  handleSignUpRoute = { handleSignUpRoute }
                />
            }
        </div>
    )
}

export default AppBar