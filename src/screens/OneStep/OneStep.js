import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import HeaderTopper from '../../components/Header/HeaderTopper'
import HeaderCard from '../../components/Header/HeaderCard'
import Questions from './Questions'
import Tag from './Tag'
import NewQuestion from './NewQuestion'

import { getTags } from '../../api/oneStep'

import ContactSupport from '@material-ui/icons/ContactSupport'
import Label from '@material-ui/icons/Label'
import FiberNew from '@material-ui/icons/FiberNew'

import headerImg from '../../assets/images/OneStep/headerImg.jpg'
import './OneStep.css'

class OneStep extends Component {
    state = {
        loading: false,
        childNav: ["One-Step", "Questions"],
        tabValue: 2,
        searchValueError: null,
        searchValue: "",
        title: "",
        content: "",
        tags: [],
        addNewLoading: false,
        tagList: [],
        questionTotal: 1,
        questionCurrent: 1,
        tagTotal: 1,
        tagCurrent:1 
    }

    tab_links = [ "Questions", "Tags", "New"]

    icons = {
        Questions: <ContactSupport/>,
        Tags: <Label/>,
        New: <FiberNew/>
    }

    componentDidMount() {
        this.getOneStepData()
    }

    getOneStepData = async() => {
        try {
            this.setState({ loading: true })
            const auth = this.props.auth
            const tags = await getTags(auth.accessToken)
            this.setState({ 
                loading: false, 
                tagList: tags 
            })
        } catch(err) {
            this.setState({ loading: false })
        }
    }

    handleFilter = (item) => {
        
    }

    handleTagSearch = () => {

    }

    handlePost = () => {
        
    }

    handleCancel = () => {

    }

    handleTagsChange = (event) => {
        this.setState({
            tags: event.target.value
        })
    }

    handleContentOnChange = (value) => {
        this.setState({
            content: value
        })
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
        this.handleTabChange(2)
    }

    handlePaginationOnChange = (page) => {

    }

    handleTagsPagination = (page) => {
        
    }

    renderQuestionTab = () => {
        return <Questions 
            handleAskOnClick = {this.handleAskOnClick}
            handleFilterOnClick = {this.handleFilter}
            handlePaginationOnChange = {this.handlePaginationOnChange}
            total = {this.state.questionTotal} 
            current = {this.state.questionCurrent}
        />
    }

    renderTagTab = () => {
        return <Tag
            values = {this.state}
            handleTagSearch = {this.handleTagSearch}
            handleInputOnChange = {this.handleInputOnChange}
            handleTagsPagination = {this.handleTagsPagination}
        />
    }

    renderNewTab = () => {
        return <NewQuestion
            values = {this.state}
            handleOnChange = {this.handleInputOnChange}
            handleContentOnChange = {this.handleContentOnChange}
            handleTagsChange = {this.handleTagsChange}
            handleCancel = {this.handleCancel}
            handlePost = {this.handlePost}
        />
    }

    renderMain = () => {
        switch(this.state.tabValue) {
            case 0: return this.renderQuestionTab()
            case 1: return this.renderTagTab()
            case 2: return this.renderNewTab()
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