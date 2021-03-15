import React from 'react'

import Row from "react-bootstrap/Row";

import IconButton from '@material-ui/core/IconButton';

import './SocialRegister.css'

const SocialRegister = () => {
    return (
        <div className = "social_conatiner">
            <div className = "social_divider">
                <span className = "social_divider_or">Or sign in with</span>
            </div>
            <Row className = "social_register">
                <div className = "social_block">
                    <IconButton aria-label="goole">
                        <div className = "login-google"/>
                    </IconButton>
                    <span className = "social-btn-label">Google</span>
                </div>
                            
                <div className = "social_block">
                    <IconButton aria-label="goole">
                        <div className = "login-fb"/>
                    </IconButton>
                    <span className = "social-btn-label">Facebook</span>
                </div>
            </Row>
        </div>
    )
}

export default SocialRegister
