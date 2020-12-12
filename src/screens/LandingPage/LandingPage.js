import React from 'react'

import AppBar from '../../components/AppBar/AppBar'

//Material-UI
import Paper from '@material-ui/core/Paper';

import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className = "landing_root_div">
            <div className ="landing_root">
                <AppBar/>
            </div>
            <Paper elevation={5} className = "landing_content" >
            </Paper>
        </div>
    )
}

export default LandingPage
