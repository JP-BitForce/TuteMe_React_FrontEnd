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

//React-Boostarp
import Card from 'react-bootstrap/Card'

import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import DialogContentText from '@material-ui/core/DialogContentText'

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

    handleStart = () => {
        this.setState({ connected: true })
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
        this.setState({ [name]: value })
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

    renderVideoLecture = () => {
        const {joinId, connected, tutorCourseData} = this.state
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
