import React, { Component } from 'react'

import CustomButton from '../../components/Button/CustomButton'
import EditInfo from './EditInfo'
import ChangePassword from './ChangePassword'
import Feedback from './Feedback'
import Loading from '../../components/Loading/Loading'

//Boostarp
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form";

//Material-UI
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Edit from '@material-ui/icons/Edit';
import FeedbackImg from '@material-ui/icons/Feedback';
import LocationOn from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import Cake from '@material-ui/icons/Cake';
import Grade from '@material-ui/icons/Grade';
import Settings from '@material-ui/icons/Settings';

import ProfileImage from '../../assets/images/shared/minimal_avatar.jpg'
import './Profile.css'

class Profile extends Component {
    state = {
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
        feedbackName: "",
        feedbackEmail: "",
        feedbackMessage: "",
        feedbackRate: 0,
        feedbackRadio: "yes",
        one_step_notify: false,
        blog_notify: false,
        course_notify: false,
        tutor_notify: false,
    }

    tab_links = ["General", "Edit", "Feedback", "Settings"]

    notifications = [
        {
            caption: "Activity",
            items: [
                {id : "one_step_notify", message: "Email me when someone comments on my one-step"},
                {id : "blog_notify", message: "Email me when someone comments on my blog"},
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

    dummyAbout = [
        {name: "Location", content: "Live at  Algeria"},
        {name: "Email", content: "Dena75@yahoo.com"},
        {name: "DOB", content: "01/01/1940"},
        {name: "Level", content: "Ordinary"}
    ]

    icons = {
        General: <PersonPinIcon/>,
        Edit: <Edit/>,
        Feedback: <FeedbackImg/>,
        Location: <LocationOn/>,
        Email: <MailIcon/>,
        DOB: <Cake/>,
        Level: <Grade/>,
        Settings: <Settings/>
    }

    handleUpdate = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            updateValidated: !form.checkValidity(),
            updateLoading:true
        });
    }

    changePassword = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            passwordValidated: !form.checkValidity(),
            changePasswordLoading:true
        });
    }

    submitFeedback = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            feedbackFormValidated: !form.checkValidity(),
            feedbackSubmitLoading:true
        });
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTabChange = (newValue) => {
        this.setState({
            tabValue: newValue,
            feedbackFormValidated: false,
            passwordValidated: false,
            updateValidated: false
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
                        <CustomButton label = "Save Changes" type="submit"/>
                    </div>
                </Form>
            </Card.Body>
        )
    }

    renderPasswordTab = () => {
        return (
            <Card.Body className = "edit_card_body">
                <p>Change Password</p>
                <Form
                    onSubmit={this.changePassword}
                    noValidate
                    validated={this.state.passwordValidated}
                    className = "edit_card_body_form"
                >
                <ChangePassword values = {this.state} handleOnChange={this.handleInputChange}/>
                <div className = "save__changes">
                    <CustomButton label = "Update Password" type="submit"/>
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
                        <CustomButton label = "Save changes"/>
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
            />
            <div className = "save__changes">
                <CustomButton label = "Submit" type = "submit"/>
            </div>
            </Form>
        )
    }

    handleRenderTabs = () => {
        switch(this.state.tabValue) {
            case 0: return null;
            case 1: return this.renderEditTab();
            case 2: return this.renderFeedbackTab();;
            case 3: return this.renderSettings();
            default: return null
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
        return (
            <div className = "main_info_container">
                <div className = "info_statistics">
                    <div className = "info_statistics_block">
                        <div className = "css-1lomthf">
                            <div className = "profile_stat">
                                <h4>151</h4>
                                <p>Enrolled Courses</p>
                            </div>
                            <hr/>
                            <div className = "profile_stat">
                                <h4>235</h4>
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
                        <p>Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..</p>
                        {
                            this.dummyAbout.map(item => {
                                return (
                                    <div className = "about_general_info">
                                        {this.icons[item.name]}
                                        <span>{item.content}</span>
                                    </div>
                                )
                            })
                        }
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
        return (
            <div className = "profile_header_container">
                <div className = "container_top">
                    <div className = "profile_avatar_alt">
                        <img src = {ProfileImage} alt = "avatar" className = "profile_avatar_img"/>
                        <div className="overlay">
                            <CameraIcon/>
                        </div>
                    </div>
                    <div className = "profile_section_info">
                        <h4>Steve Austin</h4>
                        <p>UI Designer</p>
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
                { this.renderTopContainer() }
                { this.renderMainContainer() }
            </div>
        )
    }

    render() {
        return (
            <div className = "profile_root">
                { 
                    this.state.loading ?
                    <Loading/>
                    :
                    this.renderProfileRoot() 
                }
            </div>
        )
    }
}

export default Profile