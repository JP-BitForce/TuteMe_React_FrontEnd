import React, { Component } from 'react'

import CustomButton from '../../components/Button/CustomButton'
import EditInfo from './EditInfo'
import ChangePassword from './ChangePassword'
import Loading from '../../components/Loading/Loading'

//Boostarp
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form";

//Material-UI
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Edit from '@material-ui/icons/Edit';
import FolderShared from '@material-ui/icons/FolderShared';
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
        tabValue: 0
    }

    tab_links = ["General", "Edit", "Following", "Settings"]

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
        Following: <FolderShared/>,
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

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTabChange = (newValue) => {
        this.setState({
            tabValue: newValue
        })
    };

    handleSwitchOnChange = (event) => {

    }

    renderRowItems = (child1, child2) => {
        return (
            <Row>
                <Col xs={6} sm={6} md={6}> {child1} </Col>
                <Col xs={6} sm={6} md={6}> {child2} </Col>
            </Row>
        )
    }

    renderInfo = (label, value) => {
        return (
            <div className = "info_container">
                <ListItem>
                    <ListItemText secondary={value}>{label}</ListItemText>
                </ListItem>
            </div>
        )
    }

    renderBio = (bio) => {
        return (
            <List style = {{display:"flex",flexDirection:"column", padding:"2%"}}>
                <span className = "bio_header">BIO</span>
                <span className = "bio_content">{bio}</span>
            </List>
        )
    }

    renderBasicInformation = () => {
        return (
            <List>
                { 
                    this.renderRowItems(
                        this.renderInfo("First Name", "Rogers"),
                        this.renderInfo("Last Name", "Steve")
                    )
                }
                {this.renderInfo("Email", "steverogers@gmail.com")}
                {
                    this.renderRowItems(
                        this.renderInfo("DOB", "01/01/1940"),
                        this.renderInfo("Level", "Unknown")
                    )
                }
                {
                    this.renderRowItems(
                        this.renderInfo("City", "Brooklyn"),
                        this.renderInfo("District", "Gampaha")
                    )
                }
            </List>
        )
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
                    <CustomButton label = "Save Changes" type="submit"/>
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
                        checked={true} 
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

    handleRenderTabs = () => {
        switch(this.state.tabValue) {
            case 0: return this.renderSettings();
            case 1: return this.renderEditTab();
            case 2: return null;
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