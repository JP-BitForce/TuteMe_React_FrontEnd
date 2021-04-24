import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import HeaderTopper from '../../components/Header/HeaderTopper'
import HeaderCard from '../../components/Header/HeaderCard'
import Questions from './Questions'
import Tag from './Tag'
import NewQuestion from './NewQuestion'
import SnackBar from '../../components/SnackBar/SnackBar'
import QuestionPreview from './QuestionPreview'

import { 
    getTags, 
    postQuestion, 
    getQuestions, 
    searchTagByTitle, 
    filterTagsByAlphabet,
    filterQuestions,
    addQuestionVote 
} from '../../api/oneStep'

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
        questionData:[],
        tagFilterList: [],
        searchTag: false,
        searchLoading: false,
        filtered: false,
        questionFilterData: [],
        openQuestionPreview: false,
        selectedQuestion: null
    }

    tab_links = [ "Questions", "Tags", "New" ]

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
            this.getQuestionsApi(0)
            this.getTagsApi(0)
        } catch(err) {
            this.setState({ loading: false })
        }
    }

    getTagsApi = (page) => {
        const auth = this.props.auth
        getTags(auth.accessToken, page).then(response => {
            this.setState({ 
                loading: false, 
                tagList: response.tags,
                tagFilterList: response.tags,
                tagTotal: response.total,
                tagCurrent: response.current+1 
            })
        }).catch(err => {
            this.setState({ 
                loading: false, 
                tagList: [],
                tagFilterList: [] 
            })
        })
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

    handleTagSearch = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if(!this.state.searchTag) {
            const searchValue = this.state.searchValue
            const auth = this.props.auth
            this.setState({ searchLoading: true, searchTag: true})
            searchTagByTitle(auth.accessToken, searchValue).then(response => {
                this.setState({
                    searchLoading: false,
                    tagFilterList: response,
                })
            }).catch(err => {
                this.setState({
                    searchLoading: false,
                    tagFilterList: [],
                })
            })
        } else {
            this.setState({ 
                searchLoading: false, 
                searchTag: false,
                tagFilterList: this.state.tagList,
                searchValue: "",
                searchValueError: null
            })
        }
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

    handleFilterTagsByAlphabet = () => {
        if(!this.state.filtered) {
            const auth = this.props.auth
            this.setState({ searchLoading: true, filtered: true })
            filterTagsByAlphabet(auth.accessToken).then(response => {
                this.setState({
                    searchLoading: false,
                    tagFilterList: response,
                })
            }).catch(err => {
                this.setState({
                    searchLoading: false,
                    tagFilterList: [],
                })
            })
        } else {
            this.setState({
                searchLoading: false,
                tagFilterList: this.state.tagList,
                filtered: false
            })
        }
    }

    handleFilter = (type) => {
        if(type === "All") {
            this.getQuestionsApi(0)
        } else {
            const auth = this.props.auth
            filterQuestions(auth.accessToken, type, 0).then(response => {
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
    }

    handleVote = (qId) => {
        const auth = this.props.auth
        const body = {
            userId: auth.userId,
            questionId: qId
        }
        addQuestionVote(auth.accessToken, body).then(response => {
            this.setState({
                severity: "success",
                snackBarOn: response.success,
                snackBarMessage: response.message
            })
        }).catch(err => {
            this.setState({
                severity: "error",
                snackBarOn: true,
                snackBarMessage: "sorry, unable to add vote, please try again later"
            })
        })
    }

    handleQuestionCardOnClick = (item) => {
        this.setState({
            selectedQuestion: item,
            openQuestionPreview: true
        })
    }

    handleQuestionPreviewClose = () => {
        this.setState({
            selectedQuestion: null,
            openQuestionPreview: false
        })
    }

    handleTagOnClick = () => {

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
        if(newValue === 0) {
            this.getQuestionsApi(0)
        }
    }

    handleAskOnClick = () => {
        this.handleTabChange(2)
    }

    handlePaginationOnChange = (event, page) => {
        this.setState({ questionCurrent: page })
        this.getQuestionsApi(page-1)
    }

    handleTagsPagination = (event, page) => {
        this.setState({ tagCurrent: page})
        this.getTagsApi(page-1)
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
            handleQuestionCardOnClick = {this.handleQuestionCardOnClick}
        />
    }

    renderTagTab = () => {
        return <Tag
            values = {this.state}
            handleTagSearch = {this.handleTagSearch}
            handleInputOnChange = {this.handleInputOnChange}
            handleTagsPagination = {this.handleTagsPagination}
            handleTagOnClick = {this.handleTagOnClick}
            handleFilterTagsByAlphabet = {this.handleFilterTagsByAlphabet}
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
        const { tabValue, loading, snackBarOn, snackBarMessage, severity, selectedQuestion, openQuestionPreview} = this.state
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
                {
                    openQuestionPreview && selectedQuestion && 
                    <QuestionPreview 
                        open = {openQuestionPreview}
                        handleClose = {this.handleQuestionPreviewClose}
                        questionItem = {selectedQuestion}
                        auth = {this.props.auth}
                        handleVote = {this.handleVote}
                    />
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