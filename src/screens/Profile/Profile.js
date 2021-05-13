import React, { Component } from 'react'
import {connect} from 'react-redux'

import CustomButton from '../../components/Button/CustomButton'
import EditInfo from './EditInfo'
import ChangePassword from './ChangePassword'
import Feedback from './Feedback'
import Loading from '../../components/Loading/Loading'
import Interest from "./MyInterestCard/InterestCard"
import HeaderTopper from '../../components/Header/HeaderTopper'
import SnackBar from '../../components/SnackBar/SnackBar'
import ProfilePicUploader from './ProfilePicUploader'
import { getProfileDetails, updateStudentProfile, updateStudentProfilePic } from '../../api/student'
import { addSystemFeedback } from '../../api/feedback'
import { setNotification, getNotificationSetting } from '../../api/notification'
import { changePasswordApi } from '../../api/user'

//Boostarp
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form";

//Material-UI
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';

import PersonPinIcon from '@material-ui/icons/PersonPin';
import Edit from '@material-ui/icons/Edit';
import FeedbackImg from '@material-ui/icons/Feedback';
import LocationOn from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import Cake from '@material-ui/icons/Cake';
import Grade from '@material-ui/icons/Grade';
import Settings from '@material-ui/icons/Settings';
import PermIdentity from '@material-ui/icons/Face';

import ProfileImage from '../../assets/images/shared/avatar.png'
import sharedJson from '../../json/shared.json'
import './Profile.css'

class Profile extends Component {
    state = {
        id: null,
        loading:false,
        updateValidated: false,
        passwordValidated: false,
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        city: "",
        district: "",
        bio: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        genderOptions: ["Male", "Female"],
        levelOptions: ["Higher Studies", "Advanced Level", "Ordinary Level", "Other"],
        updateLoading: false,
        changePasswordLoading: false,
        tabValue: 0,
        feedbackFormValidated: false,
        feedbackSubmitLoading: false,
        feedbackEmail: "",
        feedbackMessage: "",
        feedbackRate: 0,
        feedbackRadio: "yes",
        one_step_notify: false,
        blog_notify: false,
        course_notify: false,
        tutor_notify: false,
        childNav: ["Profile","General"],
        fetchError: null,
        profileDetails: null,
        gender: "Male",
        level: "Intemediate",
        imageUrl: null,
        updateSuccess: false,
        severity: "success",
        snackBarOn: false,
        snackBarMessage: "",
        notificatonLoading: false,
        confirmPasswordError: null,
        passwordScore: 0,
        passwordError: null,
        profilePic: null,
        role: "ROLE_STUDENT"
    }

    tab_links = ["General", "Edit", "Feedback", "Settings"]

    notifications = [
        {
            caption: "Activity",
            items: [
                {id : "one_step_notify", message: "Email me when someone comment on my one-step"},
                {id : "blog_notify", message: "Email me when someone comment on my blog"},
            ],
        },
        {
            caption: "Application",
            items: [
                {id : "course_notify", message: "Weekly Course Update"},
                {id : "tutor_notify", message: "Weekly Tutor update"},
            ]
        }
    ]

    icons = {
        General: <PersonPinIcon/>,
        Edit: <Edit/>,
        Feedback: <FeedbackImg/>,
        Location: <LocationOn/>,
        Email: <MailIcon/>,
        DOB: <Cake/>,
        Level: <Grade/>,
        Settings: <Settings/>,
        Gender: <PermIdentity/>
    }

    componentDidMount() {
        this.getStudentProfileDetails()
        this.getNotificationSettings()
    }

