import React, { Component } from 'react'
import {connect} from 'react-redux'

import HeaderTopper from '../../components/Header/HeaderTopper'
import Loading from '../../components/Loading/Loading'
import ProfilePicUploader from './ProfilePicUploader'
import CustomButton from '../../components/Button/CustomButton'
import EditInfo from './EditInfo'
import ChangePassword from './ChangePassword'
import Feedback from './Feedback'
import SnackBar from '../../components/SnackBar/SnackBar'

import {getTutorProfile, updateProfilePic, updateProfile} from '../../api/tutor'
import { changePasswordApi } from '../../api/user'
import { addSystemFeedback } from '../../api/feedback'

//Boostarp
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

//Material-UI
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

import Edit from '@material-ui/icons/Edit'
import FeedbackImg from '@material-ui/icons/Feedback'
import LocationOn from '@material-ui/icons/LocationOn'
import MailIcon from '@material-ui/icons/Mail'
import Cake from '@material-ui/icons/Cake'
import Grade from '@material-ui/icons/Grade'
import Settings from '@material-ui/icons/Settings'
import PermIdentity from '@material-ui/icons/Face'

import ProfileImage from '../../assets/images/shared/avatar.png'
import sharedJson from '../../json/shared.json'
import './Profile.css'

class TutorProfile extends Component {
    state = {
        childNav: ["Profile", "General"],
        tabValue: 0,
        loading: false,
        profileDetails: null,
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        district: "",
        bio: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        gender: "Male",
        genderOptions: ["Male", "Female"],
        levelOptions: ["Higher Studies", "Advanced Level", "Ordinary Level", "Other"],
        updateLoading: false,
        changePasswordLoading: false,
        feedbackFormValidated: false,
        feedbackSubmitLoading: false,
        feedbackEmail: "",
        feedbackMessage: "",
        feedbackRate: 0,
        fetchError: null,
        imageUrl: null,
        updateSuccess: false,
        severity: "success",
        snackBarOn: false,
        snackBarMessage: "",
        confirmPasswordError: null,
        passwordScore: 0,
        passwordError: null,
        profilePic: null,
        role: "ROLE_TUTOR",
        updateValidated: false,
        facebook: "",
        twitter: "",
        instagram: "",
        linkedIn: "",
        feedbackRadio: "yes",
    }
    TAB_LINKS = ["Edit", "Feedback", "Password"]
    ICONS = {
        Edit: <Edit/>,
        Feedback: <FeedbackImg/>,
        Location: <LocationOn/>,
        Email: <MailIcon/>,
        DOB: <Cake/>,
        Level: <Grade/>,
        Password: <Settings/>,
        Gender: <PermIdentity/>
    }
    SOCIAL = ["facebook", "twitter", "instagram", "linkedIn"]

    componentDidMount() {
        this.getTutorProfileDetails()
        this.setState({ profilePic: `data:image/jpeg;base64,${this.props.auth.imageSrc}`})
    }

    getTutorProfileDetails = () => {
        const auth = this.props.auth
        if (auth) {
            this.setState({ loading: true })
            getTutorProfile(auth.accessToken, auth.profileId).then(response => {
                this.setProfileData(response)
                this.setState({ profileDetails: response, fetchError: null })
            }).catch(err => {
                this.setState({ 
                    loading: false,
                    profileDetails: null,
                    fetchError: `server error, please try again`
                })
            })
        }
    }

    handleUpdate = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        this.setState({ updateValidated: !form.checkValidity(), updateLoading:true })

