import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import HeaderTopper from '../../components/Header/HeaderTopper'
import HeaderCard from '../../components/Header/HeaderCard'
import Questions from './Questions'
import Tag from './Tag'
import NewQuestion from './NewQuestion'
import SnackBar from '../../components/SnackBar/SnackBar'

import { getTags, postQuestion, getQuestions } from '../../api/oneStep'

import ContactSupport from '@material-ui/icons/ContactSupport'
import Label from '@material-ui/icons/Label'
import FiberNew from '@material-ui/icons/FiberNew'

import headerImg from '../../assets/images/OneStep/headerImg.jpg'
import './OneStep.css'

class OneStep extends Component {
    state = {
        loading: false,
        childNav: ["One-Step", "Questions"],
        tabValue: 0,
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
        tagCurrent:1,
        snackBarOn: false,
        severity: "success",
        snackBarMessage: "",
        questionData:[]
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
            this.getQuestionsApi(0)
            const tags = await getTags(auth.accessToken)
            this.setState({ 
                loading: false, 
                tagList: tags 
            })
        } catch(err) {
            this.setState({ loading: false })
        }
    }

    getQuestionsApi = (page) => {
        const auth = this.props.auth
        getQuestions(auth.accessToken, page).then(response => {
            this.setState({
                questionData: response.questionList,
                questionTotal: response.total,
                questionCurrent: response.current,
            })
        }).catch(err => {
            this.setState({
                questionData: [],
                questionTotal: 1,
                questionCurrent: 1,
            })
        })
    }

    handleFilter = (item) => {
        
    }

    handleTagSearch = () => {

    }

    handlePost = () => {
        const {title, content, tags} = this.state
        const auth = this.props.auth
        const body = {
            userId: auth.userId,
            title,
            content,
            tags
        }
        this.setState({ addNewLoading: true })
        postQuestion(auth.accessToken, body).then(response => {
            if(response.success) {
                this.setState({
                    snackBarOn: true,
                    severity: "success",
                    snackBarMessage: response.message,
                    title: "",
                    content: "",
                    tags:[],
                    addNewLoading: false
                })
            }
        }).catch(err => {
            this.setState({
                snackBarOn: true,
                severity: "error",
                snackBarMessage: "Unable to post question, please try again",
                addNewLoading: false
            })
        })
    }

    handleCancel = () => {
        this.setState({
            title: "",
            content: "",
            tags: []
        })
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

    handleSnackBarClose = () => {
        this.setState({
            snackBarOn: false,
            snackBarMessage: "",
            severity: ""
        })
    }

    renderQuestionTab = () => {
        return <Questions 
            handleAskOnClick = {this.handleAskOnClick}
            handleFilterOnClick = {this.handleFilter}
            handlePaginationOnChange = {this.handlePaginationOnChange}
            total = {this.state.questionTotal} 
            current = {this.state.questionCurrent+1}
            data = {this.state.questionData}
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
        const { tabValue, loading, snackBarOn, snackBarMessage, severity} = this.state
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
                <SnackBar
                    open = {snackBarOn}
                    autoHideDuration = {3000}
                    message = {snackBarMessage}
                    severity = {severity}
                    handleClose = {this.handleSnackBarClose}
                    align = {{ vertical: 'top', horizontal: 'right' }}
                />
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