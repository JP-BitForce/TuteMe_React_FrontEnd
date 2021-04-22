import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import HeaderTopper from '../../components/Header/HeaderTopper'
import HeaderCard from '../../components/Header/HeaderCard'
import Questions from './Questions'

import ContactSupport from '@material-ui/icons/ContactSupport'
import Label from '@material-ui/icons/Label'
import TagFaces from '@material-ui/icons/TagFaces'
import FiberNew from '@material-ui/icons/FiberNew'

import headerImg from '../../assets/images/OneStep/headerImg.jpg'
import './OneStep.css'

class OneStep extends Component {
    state = {
        loading: false,
        childNav: ["One-Step", "Questions"],
        tabValue: 0
    }

    tab_links = [ "Questions", "Tags", "Users", "New"]

    icons = {
        Questions: <ContactSupport/>,
        Tags: <Label/>,
        Users: <TagFaces/>,
        New: <FiberNew/>
    }

    handleFilter = (item) => {
        
    }

    handleTabChange = (newValue) => {
        this.setState({ 
            tabValue: newValue,
            childNav: ["One-Step", this.tab_links[newValue]] 
        })
    }

    handleAskOnClick = () => {
        this.handleTabChange(3)
    }

    handlePaginationOnChange = (page) => {

    }

    renderMain = () => {
        switch(this.state.tabValue) {
            case 0: return <Questions 
                                handleAskOnClick = {this.handleAskOnClick}
                                handleFilterOnClick = {this.handleFilter}
                                handlePaginationOnChange = {this.handlePaginationOnChange}
                                total = {1} 
                                current = {1}
                            />
            default: return
        }
    }

    render() {
        const { tabValue, loading } = this.state
        return (
            <div className = "one_step_root">
                <HeaderTopper
                    screen = "One-Step"
                    rootNav = "General"
                    childNav = {this.state.childNav}
                />
                <div className = "one_step_header_card">
                    <HeaderCard
                        tabs = {this.tab_links}
                        src = {headerImg}
                        icons = {this.icons}
                        tabValue = {tabValue}
                        handleTabChange = {this.handleTabChange}
                    />
                </div>
                {
                    loading ? <Loading open = {loading}/>
                    :
                    <div className = "one_step_main_root">
                        { this.renderMain() }
                    </div> 
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth.user
    }
}

export default connect(mapStateToProps)(OneStep)