import React, { Component } from 'react'
import {connect} from 'react-redux'

class TutorProfile extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user
    }
}

export default connect(mapStateToProps)(TutorProfile)