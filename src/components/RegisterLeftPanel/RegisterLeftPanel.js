import React from 'react'
import IconButton from '@material-ui/core/IconButton';

import './RegisterLeftPanel.css'

const RegisterLeftPanel = ({tag}) => {

    const renderMessagesRoot = () => {
        switch(tag) {
            case "signin" : return renderSignInMessages()
            case "signup" : return renderSignUpMessages()
            default : return renderForgotpasswordMessages()
        }
    }

    const renderSignInMessages = () => {
        return (
            <div className = "login_paper_left-text">
                <span className = "login_paper_left_message01">Welcome back</span>
                <span className = "login_paper_left_message02">Please Login to your continue</span>
            </div>
        )
    }

    const renderSignUpMessages = () => {
        return (
            <div className = "login_paper_left-text">
                <span className = "login_paper_left_message01">Register with us!</span>
                <span className = "login_paper_left_message02">Join now to be a part of the revolution!</span>
            </div>
        )
    }

    const renderForgotpasswordMessages = () => {
        return (
            <div className = "login_paper_left-text forgot-password-text">
                <span className = "login_paper_left_message01">Forgot Password ?</span>
                <span className = "login_paper_left_message02">Follow this steps to reset your credentials</span>
            </div>
        )
    }

    return (
        <div className = "login_paper_left">
            {
                renderMessagesRoot()
            }
            <div className = "follow-us">
                <span className = "login_paper_left_message03">Follow Us</span>
                <div className = "follow-us-content">
                    <div className = "social_block">
                        <IconButton aria-label="goole">
                                <div className = "login-ins"/>
                        </IconButton>
                        <span className = "social-btn-label">Instagram</span>
                    </div>
                                        
                    <div className = "social_block">
                        <IconButton aria-label="goole">
                            <div className = "login-fb"/>
                        </IconButton>
                        <span className = "social-btn-label">Facebook</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default RegisterLeftPanel
