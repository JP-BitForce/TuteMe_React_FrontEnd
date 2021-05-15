import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import HeaderTopper from '../../components/Header/HeaderTopper'
import HeaderCard from '../../components/Header/HeaderCard'
import VideoLecture from './VideoLecture'
import Resources from './Resources'
import SnackBar from '../../components/SnackBar/SnackBar'

import {getCourseByTutor} from '../../api/course'
import {uploadFile, uploadVideo, uploadLink} from '../../api/resource'
import {createJoinId, startLesson} from '../../api/lesson'

//React-Boostarp
import Card from 'react-bootstrap/Card'

import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import DialogContentText from '@material-ui/core/DialogContentText'
import CircularProgress from '@material-ui/core/CircularProgress'

import Home from '@material-ui/icons/Home'
import PostAdd from '@material-ui/icons/PostAdd'

import headerImg from '../../assets/images/Lecture/headerImg.jpg'
import src from '../../assets/images/Course/alt.jpg'
import './Lecture.css'

class Lecture extends Component {
    state = {
        childNav: ["Lecture", "Home"],
        tabValue: 0,
        tutorCourseData: null,
        loading: false,
        joinId: "",
        connected: false,
        file: null,
        video: null,
        link: "",
        fileTitle: "",
        videoTitle: "",
        linkTitle: "",
        fileUploadLoading: false,
        videoUploadLoading: false,
        linkUploadLoading: false,
        snackBarOn: false,
        severity: "success",
        snackBarMessage: "",
        startLoading: false,
        createLoading: false,
        newJoinId: "",
        prefix: "",
        startError: null
    }

    TAB_LINKS = ["Home", "Resources"]
    ICONS = {
        Home: <Home/>,
        Resources: <PostAdd/>
    }

    componentDidMount() {
        this.getCourseByTutorApi()
    }

    getCourseByTutorApi = () => {
        const auth = this.props.auth
        this.setState({ loading: true })
        getCourseByTutor(auth.accessToken, auth.profileId).then(response => {
            this.setState({ tutorCourseData: response, loading: false })
        }).catch(err=> {
            this.setState({ 
                fetchError: err.meesge, 
                loading: false, 
                tutorCourseData: null 
            })
        })
    }

    handleFileUpload = (auth) => {
        const {file, tutorCourseData, fileTitle} = this.state
        const upload = {
            tutorId: auth.profileId,
            courseId: tutorCourseData.id,
            title: fileTitle
        }
        const formData = new FormData()
        const json = JSON.stringify(upload)
        const blob = new Blob([json], {
            type: 'application/json'
        })
        formData.append("file", file)
        formData.append("upload", blob)
        this.setState({ fileUploadLoading: true })
        uploadFile(auth.accessToken, formData).then(response => {
            this.setState({ 
                fileUploadLoading: false,
                file: null,
                fileTitle: ""
            })
            this.setSnackBar("success", response.message)
        }).catch(err => {
            this.setState({ fileUploadLoading: false })
            this.setSnackBar("error", "server error, please try again")
        })
    }

    handleVideoUpload = (auth) => {
        const {video, tutorCourseData, videoTitle} = this.state
        const upload = {
            tutorId: auth.profileId,
            courseId: tutorCourseData.id,
            title: videoTitle
        }
        const formData = new FormData()
        const json = JSON.stringify(upload)
        const blob = new Blob([json], {
            type: 'application/json'
        })
        formData.append("file", video)
        formData.append("upload", blob)
        this.setState({ videoUploadLoading: true })
        uploadVideo(auth.accessToken, formData).then(response => {
            this.setState({ 
                videoUploadLoading: false,
                video: null,
                videoTitle: ""
            })
            this.setSnackBar("success", response.message)
        }).catch(err => {
            this.setState({ videoUploadLoading: false })
            this.setSnackBar("error", "server error, please try again")
        })
    }

