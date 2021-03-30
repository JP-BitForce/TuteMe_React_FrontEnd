import React, {Component} from 'react'

import AppBar from '../../components/AppBar/AppBar'
import Footer from '../../components/Footer/Footer'
import LandingContents from './LandingContents'

import './LandingPage.css'

class LandingPage extends Component {
    render() {
        const history = this.props.history
        return (
            <div className = "landing_root_div">
                <AppBar history = {history}/>
                <LandingContents history = {history}/>
                <Footer history = {history}/>
            </div>
        )
    }
}

export default LandingPage