    getProfilePicture = (url) => {
        if(url) {
            fetch(url, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${this.props.auth.accessToken}`
                }
            }).then(res => res.blob())
            .then(blob => {
                const reader = new FileReader()
                reader.readAsDataURL(blob)
                return new Promise(resolve => {
                    reader.onloadend = () => {
                        resolve(reader.result)
                    }
                })
            })
            .then(finalResult => { 
                this.setState({profilePic: finalResult})
            })
        }
    }

    getStudentProfileDetails = () => {
        const auth = this.props.auth
        if (auth) {
            this.setState({ loading: true })
            getProfileDetails(auth.accessToken, auth.profileId).then(response => {
                this.setProfileData(response)
                this.getProfilePicture(response.imageUrl)
                if (!response.bio || !response.city) {
                    this.setState({
                        severity: "info",
                        snackBarOn: true,
                        snackBarMessage: "You need to update your profile soon!....",
                    })
                }
            }).catch(err => {
                this.setState({ 
                    loading: false,
                    profileDetails: null,
                    fetchError: `${err.message}, please try again`
                })
            })
        }
    }

    getNotificationSettings = () => {
        const auth = this.props.auth
        if(auth) {
            getNotificationSetting(auth.accessToken, auth.userId).then(response => {
                this.setNotificationData(response)
            }).catch(err => {
                this.setState({ loading: false })
            })
        }
    }

    handleUpdate = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            updateValidated: !form.checkValidity(),
            updateLoading:true
        });

        const auth = this.props.auth
        const { firstName, lastName, email, gender, dob, imageUrl, city, district, level, bio } = this.state

        const userDetails = { firstName, lastName, email, gender, dob, imageUrl, city, district, level, bio }
        updateStudentProfile(auth.accessToken, auth.profileId, userDetails).then(response => {
            this.setProfileData(response)
            this.setState({
                updateLoading: false,
                updateSuccess: true,
            })
            this.setSnackBarSuccess("Profile updated successfully")
        }).catch(err => {
            this.setState({ 
                updateLoading: false,
                updateSuccess: false,
            })
            this.setSnackBarError(`Failed to update, please try again`)
        })
    }

    submitFeedback = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            feedbackFormValidated: !form.checkValidity(),
        });

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
            this.setState({ feedbackSubmitLoading:true })
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
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            passwordValidated: !form.checkValidity()
        });

        const { oldPassword, newPassword, confirmPassword, passwordScore } = this.state
        if (newPassword && passwordScore < 2) {
            this.setState({
                passwordError: "Password not strong enough!"
            })
        } else if (newPassword !== confirmPassword) {
            this.setState({
                confirmPasswordError: "Passwords not matched"
            })
        }
        else {
            if (oldPassword && newPassword && confirmPassword) {
                const auth = this.props.auth
                const request = { oldPassword, newPassword }
                this.setState({ changePasswordLoading:true })
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
                    this.setSnackBarError(`${err.message}, please try again`)
                })
            }
        }
    }

    handleNotificationSettings = () => {
        this.setState({ notificatonLoading: true })
        const auth = this.props.auth
        const {one_step_notify, blog_notify, course_notify, tutor_notify} = this.state
        const request = {
            commentOneStep: one_step_notify,
            commentBlog: blog_notify,
            courseUpdate: course_notify,
            tutorUpdate: tutor_notify
        }
        setNotification(auth.accessToken, request, auth.userId).then(response => {
            this.setState({ notificatonLoading: false })
            this.setSnackBarSuccess("Notification setings added successfully")
            this.setNotificationData(response)
        }).catch(err => {
            this.setState({ notificatonLoading: false })
            this.setSnackBarError(`Failed to set notification settings, please try again`)
        })
    }

    handleProfilePicUpload = async(file) => {
        let reader = new FileReader()
        reader.onloadend = () => {
            this.setState({ profilePic: reader.result });
        }
        reader.readAsDataURL(file)

        const formData = new FormData()
        formData.append("file", file);
        const auth = this.props.auth
        updateStudentProfilePic(auth.accessToken, auth.userId, formData).then(response => {
            this.setSnackBarSuccess("Profile Picture updated successfully")
        }).catch(err => {
            this.setSnackBarError("Unable update, please try again")
        })
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

    handlePasswordScoreOnChange = (score) => {
        this.setState({
            passwordScore: score
        })
    }

    setNotificationData = (response) => {
        this.setState({
            one_step_notify: response.commentOneStep,
            blog_notify: response.commentBlog,
            course_notify: response.courseUpdate,
            tutor_notify: response.tutorUpdate,
            loading: false,
        })
    }

    setProfileData = (response) => {
        this.setState({
            profileDetails: response,
            loading: false,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            dob: response.dob,
            city: response.city,
            district: response.district,
            bio: response.bio,
            gender: response.gender,
            level: response.level,
            fetchError: null,
        })
    }

    handleSnackBarClose = () => {
        this.setState({
            snackBarOn: false,
            snackBarMessage: ""
        })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            passwordError: null,
            confirmPasswordError: null
        })
    }

    handleRatingOnChange = (value) => {
        this.setState({
            feedbackRate: value
        })
    }

    handleTabChange = (newValue) => {
        const childNav = ["Profile"]
        if (newValue === 0) {
            childNav.push("General")
        } 
        else if (newValue === 1) {
            childNav.push("Edit")
        }
        else if (newValue === 2) {
            childNav.push("Feedback")
        }
        else {
            childNav.push("Settings")
        }
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

    handleSwitchOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        })
    }

    renderEditTab = () => {
        return (
            <Card.Body className = "edit_card_body">
                <ListItemText secondary="EDIT BASIC INFORMATION"/>
                <Form
                    onSubmit={this.handleUpdate}
                    noValidate
                    validated={this.state.updateValidated}
                    className = "edit_card_body_form"
                >
                    <EditInfo values = {this.state} handleOnChange={this.handleInputChange}/>
                    <div className = "save__changes">
                        {
                            this.state.updateLoading ? 
                            <div className = "loading_div">
                                <CircularProgress/>
                            </div>
                            :
                            <CustomButton label = "Save Changes" type="submit"/>
                        }
                    </div>
                </Form>
            </Card.Body>
        )
    }

    renderPasswordTab = () => {
        const {passwordValidated, changePasswordLoading} = this.state
        return (
            <Card.Body className = "edit_card_body">
                <p>Change Password</p>
                <Form
                    onSubmit={this.changePassword}
                    noValidate
                    validated={passwordValidated}
                    className = "edit_card_body_form"
                >
                <ChangePassword 
                    values = {this.state} 
                    handleOnChange = {this.handleInputChange}
                    handlePasswordScoreOnChange = {this.handlePasswordScoreOnChange}
                />
                <div className = "save__changes">
                    {
                        changePasswordLoading ? <CircularProgress/> :
                        <CustomButton label = "Update Password" type="submit"/>
                    }
                </div>
                </Form>
            </Card.Body>
        )
    }

    renderSwitchControl = (id, message) => {
        return (
            <FormControlLabel
                control={
                    <Switch 
                        checked={this.state[id]} 
                        onChange={this.handleSwitchOnChange} 
                        name = {id} 
                        color = "primary"
                    />
                }
                label = {message}
            />
        )
    }

    renderSettings = () => {
        return (
            <div>
                { this.renderPasswordTab() }
                <div className = "notifications_Container">
                    <p>Notification settings</p>
                    {
                        this.notifications.map(item => {
                            const {caption, items} = item
                            return (
                                <>
                                <p>{caption}</p>
                                {
                                    items.map(item => {
                                        return this.renderSwitchControl(item.id, item.message)
                                    })
                                }
                                </>
                            )
                        })
                    }
                    <div className = "save__changes">
                        <CustomButton label = "Save changes" onClick = {this.handleNotificationSettings}/>
                    </div>
                </div>
            </div>
        )
    }

    renderFeedbackTab = () => {
        return (
            <Form
                onSubmit={this.submitFeedback}
                noValidate
                validated={this.state.feedbackFormValidated}
                className = "feedback_form"
            >
            <Feedback
                values = {this.state}
                handleOnChange = {this.handleInputChange}
                handleRateOnChange = {this.handleRatingOnChange}
            />
            <div className = "save__changes">
            {
                this.state.feedbackSubmitLoading ? 
                <div className = "loading_div">
                    <CircularProgress/>
                </div>
                :
                <CustomButton label = "Submit" type = "submit"/>
            } 
            </div>
            </Form>
        )
    }

    handleRenderTabs = () => {
        switch(this.state.tabValue) {
            case 0: return <Interest/>
            case 1: return this.renderEditTab()
            case 2: return this.renderFeedbackTab()
            case 3: return this.renderSettings()
            default: return <Interest/>
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
        const profileDetails = this.state.profileDetails
        return (
            <div className = "main_info_container">
                <div className = "info_statistics">
                    <div className = "info_statistics_block">
                        <div className = "css-1lomthf">
                            <div className = "profile_stat">
                                <h4>{profileDetails && profileDetails.courseCount}</h4>
                                <p>Enrolled Courses</p>
                            </div>
                            <hr/>
                            <div className = "profile_stat">
                                <h4>{profileDetails && profileDetails.tutorCount}</h4>
                                <p>Following Tutors</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "profile_about">
                    <div className = "profile_about_head">
                        <span>About</span>
                    </div>
                    <div className = "profile_about_info">
                        <p>{profileDetails && profileDetails.bio ? profileDetails.bio : sharedJson["alt_bio"]}</p>
                        <div className = "about_general_info">
                            {this.icons["Location"]}
                            {
                                profileDetails && profileDetails.city && profileDetails.district ?
                                <span>at  {profileDetails.city}, {profileDetails.district}</span>
                                :
                                <span> location : N/A</span> 
                            }
                        </div>
                        <div className = "about_general_info">
                            {this.icons["Email"]}
                            <span>{profileDetails && profileDetails.email ? profileDetails.email : "Email : N/A"}</span>
                        </div>
                        <div className = "about_general_info">
                            {this.icons["DOB"]}
                            <span>{profileDetails && profileDetails.dob ? profileDetails.dob : "DOB : N/A"}</span>
                        </div>
                        <div className = "about_general_info">
                            {this.icons["Level"]}
                            <span>{profileDetails && profileDetails.level ? profileDetails.level : "Level : N/A"}</span>
                        </div>
                        <div className = "about_general_info">
                            {this.icons["Gender"]}
                            <span>{profileDetails && profileDetails.gender ? profileDetails.gender : "Gender : N/A"}</span>
                        </div>
                    </div>
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
                onClick = {() => {this.handleTabChange(index)}}
                key = {index}
            >
                {this.icons[item]}
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
        const {profileDetails, profilePic} = this.state
        return (
            <div className = "profile_header_container">
                <div className = "container_top">
                    <div className = "profile_avatar_alt">
                        <img src = {profilePic ? profilePic : ProfileImage} alt = "avatar" className = "profile_avatar_img"/>
                        <ProfilePicUploader handleProfilePicUpload = {this.handleProfilePicUpload}/>
                    </div>
                    <div className = "profile_section_info">
                        <h4>
                        {
                            profileDetails && profileDetails.firstName && profileDetails.lastName
                             ? `${profileDetails.firstName} ${profileDetails.lastName}`
                             : "N/A"
                        }
                        </h4>
                    </div>
                </div>
                <div className = "container_bottom">
                    <div className = "multitab_root">
                        {
                            this.tab_links.map((item, index) => {
                                return this.renderTab(index, item)
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    renderProfileRoot = () => {
        return (
            <div className = "profile_root_alt">
                <div style = {{marginBottom: "2%"}}>
                    <HeaderTopper
                        screen = "Profile"
                        rootNav = "Management"
                        childNav = {this.state.childNav}
                    />
                </div>
                { this.renderTopContainer() }
                { this.renderMainContainer() }
            </div>
        )
    }

    renderApiError = (error) => {
        return (
            <span className = "api_error">{error}</span>
        )
    }

    render() {
        const {loading, fetchError, snackBarOn, snackBarMessage, severity} = this.state
        return (
            <div className = "profile_root">
                { 
                    loading ? <Loading open = {loading}/>
                    :
                    fetchError ? this.renderApiError(fetchError)
                    :
                    this.renderProfileRoot() 
                }
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
export default connect(mapStateToProps)(Profile)