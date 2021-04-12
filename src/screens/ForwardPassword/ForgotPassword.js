import React, { Component } from 'react'

import InputField from '../../components/Input/InputField'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength'
import RegisterLeftPanel from '../../components/RegisterLeftPanel/RegisterLeftPanel'
import CustomButton from '../../components/Button/CustomButton'
import SnackBar from '../../components/SnackBar/SnackBar'
import { sendResetCode, verifyCode, resetPassword } from '../../api/auth'

//Boostrap
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form";

//Material-UI
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';

import './ForgotPassword.css'

class ForgotPassword extends Component {
    state = {
        value: 0,
        resetCode: "",
        email: "",
        password: "",
        confirmPassword: "",
        type: "password",
        passwordScore: 0,
        emailFormValidated: false,
        codeFormValidated: false,
        resetFormValidated: false,
        confirmPasswordError: null,
        emailError: null,
        mobileView: false,
        sendCodeLoading: false,
        invalidEmailError: null,
        confirmCodeLoading: false,
        confirmCodeError: null,
        resetPasswordLoading: false,
        resetPasswordError: null,
        passwordError: null,
        severity: "success",
        snackBarOn: false,
        snackBarMessage: ""
    }

    initialState = this.state

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

    handleSendResetCode = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        const email = this.state.email
        if (!email.trim()) {
            this.setState({
                emailFormValidated: !form.checkValidity(),
            });
        }
        else if (this.validateEmail()) {
            this.setState({
                sendCodeLoading: true,
                invalidEmailError: null,
                resetPasswordError: null,
                confirmCodeError: null
            })
            sendResetCode(email).then(response => {
                this.setState({sendCodeLoading: false})
                this.handleTabChange("",1)
            }).catch(err => {
                let error = "Network error, please try again"
                if (err.message === "INVALID_EMAIL") {
                    error = "Please provide correct email address"
                }
                this.setState({
                    sendCodeLoading: false,
                    invalidEmailError: error
                })
            })
        } 
        else {
            this.setState({
                emailError : "Enter valid email address"
            })
        }

    }

    handleConfirmCode = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if(!this.state.resetCode.trim()) {
            this.setState({
                codeFormValidated: !form.checkValidity(),
            });
        }
        else {
            this.setState({ confirmCodeLoading: true })
            const {email ,resetCode} = this.state
            verifyCode(resetCode, email).then(response => {
                this.setState({ 
                    confirmCodeLoading: false,
                    invalidEmailError: null,
                    resetPasswordError: null,
                    confirmCodeError: null 
                })
                if(response.success) {
                    this.handleTabChange("",2)
                } else {
                    this.setState({
                        confirmCodeError: "Confirmation code is not matched"
                    })
                }
            }).catch(err => {
                this.setState({ 
                    confirmCodeLoading: false,
                    confirmCodeError: "Network error, please try again" 
                })
            })
        }
    }

    handleReset = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const {password, confirmPassword, email, passwordScore} = this.state
        if (!password && !confirmPassword) {
            this.setState({
                resetFormValidated: !form.checkValidity(),
            });
        }
        else if(password !== confirmPassword) {
            this.setState({
                confirmPasswordError:"Passwords are not matched"
            })
        } 
        else if (passwordScore < 2) {
            this.setState({ passwordError : "Password not strong enough"})
        }
        else {
            this.setState({ 
                resetPasswordLoading: true,
                invalidEmailError: null,
                resetPasswordError: null,
                confirmCodeError: null 
            })
            resetPassword(password, email).then(response => {
                this.setState({ 
                    ...this.initialState,
                    resetPasswordLoading: false,
                    severity: "success",
                    snackBarOn: true, 
                    snackBarMessage: "Password changed successfully",
                })
                this.handleTabChange("",0)
            }).catch(err => {
                this.setState({ 
                    resetPasswordLoading: false,
                    resetPasswordError: "Password reset failed, please try again" 
                })
            })
        }
    }

    onPasswordScoreChange = (score) => {
        this.setState({
            passwordScore: score
        })
    }

    handleSnackBarClose = () => {
        this.setState({
            severity: "success",
            snackBarOn: false, 
            snackBarMessage: "",
        })
    }

    validateEmail = () => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = pattern.test(this.state.email);
        if (!result) {
            this.setState({
              emailError: "Enter a valid email address",
            });
        } 

        return result
    }

    handleVisibility = () => {
        if (this.state.type === "password") {
            this.setState({ type:"text" })
        } else {
            this.setState({ type:"password" })
        }
    }

    handleInputOnChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
            confirmPasswordError:null,
            emailError:null,
            invalidEmailError: null,
            resetPasswordError: null,
            confirmCodeError: null,
            passwordError: null
        })
    }

    handleTabChange = (event,value) => {
        this.setState({
            value:value
        })
    }

    renderStep01 = () => {
        const {emailFormValidated, email, emailError, sendCodeLoading} = this.state
        return (
            <div>
                <Card.Text className = "forgot_password_user_message">
                    Don't worry tell us your email Address <p> you registerd with us</p>
                </Card.Text>
                <Card.Text className = "forgot_password_user_message">
                    We'll send a <span style = {{color:'blue', fontWeight: "bold"}}>reset code</span> to your email address
                </Card.Text>

                <Form
                    onSubmit={this.handleSendResetCode}
                    noValidate
                    validated={emailFormValidated}
                >
                    <InputField 
                        type = "email"
                        name = "email"
                        value = { email }
                        onChange = { this.handleInputOnChange }
                        max = { 320 }
                        placeholder = "Email"
                    />

                    {
                        emailError &&
                        <div className = "error_div">
                            <span className = "error">{emailError}</span> 
                        </div> 
                    }
                    {
                        sendCodeLoading ? 
                        <div className = "loading_div">
                            <CircularProgress/>
                        </div>
                        :
                        <CustomButton label = "Send Reset Code" type="submit" fullWidth/>
                    }
                </Form>
            </div>
        )
    }

    renderStep02 = () => {
        const {email, codeFormValidated, resetCode, confirmCodeLoading} = this.state
        return (
            <div>
                <Card.Text className = "forgot_password_user_message">
                    We sent a reset code to <span style = {{color:'red'}}> {email} </span> 
                </Card.Text>

                <Form
                    onSubmit={this.handleConfirmCode}
                    noValidate
                    validated={codeFormValidated}
                >
                    <InputField 
                        type = "text"
                        name = "resetCode"
                        value = { resetCode }
                        onChange = { this.handleInputOnChange }
                        max = { 6 }
                        placeholder = "Code"
                    />
                    {
                        confirmCodeLoading ? 
                        <div className = "loading_div">
                            <CircularProgress/>
                        </div>
                        :
                        <CustomButton label = "Confirm Reset Code" type="submit" fullWidth/>
                    }
                </Form>
            </div>
        )
    }

    renderStep03 = () => {
        const {resetFormValidated, password, type, confirmPasswordError, confirmPassword, passwordError} = this.state
        return (
            <div>
                <Card.Text className = "forgot_password_user_message">
                    You can reset a new password from here! 
                </Card.Text>

                <Form
                    onSubmit={this.handleReset}
                    noValidate
                    validated={resetFormValidated}
                >
                    <InputField 
                        type = "password"
                        name = "password"
                        value = { password }
                        onChange = { this.handleInputOnChange }
                        max = { 30 }
                        placeholder = "Password"
                    />
                    { passwordError &&
                        <div className = "error_div">
                            <span className = "error">{passwordError}</span> 
                        </div>
                    }
                    { password && <PasswordStrength value = { password } min = { 5 } onChangeScore = {this.onPasswordScoreChange}/> }

                    <PasswordInput 
                        type = { type }
                        name = "confirmPassword"
                        value = { confirmPassword }
                        onChange = { this.handleInputOnChange }
                        max = { 30 }
                        placeholder = "Confirm password"  
                        onClick = { this.handleVisibility } 
                    />

                    {
                        confirmPasswordError &&
                        <div className = "error_div">
                            <span className = "error">{confirmPasswordError}</span> 
                        </div>
                    }

                    <CustomButton label = "Reset" type="submit" fullWidth/>
                </Form>
            </div>
        )
    }

    renderSteps = () => {
        switch (this.state.value) {
            case 0: return this.renderStep01()      
            case 1: return this.renderStep02()
            case 2: return this.renderStep03()  
            default: return this.renderStep01()  
        }
    }

    renderForm = () => {
        const { resetPasswordError, invalidEmailError, confirmCodeError } = this.state
        return (
            <div>
                <Card.Body className = { this.state.mobileView ? "forgot_password_form_root-mobile" :"forgot_password_form_root"}>
                    <Card.Title className = "signIn_from_title">Forgot Password ?</Card.Title>
                    <div>
                        <Tabs
                            value={this.state.value}
                            indicatorColor="secondary"
                            textColor="secondary"
                            centered
                        >
                            <Tab label="Email" />
                            <Tab label="Confirm Code" />
                            <Tab label="Reset" />
                        </Tabs>
                                
                        { this.renderSteps() }

                        {
                            invalidEmailError ? 
                            <span className = "error">{invalidEmailError}</span>
                            :
                            confirmCodeError ?
                            <span className = "error">{confirmCodeError}</span>
                            :
                            resetPasswordError ? 
                            <span className = "error">{resetPasswordError}</span>
                            :
                            null
                        }

                        <Grid container className = "signIn">
                            <Grid item xs>
                                <Link href="/signUp" variant="body2">
                                    {"Not a member? Sign Up"}
                                </Link>
                            </Grid>
                            <Grid item xs></Grid>
                            <Grid item>
                                <Link href="/signIn" variant="body2">
                                    {"Already a member? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </Card.Body>
            </div>
        )
    }

    renderDesktopView = () => {
        return (
            <Grid container component="main" className = "forgot_password_root">
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className = "forgot_password_left">
                    <RegisterLeftPanel tag ="forgot-password"/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className = "forgot_password_right">
                    { this.renderForm() }
                </Grid>
            </Grid>
        )
    }

    renderMobileView = () => {
        return (
            <Paper className = "login_paper-mobile" elevation ={5}>
                <div className = "login_card-mobile">
                    { this.renderForm() }
                </div>
            </Paper>
        )
    }

    render() {
        const { snackBarOn, snackBarMessage, severity } = this.state
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

export default ForgotPassword