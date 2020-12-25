import React, { Component } from 'react'

//Boostrap
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Material-UI
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NavigationIcon from '@material-ui/icons/Navigation';

import './ForgotPassword.css'

import InputField from '../../components/Input/InputField'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength'

class ForgotPassword extends Component {
    state = {
        value:0,
        resetCode:"",
        email:"",
        password:"",
        confirmPassword:"",
        type:"password",
        emailFormValidated:false,
        codeFormValidated:false,
        resetFormValidated:false,
        confirmPasswordError:null,
        emailError:null
    }

    handleHomeRoute = () => {
        window.location.replace('/')
    }

    handleSendResetCode = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (!this.state.email) {
            this.setState({
                emailFormValidated: !form.checkValidity(),
            });
        }
        else if (this.validateEmail()) {
            this.handleTabChange("",1)
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
        if(!this.state.resetCode) {
            this.setState({
                codeFormValidated: !form.checkValidity(),
            });
        }
        else {
            this.handleTabChange("",2)
        }
    }

    handleReset = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (!this.state.password && !this.state.confirmPassword) {
            this.setState({
                resetFormValidated: !form.checkValidity(),
            });
        }
        else if(this.state.password === this.state.confirmPassword) {
            this.handleTabChange("",0)
        } 
        else {
            this.setState({
                confirmPasswordError:"Passwords are not matched"
            })
        }
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
        if(this.state.type === "password") {
            this.setState({ type:"text" })
        } else {
            this.setState({ type:"password" })
        }
    }

    handleCommonTypeInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
            confirmPasswordError:null,
            emailError:null
        })
    }

    handleTabChange = (event,value) => {
        this.setState({
            value:value
        })
    }

    renderStep01 = () => {
        return (
            <div>
                <Card.Text className = "forgot_password_user_message">
                    Don't worry tell us your email Address <p> you registerd with us</p>
                </Card.Text>
                <Card.Text className = "forgot_password_user_message">
                    We'll send a <span style = {{color:'red'}}>reset code</span> to your email address
                </Card.Text>

                <Form
                    onSubmit={this.handleSendResetCode}
                    noValidate
                    validated={this.state.emailFormValidated}
                >
                    <InputField 
                        type = "email"
                        name = "email"
                        value = { this.state.email }
                        onChange = { this.handleCommonTypeInputChange }
                        max = { 320 }
                        placeholder = "Email"
                    />

                    {
                        this.state.emailError ?
                        <div className = "error_div">
                            <span className = "error">{this.state.emailError}</span> 
                        </div> 
                        : null
                    }

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                    Send Reset Code
                    </Button>
                </Form>
            </div>
        )
    }

    renderStep02 = () => {
        return (
            <div>
                <Card.Text className = "forgot_password_user_message">
                    We sent a reset code to <span style = {{color:'red'}}> {this.state.email} </span> 
                </Card.Text>

                <Form
                    onSubmit={this.handleConfirmCode}
                    noValidate
                    validated={this.state.codeFormValidated}
                >
                    <InputField 
                        type = "text"
                        name = "resetCode"
                        value = { this.state.resetCode }
                        onChange = { this.handleCommonTypeInputChange }
                        max = { 6 }
                        placeholder = "Code"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                    Confirm Reset Code
                    </Button>
                </Form>
            </div>
        )
    }

    renderStep03 = () => {
        return (
            <div>
                <Card.Text className = "forgot_password_user_message">
                    You can reset a new password from here! 
                </Card.Text>

                <Form
                    onSubmit={this.handleReset}
                    noValidate
                    validated={this.state.resetFormValidated}
                >
                    <InputField 
                        type = "password"
                        name = "password"
                        value = { this.state.password }
                        onChange = { this.handleCommonTypeInputChange }
                        max = { 30 }
                        placeholder = "Password"
                    />
                    {
                        this.state.password ? <PasswordStrength value = { this.state.password } min = { 5 }/> : null
                    }

                    <PasswordInput 
                        type = { this.state.type }
                        name = "confirmPassword"
                        value = { this.state.confirmPassword }
                        onChange = { this.handleCommonTypeInputChange }
                        max = { 30 }
                        placeholder = "Confirm password"  
                        onClick = { this.handleVisibility } 
                    />

                    {
                        this.state.confirmPasswordError ?
                        <div className = "error_div">
                            <span className = "error">{this.state.confirmPasswordError}</span> 
                        </div> 
                        : null
                    }

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                    Reset
                    </Button>
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

    render() {
        return (
            <Grid container component="main" className = "forgot_password_root">
                <CssBaseline />
                <Grid item xs={false} sm={4} md={5} className = "forgot_password_image"/>
                <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
                    <div className = "forgot_password_paper" >
                        <Card className = "forgot_password_card">
                            <Card.Title className = "signIn_from_title">Forgot Password ?</Card.Title>
                            <Paper>
                                <Tabs
                                    value={this.state.value}
                                    indicatorColor="secondary"
                                    textColor="secondary"
                                    centered
                                    // onChange = {this.handleTabChange}
                                >
                                <Tab label="Email" />
                                <Tab label="Confirm Code" />
                                <Tab label="Reset" />
                                </Tabs>
                                
                                <Card.Body className = "forgot_password_form_root">
                                    {
                                        this.renderSteps()
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

                                    <Row className = "home_btn" style = {{marginTop:'2%'}}>
                                        <Col>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                fullWidth
                                                startIcon={<NavigationIcon  />}
                                                onClick = {this.handleHomeRoute}
                                            >
                                            Home
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Paper>
                        </Card>
                    </div>
                </Grid>  
            </Grid>
        )
    }
}

export default ForgotPassword