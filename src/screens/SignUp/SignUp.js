import React, { Component } from 'react'

import RegisterLeftPanel from '../../components/RegisterLeftPanel/RegisterLeftPanel'
import RegisterMobilePanel from '../../components/RegisterMobilePanel/RegisterMobilePanel'
import SnackBar from '../../components/SnackBar/SnackBar'
import { signUpUser } from '../../api/auth'
import './SignUpForm'

//Material-UI
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';

import './SignUp.css'
import google from '../../assets/images/social/google.png'
import facebook from '../../assets/images/social/facebook.png'
import SignUpForm from './SignUpForm'

class SignUp extends Component {
    state = {
        validated:false,
        firstName:null,
        lastName:null,
        email:null,
        password:null,
        confirmPassword:null,
        passwordError: null,
        passwordMatchError:null,
        emailError:null,
        mobileView:false,
        loading:false,
        passwordScore: 0,
        signUpSuccess: false,
        apiCalling: false,
        severity: "success",
        snackBarMessage: "",
        snackBarOn: false
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

    
    handleHomeRoute = () => {
       window.location.replace('/') 
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({
          validated: !form.checkValidity(),
        });

        const {firstName, lastName, email, password, passwordScore} = this.state

        if (!this.validateEmail()) {
            this.setState({
                emailError: "Enter a valid email address",
            })
            return
        }

        if (passwordScore < 2) {
            this.setState({
                passwordError: "Password not strong enough!"
            })
            return
        }

        if(!this.checkPasswordMatch()) {
            this.setState({
                passwordMatchError:"Password and Confirm Password did not match"
            })
            return
        }
        
        if (email) {
            this.setState({ 
                apiCalling: true,
                passwordError: null,
                passwordMatchError: null,
                emailError: null
            })
            const request = { firstName, lastName, email, password }
            signUpUser(request, "student").then(response => {
                if (response.success) {
                    this.setState({
                        signUpSuccess: true,
                        apiCalling: false,
                        severity: "success",
                        snackBarMessage: response.message,
                        snackBarOn: true,
                    })
                    this.setInfoSnackBar()
                } else {
                    this.setSignUpErrorState(response.message)
                }
            }).catch(err => {
                this.setSignUpErrorState(err.message)
            })
        }
    }

    setSignUpErrorState = (message) => {
        this.setState({
            signUpSuccess: false,
            apiCalling: false,
            severity: "error",
            snackBarOn: true,
            snackBarMessage: message,
        })
    }

    setInfoSnackBar = () => {
        setTimeout(() => {
            this.setState({
                severity: "info",
                snackBarMessage: "Now you can log into system",
                snackBarOn: true,
                firstName:null,
                lastName:null,
                email:null,
                password:null,
                confirmPassword:null
            })
            window.location.replace('/signIn')
        }, 4000)
    }

    checkPasswordMatch = () => {
        var result = false
        if(this.state.password === this.state.confirmPassword){
            result = true
        }
        return result
    }

    validateEmail = () => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(this.state.email);
    }

    handlePasswordScoreOnChange =  (score) => {
        this.setState({
            passwordScore: score
        })
    }

    handleInputOnChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
            passwordError: null
        })
    }

    handleSnackBarClose = () => {
        this.setState({
            snackBarOn: false,
            snackBarMessage: ""
        })
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
            <div className = "form__root">
                <div>
                    <span className = "already_member">Already a member ? <a href="/signIn">SIGN IN</a> </span>
                </div>
                { this.renderSocial() }
                <SignUpForm
                    handleSubmit = {this.handleSubmit}
                    validated = {this.state.validated}
                    values = {this.state}
                    handleInputChange = {this.handleInputOnChange}
                    handlePasswordScoreOnChange = {this.handlePasswordScoreOnChange}
                />
                <div style = {{marginTop: "10px"}}>
                    <span className = "terms_condition"> By signing up, I agreed to </span> 
                    <Link href = "#" variant="body1" className = "terms_cond">Terms & Conditions</Link>
                </div>
            </div>
        )
    }

    renderDesktopView = () => {
        return (
            <Grid container component="main" className = "sign_up_root">
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className = "sign_up_left">
                    <RegisterLeftPanel tag ="signup"/> 
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className = "sign_up_right">
                    { this.renderForm() }
                </Grid>
            </Grid>
        )
    }

    renderMobileView = () => {
        return (
            <Paper className = "signUp_paper-mobile" elevation ={5}>
                <div className = "login_card-mobile">
                    <RegisterMobilePanel/>
                    { this.renderForm() }
                </div>
            </Paper>
        )
    }

    render() {
        const {snackBarOn, snackBarMessage, severity} = this.state
        return (
            <div>
                {
                    !this.state.mobileView ? 
                    this.renderDesktopView() 
                    : 
                    this.renderMobileView()
                }
                <SnackBar
                    open = {snackBarOn}
                    autoHideDuration = {3000}
                    message = {snackBarMessage}
                    severity = {severity}
                    handleClose = {this.handleSnackBarClose}
                />
            </div>
        )
    }
}

export default SignUp