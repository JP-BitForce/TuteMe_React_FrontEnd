import React, { Component } from 'react'

import ChipButton from '../../components/Button/ChipButton'
import CustomButton from '../../components/Button/CustomButton'

import EditInfo from './EditInfo'
import ChangePassword from './ChangePassword'

//Boostarp
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form";

//Material-UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CameraIcon from '@material-ui/icons/PhotoCamera';

import ProfileImage from '../../assets/images/Profile/avatar.png'
import './Profile.css'

class Profile extends Component {
    state = {
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
                <ListItemText secondary="CHANGE PASSWORD"/>
                <Form
                    onSubmit={this.changePassword}
                    noValidate
                    validated={this.state.passwordValidated}
                    className = "edit_card_body_form"
                >
                <ChangePassword values = {this.state} handleOnChange={this.handleInputChange}/>
                <CustomButton label = "Update Password" type="submit"/>
                </Form>
            </Card.Body>
        )
    }

    renderProfilePic = () => {
        return (
            <div className="profile_image_container">
                <img src={ProfileImage} alt="Avatar" className="avatar"/>
                <div className="overlay">
                    <CameraIcon/>
                </div>
            </div>
        )
    }

    renderStudentProfile = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={4}>
                    <Paper elevation = {3} square style={{padding:"3%"}}>
                        <div className = "pro_head">
                            {this.renderProfilePic()}
                            <Typography gutterBottom variant="h6" component="h1">
                                GENERAL INFORMATION
                            </Typography>
                        </div>
                        { this.renderBasicInformation() }
                        <Divider/>
                        {this.renderBio("This is a bio")}
                        <ChipButton label = "Delete My Account"/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Paper elevation = {3} square style={{padding:"3%"}}>
                        <Tabs defaultActiveKey="password" id="uncontrolled-tab-example">
                            <Tab eventKey="edit" title="Edit">
                                { this.renderEditTab() }
                            </Tab>
                            <Tab eventKey="interests" title="My Interests">
                                
                            </Tab>
                            <Tab eventKey="password" title="Change Password">
                                { this.renderPasswordTab() }
                            </Tab>
                        </Tabs>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    render() {
        return (
            <div className = "profile_root">
               { this.renderStudentProfile() }
            </div>
        )
    }
}

export default Profile