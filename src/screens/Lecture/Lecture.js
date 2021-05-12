import React, { Component } from 'react'
import {connect} from 'react-redux'

import HeaderTopper from '../../components/Header/HeaderTopper'

import './Lecture.css'

class Lecture extends Component {
    state = {
        childNav: ["Lecture", "Home"],
    }

    render() {
        const {childNav} = this.state
        return (
            <div className = "lecture_root_div">
                <HeaderTopper screen = "Lecture" rootNav = "Pages" childNav = {childNav}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user
    }
}


export default connect(mapStateToProps)(Lecture)