        const auth = this.props.auth
        const { firstName, lastName, email, gender, city, district, bio, facebook, twitter, instagram, linkedIn } = this.state
        const userDetails = { firstName, lastName, email, gender, city, district, 
            bio, userId: auth.userId, facebook, twitter, instagram, linkedIn 
        }
        updateProfile(auth.accessToken, userDetails).then(response => {
            this.setProfileData(response)
            this.setState({ updateLoading: false, updateSuccess: true })
            this.setSnackBarSuccess("Profile updated successfully")
        }).catch(err => {
            this.setState({ updateLoading: false, updateSuccess: false })
            this.setSnackBarError(`Failed to update, please try again`)
        })
    }

    submitFeedback = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        this.setState({ feedbackFormValidated: !form.checkValidity() })

        const auth = this.props.auth
        const { feedbackEmail, feedbackMessage, feedbackRate, feedbackRadio} = this.state
        if (feedbackEmail && feedbackMessage && feedbackRate && feedbackRadio) {
            const request = {
                userId: auth.userId,
                profileId: auth.profileId,
                email: feedbackEmail,
                feedback: feedbackMessage,
                rating: feedbackRate,
                isServiceFind: feedbackRadio === "yes" 
            }
            this.setState({ feedbackSubmitLoading : true })
            addSystemFeedback(auth.accessToken, request).then(response => {
                this.setState({
                    feedbackSubmitLoading: false,
                    feedbackEmail: "",
                    feedbackMessage: "",
                    feedbackRate: 0,
                    feedbackRadio: "yes",
                })
                this.setSnackBarSuccess("Feedback adding successfull")
            }).catch(err => {
                this.setState({ feedbackSubmitLoading: false })
                this.setSnackBarError(`Failed to add feedback, please try again`)
            })
        }
    }

    changePassword = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        this.setState({ passwordValidated: !form.checkValidity() })

        const { oldPassword, newPassword, confirmPassword, passwordScore } = this.state
        if (newPassword && passwordScore < 2) {
            this.setState({ passwordError: "Password not strong enough!" })
        } else if (newPassword !== confirmPassword) {
            this.setState({ confirmPasswordError: "Passwords not matched" })
        } else {
            if (oldPassword && newPassword && confirmPassword) {
                const auth = this.props.auth
                const request = { oldPassword, newPassword }
                this.setState({ changePasswordLoading : true })
                changePasswordApi(auth.accessToken, request, auth.userId).then(response => {
                    if (response.success) {
                        this.setState({
                            oldPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                            passwordError: null,
                            confirmPasswordError: null,
                            changePasswordLoading: false
                        })
                        this.setSnackBarSuccess("New password changed successfully")
                    }
                }).catch(err => {
                    this.setState({ changePasswordLoading: false })
                    this.setSnackBarError(`server error, please try again`)
                })
            }
        }
    }

    handleProfilePicUpload = async(file) => {
        let reader = new FileReader()
        reader.onloadend = () => {
            this.setState({ profilePic: reader.result })
        }
        reader.readAsDataURL(file)

        const formData = new FormData()
        formData.append("file", file)
        const auth = this.props.auth
        updateProfilePic(auth.accessToken, auth.userId, formData).then(response => {
            this.setSnackBarSuccess("Profile Picture updated successfully")
        }).catch(err => {
            this.setSnackBarError("Unable update, please try again")
        })
    }

    handlePasswordScoreOnChange = (score) => {
        this.setState({ passwordScore: score })
    }

    handleSnackBarClose = () => {
        this.setState({ snackBarOn: false, snackBarMessage: "" })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            passwordError: null,
            confirmPasswordError: null
        })
    }

    handleRatingOnChange = (value) => {
        this.setState({ feedbackRate: value })
    }

    handleTabChange = (newValue) => {
        const childNav = ["Profile"]
        childNav.push(this.TAB_LINKS[newValue])
        this.setState({
            tabValue: newValue,
            childNav,
            passwordValidated: false,
            updateValidated: false,
            feedbackFormValidated: false,
            passwordError: null,
            confirmPasswordError: null
        })
    }

    handleCancelOnClick = (label) => {
        if (label === "Save Changes") {
            this.setProfileData(this.state.profileDetails)
            this.setState({ updateValidated: false })
        } else if (label === "Submit") {
            this.setState({
                feedbackEmail: "",
                feedbackMessage: "",
                feedbackRate: 0,
                feedbackRadio: "yes",
                feedbackFormValidated: false
            })
        } else if (label === "Update Password") {
            this.setState({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
                passwordError: null,
                confirmPasswordError: null,
                changePasswordLoading: false
            })
        }
    }

    setSnackBarSuccess = (msg) => {
        this.setState({
            severity: "success",
            snackBarOn: true,
            snackBarMessage: msg,
        })
    }

    setSnackBarError = (msg) => {
        this.setState({
            severity: "error",
            snackBarOn: true,
            snackBarMessage: msg,
        })
    }

    setProfileData = (response) => {
        this.setState({
            loading: false,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            city: response.city,
            district: response.district,
            bio: response.description,
            gender: response.gender ? response.gender: "Male",
            fetchError: null,
            facebook: response.facebook,
            twitter: response.twitter,
            instagram: response.instagram,
            linkedIn: response.linkedIn,
        })
    }

    getFullName = () => {
        const {profileDetails} = this.state
        if (profileDetails && profileDetails.firstName && profileDetails.lastName) {
            return `${profileDetails.firstName} ${profileDetails.lastName}`
        } else {
            return "N/A"
        }
    }

    getLocation = () => {
        const {profileDetails} = this.state
        if (profileDetails && profileDetails.city && profileDetails.district) {
            return <span>at {profileDetails.city}, {profileDetails.district}</span>
        } else {
            return  <span> location : N/A</span> 
        }
    }

    renderLoading = () => {
        return (
            <div className = "loading_div">
                <CircularProgress/>
            </div>
        )
    }

    renderSubmitBtn = (label) => {
        return (
            <Row className = "submit_btn">
                <Col sm> <CustomButton type="submit" fullWidth label = {label}/> </Col>
            </Row>
        )
    }

    renderCanceltBtn = (label) => {
        return (
            <Row className = "submit_btn">
                <Col sm> 
                    <Button variant="outlined" fullWidth onClick = {() => this.handleCancelOnClick(label)}> Cancel </Button>                    
                </Col>
            </Row>
        )
    }

    renderButtonFooter = (label) => {
        return (
            <Row>
                <Col sm> {this.renderCanceltBtn(label)} </Col>
                <Col sm> {this.renderSubmitBtn(label)} </Col>
            </Row>
        )
    }

    renderPasswordTab = () => {
        const {passwordValidated, changePasswordLoading} = this.state
        return (
            <Card.Body className = "edit_card_body">
                <p>Change Password</p>
                <Form
                    onSubmit = {this.changePassword}
                    noValidate
                    validated = {passwordValidated}
                    className = "edit_card_body_form"
                >
                <ChangePassword 
                    values = {this.state} 
                    handleOnChange = {this.handleInputChange}
                    handlePasswordScoreOnChange = {this.handlePasswordScoreOnChange}
                />
                <div>
                    { changePasswordLoading ? <CircularProgress/> : this.renderButtonFooter("Update Password") }
                </div>
                </Form>
            </Card.Body>
        )
    }

    renderFeedbackTab = () => {
        const {feedbackFormValidated, feedbackSubmitLoading} = this.state
        return (
            <Form
                onSubmit = {this.submitFeedback}
                noValidate
                validated = {feedbackFormValidated}
                className = "feedback_form"
            >
            <Feedback values = {this.state} handleOnChange = {this.handleInputChange} handleRateOnChange = {this.handleRatingOnChange}/>
            <div>
                { !feedbackSubmitLoading ? this.renderButtonFooter("Submit") : this.renderLoading() } 
            </div>
            </Form>
        )
    }

    renderEditTab = () => {
        const {updateValidated, updateLoading} = this.state
        return (
            <Card.Body className = "edit_card_body">
                <ListItemText secondary="EDIT BASIC INFORMATION"/>
                <Form
                    onSubmit = {this.handleUpdate}
                    noValidate
                    validated = {updateValidated}
                    className = "edit_card_body_form"
                >
                    <EditInfo values = {this.state} handleOnChange = {this.handleInputChange}/>
                    <div>
                        { updateLoading ? this.renderLoading() : this.renderButtonFooter("Save Changes") }
                    </div>
                </Form>
            </Card.Body>
        )
    }

    handleRenderTabs = () => {
        switch(this.state.tabValue) {
            case 0: return this.renderEditTab()
            case 1: return this.renderFeedbackTab()
            case 2: return this.renderPasswordTab() 
            default: return this.renderEditTab()
        }
    }

    renderTabContent = () => {
        return (
            <div className = "tab_content_container">
                { this.handleRenderTabs() }
            </div>
        )
    }

    renderInfoContent = () => {
        const {profileDetails} = this.state
        return (
            <div className = "main_info_container">
                <div className = "profile_about">
                    <div className = "profile_about_head">
                        <span>About</span>
                    </div>
                    <div className = "profile_about_info">
                        <p>{profileDetails && profileDetails.bio ? profileDetails.bio : sharedJson["alt_bio"]}</p>
                        <div className = "about_general_info">
                            {this.ICONS["Location"]} { this.getLocation() }
                        </div>
                        <div className = "about_general_info">
                            {this.ICONS["Email"]}
                            <span>{profileDetails && profileDetails.email ? profileDetails.email : "Email : N/A"}</span>
                        </div>
                        <div className = "about_general_info">
                            {this.ICONS["Gender"]}
                            <span>{profileDetails && profileDetails.gender ? profileDetails.gender : "Gender : N/A"}</span>
                        </div>
                    </div>
                </div>
                <div className = "profile_about social_links">
                {
                    this.SOCIAL.map(item => {
                        return (
                            <div className = "about_general_info">
                                <span className = "social_links_title">{item} : </span>
                                <span className = "social_links_value">{this.state[item] ? this.state[item] : "N/A"}</span>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }

    renderMainContainer = () => {
        return (
            <div className = "profile_main_container">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={3}>
                        { this.renderInfoContent() }
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        { this.renderTabContent() }
                    </Grid>
                </Grid>
            </div>
        )
    }

    renderTab = (index, item) => {
        return (
            <div 
                className = {[
                    "multi_btn_base",
                    this.state.tabValue === index && "multi_btn_base_active"
                    ].join(" ")
                } 
                onClick = {() => { this.handleTabChange(index) }}
                key = {index}
            >
                { this.ICONS[item] }
                <span 
                    className = {[
                        "multitab_wrapper", 
                        this.state.tabValue === index && "multitab_active"
                        ].join(" ")
                    }
                >{item}</span>
            </div>
        )
    }

    renderTopContainer = () => {
        const {profilePic} = this.state
        return (
            <div className = "profile_header_container">
                <div className = "container_top">
                    <div className = "profile_avatar_alt">
                        <img src = {profilePic ? profilePic : ProfileImage} alt = "avatar" className = "profile_avatar_img"/>
                        <ProfilePicUploader handleProfilePicUpload = {this.handleProfilePicUpload}/>
                    </div>
                    <div className = "profile_section_info">
                        <h4>
                        { this.getFullName() }
                        </h4>
                    </div>
                </div>
                <div className = "container_bottom">
                    <div className = "multitab_root">
                        { this.TAB_LINKS.map((item, index) => this.renderTab(index, item)) }
                    </div>
                </div>
            </div>
        )
    }

    renderProfileRoot = () => {
        const {childNav} = this.state
        return (
            <>
            <HeaderTopper screen = "Profile" rootNav = "Management" childNav = {childNav} />
            <div className = "create_course_root_head">
                { this.renderTopContainer() }
            </div>
            { this.renderMainContainer() }
            </>
        )
    }

    render() {
        const {loading, snackBarOn, snackBarMessage, severity} = this.state
        return (
            <div className = "tutor_profile_root">
                { loading ? <Loading open = {loading}/> : this.renderProfileRoot() }
                <SnackBar
                    open = {snackBarOn}
                    autoHideDuration = {5000}
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

export default connect(mapStateToProps)(TutorProfile)