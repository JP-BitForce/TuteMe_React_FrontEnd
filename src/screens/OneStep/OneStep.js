import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import HeaderTopper from '../../components/Header/HeaderTopper'
import HeaderCard from '../../components/Header/HeaderCard'
import Questions from './Questions'
import Tag from './Tag'

import ContactSupport from '@material-ui/icons/ContactSupport'
import Label from '@material-ui/icons/Label'
import FiberNew from '@material-ui/icons/FiberNew'

import headerImg from '../../assets/images/OneStep/headerImg.jpg'
import './OneStep.css'

class OneStep extends Component {
    state = {
        loading: false,
        childNav: ["One-Step", "Questions"],
        tabValue: 1,
        searchValueError: null,
        searchValue: "" 
    }

    tab_links = [ "Questions", "Tags", "New"]

    icons = {
        Questions: <ContactSupport/>,
        Tags: <Label/>,
        New: <FiberNew/>
    }

    handleFilter = (item) => {
        
    }

    handleTagSearch = () => {

    }

    handleInputOnChange = (event) => {
        const {value, name} = event.target
        this.setState({
            [name]: value,
            searchValueError: false
        })
    }

    handleTabChange = (newValue) => {
        this.setState({ 
            tabValue: newValue,
            childNav: ["One-Step", this.tab_links[newValue]],
        })
    }

    handleAskOnClick = () => {
        this.handleTabChange(3)
    }

    handlePaginationOnChange = (page) => {

    }

    renderQuestionTab = () => {
        return <Questions 
            handleAskOnClick = {this.handleAskOnClick}
            handleFilterOnClick = {this.handleFilter}
            handlePaginationOnChange = {this.handlePaginationOnChange}
            total = {1} 
            current = {1}
        />
    }

    renderTagTab = () => {
        return <Tag
            values = {this.state}
            handleTagSearch = {this.handleTagSearch}
            handleInputOnChange = {this.handleInputOnChange}
            auth = {this.props.auth}
        />
    }

    renderMain = () => {
        switch(this.state.tabValue) {
            case 0: return this.renderQuestionTab()
            case 1: return this.renderTagTab()
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