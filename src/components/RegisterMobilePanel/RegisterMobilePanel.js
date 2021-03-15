import React from 'react'
import IconButton from '@material-ui/core/IconButton';

import './RegisterMobilePanel.css'

const RegisterMobilePanel = () => {
    return (
        <div className = "welcome_panel">
            <div className = "welcome-text">
                <IconButton aria-label="logo" onClick = {() => { window.location.replace('/')}}>
                    <div className = "welcome_logo"/>
                </IconButton>
                <span className = "welcome_message01">Welcome back</span>
                <span className = "welcome_message02">Please Login to your continue</span>
            </div>
        </div>
    )
}

export default RegisterMobilePanel