    handleLinkUpload = (auth) => {
        const {link, tutorCourseData, linkTitle} = this.state
        const upload = {
            tutorId: auth.profileId,
            courseId: tutorCourseData.id,
            link,
            title: linkTitle
        }
        this.setState({ linkUploadLoading: true })
        uploadLink(auth.accessToken, upload).then(response => {
            this.setState({ 
                linkUploadLoading: false,
                link: "",
                linkTitle: "" 
            })
            this.setSnackBar("success", response.message)
        }).catch(err => {
            this.setState({ linkUploadLoading: false })
            this.setSnackBar("error", "server error, please try again")
        })
    }

    handleUpload = (type) => {
        const auth = this.props.auth
        if (type === "file") {
            this.handleFileUpload(auth)
        } else if (type === "video") {
            this.handleVideoUpload(auth)
        } else if (type === "link") {
            this.handleLinkUpload(auth)
        }
    }

    handleCreate = () => {
        const {prefix, tutorCourseData} = this.state
        const auth = this.props.auth
        if (prefix) {
            this.setState({ createLoading: true })
            const body = {
                tutorId: auth.profileId,
                courseId: tutorCourseData.id,
                joinId: prefix
            }
            createJoinId(auth.accessToken, body).then(response => {
                this.setState({ 
                    createLoading: false,
                    newJoinId: response.message,
                    prefix: "" 
                })
            }).catch(err => {
                this.setState({ 
                    createLoading: false,
                    newJoinId: "" 
                })
            })
        }
    }

    handleStart = async() => {
        const {joinId, tutorCourseData} = this.state
        let verified = false
        if (joinId) {
            this.setState({ startLoading: true })
            const auth = this.props.auth
            const body = {
                tutorId: auth.profileId,
                courseId: tutorCourseData.id,
                joinId: joinId
            }
            try {
                await startLesson(auth.accessToken, body)
                this.setState({ 
                    startLoading: false,
                    connected: true,
                    startError: null,
                    joinId: ""
                })
                verified =  true
            } catch (err) {
                let startError = null
                if (err.message === "JOIN_ID_NOT_FOUND") {
                    startError = "You not created a join id for this course, please create first"
                } 
                else if (err.message === "JOIN_ID_MISMATCH") {
                    startError = "Oops! sorry id is incorrect, try again"
                }
                else {
                    startError = "server error, please try again later"
                }
                this.setState({ 
                    startLoading: false,
                    connected: false,
                    startError
                })
            }
        }
        return verified
    }

    handleDisconnect = () => {
        this.setState({ connected: false })
    }

    handleFileOnSelect = (file, type) => {
        let reader = new FileReader()
        reader.onloadend = () => {
            this.setState({ 
                cover: reader.result,
                [type]: file 
            })
        }
        reader.readAsDataURL(file)
    }

    handleFileOnDeSelect = (type) => {
        this.setState({ [type]: null })
    }

    handleInputOnChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value, startError: null })
    }

    handleTabChange = (newValue) => {
        const childNav = ["Lecture"]
        childNav.push(this.TAB_LINKS[newValue])
        this.setState({ tabValue: newValue, childNav })
    }

    handleSnackBarClose = () => {
        this.setState({
            snackBarOn: false,
            severity: "",
            snackBarMessage: ""
        })
    }

    getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    setSnackBar = (severity, snackBarMessage) => {
        this.setState({
            snackBarOn: true,
            severity,
            snackBarMessage
        })
    }

    renderDetail = (content, value) => {
        return (
            <DialogContentText id="alert-dialog-slide-description">
                <span className = "modal_item_primary"> {content} : </span>
                <span className = "modal_item_secondary">{value ? value : "Unknown"}</span>
            </DialogContentText>
        )
    }

    renderSchedules = (values) => {
        return (
            <DialogContentText id="alert-dialog-slide-description">
                <span className = "modal_item_primary">Schedules</span>
                <div className = "schedule_list">
                    {
                        values.map(item => {
                            const {id, day, startTime, endTime} = item
                            return (
                                <span className = "modal_item_secondary" key = {id}>
                                    {`${day} =: ${startTime} - ${endTime}`}
                                </span>
                            )
                        })
                    }
                </div>
            </DialogContentText>
        )
    }

    renderCourseDuration = (value) => {
        const {year, month, days} = value
        return (
            <DialogContentText id="alert-dialog-slide-description">
                <span className = "modal_item_primary">Duration</span>
                <div>
                    <span className = "modal_item_secondary">
                        {year} year(s), {month} month(s), {days} day(s)
                    </span>
                </div>
            </DialogContentText>
        )
    }

    renderTop = () => {
        const {id, title, description, courseImg, courseCategory, courseType, schedules, courseDuration} = this.state.tutorCourseData
        return (
            <Card>
                <Card.Body>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={7}>
                            <CardMedia
                                image = { courseImg ?  this.getImageSource(courseImg) : src}
                                title = {title}
                                style = {{width: "100%", height: "100%"}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={5}>
                            <div className = "">
                                <div className = "en_course_prev_poster_detail">
                                    { this.renderDetail("Id", id) }
                                    { this.renderDetail("Name", title) }
                                    { this.renderDetail("Description", description) }
                                    { this.renderDetail("Category", courseCategory.category) }
                                    { this.renderDetail("Type", courseType.title) }
                                    { this.renderCourseDuration(courseDuration) }
                                    { this.renderSchedules(schedules) }
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    { this.renderCreateId() }
                </Card.Body>
            </Card>
        )
    }

    renderResources = () => {
        return (
            <div>
                <span className = "header_title_span text_left">Upload Resources</span>
                <Resources 
                    handleFileOnSelect = {this.handleFileOnSelect} 
                    handleFileOnDeSelect = {this.handleFileOnDeSelect}   
                    handleInputOnChange = {this.handleInputOnChange}
                    link = {this.state.link}
                    handleUpload = {this.handleUpload}
                    values = {this.state}
                />
            </div>
        )
    }

    renderCreateId = () => {
        const {prefix, newJoinId, createLoading} = this.state
        return (
            <div className = "create_new_pre_root">
                <h5> Create a new join Id prefix for your course </h5>
                <div className="callBox flex">
                    <input 
                        type = "text" 
                        placeholder = "Prefix" 
                        value = {prefix} 
                        onChange = {this.handleInputOnChange} 
                        className = "form-input"
                        name = "prefix" 
                        max = {3}   
                    />
                    <button onClick={this.handleCreate} className="primaryButton">
                        { createLoading ? <CircularProgress/> : "Create" }
                    </button>
                </div>
                { newJoinId && <h6 className = "secondary_text"> 
                            Your Join ID: <span className = "new_join_id">{newJoinId} </span>
                            (Please make sure you can get remember)
                    </h6>
                }
            </div>
        )
    }

    renderVideoLecture = () => {
        const {joinId, connected, tutorCourseData, startLoading, startError} = this.state
        return (
            <div className = "video_lec_main">
                <span className = "header_title_span text_left">Your Course</span>
                { tutorCourseData && this.renderTop() }
                <Card>
                    <div className = { connected ? "video_lec_main_control_connected": "video_lec_main_control"}>
                        <VideoLecture 
                            joinId = {joinId} 
                            handleInputOnChange = {this.handleInputOnChange}
                            handleStart = {this.handleStart}
                            connectedTo = {connected}
                            handleDisconnect = {this.handleDisconnect}
                            startLoading = {startLoading}
                            startError = {startError}
                        />
                    </div>
                </Card>
            </div>
        )
    }

    renderMainContainer = () => {
        switch(this.state.tabValue) {
            case 0 : return this.renderVideoLecture()
            case 1 : return this.renderResources()
            default : return this.renderVideoLecture()
        }
    }

    render() {
        const {childNav, tabValue, loading, snackBarOn, snackBarMessage, severity} = this.state
        return (
            <div className = "lecture_root_div">
                <HeaderTopper screen = "Lecture" rootNav = "Pages" childNav = {childNav}/>
                <div className = "lecture_root_head">
                    <HeaderCard
                        tabs = {this.TAB_LINKS}
                        src = {headerImg}
                        icons = {this.ICONS}
                        tabValue = {tabValue}
                        handleTabChange = {this.handleTabChange}
                    />
                </div>
                <div className = "lecture_root_main">
                    { 
                       loading ? <Loading open = {loading}/> :  this.renderMainContainer() 
                    }
                </div>
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


export default connect(mapStateToProps)(Lecture)
