import React, { Component } from 'react'
import {connect} from 'react-redux'

import SignInForm from './SignInForm'
import RegisterLeftPanel from '../../components/RegisterLeftPanel/RegisterLeftPanel'
import RegisterMobilePanel from '../../components/RegisterMobilePanel/RegisterMobilePanel'
import SnackBar from '../../components/SnackBar/SnackBar'
import { signInUser } from '../../api/auth'
import { storeLoginResponse } from '../../redux/actions/authAction'

//Boostrap
import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";

//Material-UI
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import './SignIn.css'
import google from '../../assets/images/social/google.png'
import facebook from '../../assets/images/social/facebook.png'

class SignIn extends Component {
    state = {
        validated: false,
        email: "",
        password: "",
        mobileView: false,
        emailError: null,
        apiCalling: false,
        signInSuccess: false,
        severity: "success",
        snackBarOn: false,
        snackBarMessage: "",
        passwordType: "password"
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
    resize() {
        let mobileView = (window.innerWidth <= 850);
        this.setState({
            mobileView: mobileView
        })
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({
          validated: !form.checkValidity(),
        });

        const {email, password} = this.state

        if (!this.validateEmail()) {
            this.setState({
                emailError: "Enter a valid email address",
            })
            return
        }

        if(email) {
            this.setState({ 
                apiCalling: true,
                emailError: null
            })
            const request = { 
                username: email, 
                password 
            }

            signInUser(request).then(response => {
                const loginResponse = {
                    accessToken: response.token,
                    expiryTime: response.expirationInMilliseconds,
                    email: response.email,
                    userId: response.userId,
                    role: response.role,
                    profileId: response.profileId
                }
                this.props.storeLoginResponse(loginResponse)
                this.setState ({
                    signInSuccess: true,
                    apiCalling: false,
                    severity: "success",
                    snackBarMessage: "Login successful",
                    snackBarOn: true,
                })
                this.handleLoginSuceesRoute()
            }).catch(err => {
                this.setState({
                    signInSuccess: false,
                    apiCalling: false,
                    severity: "error",
                    snackBarOn: true,
                    snackBarMessage: "Invalid credentials, please try again",
                })
            })
        }
    }

    handlePasswordTypeChange = () => {
        const passwordType = this.state.passwordType
        let type = "password"
        if(passwordType === "password") {
            type = "text"
        }
        this.setState({ passwordType: type })
    }

    handleLoginSuceesRoute = () => {
        setTimeout(() => {
            this.props.history.push('/')
        }, 1000)
    }

    handleSnackBarClose = () => {
        this.setState({
            snackBarOn: false,
            snackBarMessage: ""
        })
    }

    handleHomeRoute = () => {
        window.location.replace('/')
    }

    handleInputOnChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
            emailError: null
        })
    }

    validateEmail = () => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(this.state.email);
    }

    renderSocial = () => {
        return (
            <div className = "social_signup_block">
                <div className = "social_signup_blocks">
                    <div className = "social_signup_item">
                        <div className = "social_signup_item_card">
                            <Avatar src = {google} style = {{width: "25px", height: "25px", marginRight: "5px"}}/>
                            Google
                        </div>
                    </div>
                    <div className = "social_signup_item">
                        <div className = "social_signup_item_card">
                            <Avatar src = {facebook} style = {{width: "26px", height: "25px", marginRight: "5px"}}/>
                            Facebook
                        </div>
                    </div>
                </div>
                <div className = "divider">
                    <span className = "divider_span">or</span>
                </div>
            </div>
        )
    }

    renderForm = () => {
        return (
            <Card.Body className = { this.state.mobileView ? "login_form-mobile" :"login_form"}>
                <Row>
                    <span className = "not_member">Not a member ? <a href="/signUp">SIGN UP</a> </span>
                </Row>
                { this.renderSocial() }
                <SignInForm
                    handleSubmit = {this.handleSubmit}
                    validated = {this.state.validated}
                    values = {this.state}
                    handleInputChange = {this.handleInputOnChange}
                    onClick = {this.handlePasswordTypeChange}
                />
            </Card.Body>
        )
    }

    renderMobileView = () => {
        return (
            <Paper className = "login_paper-mobile" elevation ={5}>
                <div className = "login_card-mobile">
                    <RegisterMobilePanel/>
                    { this.renderForm() }
                </div>
            </Paper>
        )
    }

    renderDesktopView = () => {
        return (
            <Grid container component="main" className = "sign_in_root">
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className = "sign_in_left">
                    <RegisterLeftPanel tag ="signin"/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className = "sign_in_right">
                    { this.renderForm() }
                </Grid>
            </Grid>
        )
    }

    render() {
        const {snackBarOn, snackBarMessage, severity} = this.state
        return (
            <div>
                {
                    !this.state.mobileView ? this.renderDesktopView() : this.renderMobileView()
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

const mapDispatchToProps = dispatch => {
    return {
        storeLoginResponse: data => { dispatch(storeLoginResponse(data)) }
    }
}

export default connect(null,mapDispatchToProps)(SignIn)