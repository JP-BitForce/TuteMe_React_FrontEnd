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

import './SignUp.css'

import InputField from '../../components/Input/InputField'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength'
import RegisterLeftPanel from '../../components/RegisterLeftPanel/RegisterLeftPanel'
import RegisterMobilePanel from '../../components/RegisterMobilePanel/RegisterMobilePanel'

class SignUp extends Component {
    state = {
        validated:false,
        firstName:null,
        lastName:null,
        dob:null,
        email:null,
        password:null,
        confirmPassword:null,
        promoChecked:false,
        passwordMatchError:null,
        emailError:null,
        type:"password",
        mobileView:false,
        loading:false
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

    checkPasswordMatch = () => {
        if(this.state.password === this.state.confirmPassword){
            return true
        } else {
            this.setState({
                passwordMatchError:"Password and Confirm Password did not match"
            })
            return false
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

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({
          validated: !form.checkValidity(),
        });

        if (this.checkPasswordMatch() && this.validateEmail()) {
            const data = {
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                dob : this.state.dob,
                email : this.state.email,
                password: this.state.password,
                promoChecked : this.state.promoChecked
            }

            console.log(data)
        }
        
    }

    handleCommonTypeInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleAcceptPromotoion = () => {
        this.setState({
            promoChecked: !this.state.promoChecked
        })
    }

    handleVisibility = () => {
        if(this.state.type === "password") {
            this.setState({ type:"text" })
        } else {
            this.setState({ type:"password" })
        }
    }

    renderCheckBox = (checked, onChange, label) => {
        return (
            <Form.Group>
                <Form.Check
                checked = {checked}
                onChange = {onChange}
                type = "checkbox"
                name = "checked"
                readOnly
                label = {label}
                />
          </Form.Group>
        )
    }

    renderForm = () => {
        return (
            <Card.Body>
                    <Row>
                        <span className = "already_member">Already a member ? <a href="/signIn">SIGN IN</a> </span>
                    </Row>

                    <Card.Title className = "signUp_from_title">Sign Up</Card.Title>
                    <Form
                        onSubmit={this.handleSubmit}
                        noValidate
                        validated={this.state.validated}
                    >
                        <Row>
                            <Col sm={6}>
                                <InputField 
                                    type = "text"
                                    name = "firstName"
                                    value = { this.state.firstName }
                                    onChange = { this.handleCommonTypeInputChange }
                                    max = { 20 }
                                    placeholder = "First Name"
                                />
                            </Col>
                            <Col sm={6}>
                                <InputField 
                                    type = "text"
                                    name = "lastName"
                                    value = { this.state.lastName }
                                    onChange = { this.handleCommonTypeInputChange }
                                    max = { 20 }
                                    placeholder = "Last Name"
                                />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputField 
                                        type = "text"
                                        name = "dob"
                                        value = { this.state.dob }
                                        onChange = { this.handleCommonTypeInputChange }
                                        max = { 10 }
                                        placeholder = "Date of Birth"
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputField 
                                        type = "email"
                                        name = "email"
                                        value = { this.state.email }
                                        onChange = { this.handleCommonTypeInputChange }
                                        max = { 320 }
                                        placeholder = "Email"
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <InputField 
                                        type = "password"
                                        name = "password"
                                        value = { this.state.password }
                                        onChange = { this.handleCommonTypeInputChange }
                                        max = { 30 }
                                        placeholder = "Password"
                                    />
                                </Col>
                            </Row>
                            {
                                this.state.password ? <PasswordStrength value = { this.state.password } min = { 5 }/> : null
                            }
                            
                            <Row>
                                <Col>
                                    <PasswordInput 
                                        type = { this.state.type }
                                        name = "confirmPassword"
                                        value = { this.state.confirmPassword }
                                        onChange = { this.handleCommonTypeInputChange }
                                        max = { 30 }
                                        placeholder = "Confirm Password"  
                                        onClick = { this.handleVisibility } 
                                    />
                                </Col>
                            </Row>

                            <Grid container>
                                <Grid item>
                                    { this.renderCheckBox(this.state.promoChecked, this.handleAcceptPromotoion, "I would like to recieve Tute-Me Promotions to my email")}
                                </Grid>
                            </Grid>

                            <Row className = "submit_btn">
                                <Col>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    >
                                    Sign Up
                                    </Button>
                                </Col>
                            </Row>

                            <Grid container className = "signIn">
                                <Grid item xs></Grid>
                                <Grid item>
                                    <Link href="/signIn" variant="body2">
                                        {"Already a member? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>

                            <Row className = "terms_condition_root">
                                <span className = "terms_condition"> By signing up, I agreed to </span> 
                                <Link href = "#" variant="body1">Terms & Conditions</Link>
                            </Row>
                    </Form>
            </Card.Body>
        )
    }

    render() {
        return (
            <Grid container component="main" className = "signUp_image">
                <CssBaseline />
                <Grid item xs={false} sm={4} md={5}>
                    {
                        !this.state.mobileView ? <RegisterLeftPanel tag ="signup"/> : null
                    }
                </Grid>

                <Grid item xs={12} sm={8} md={7} elevation={6} square>
                    {
                        this.state.mobileView ? 
                        <Paper className = "signUp_paper-mobile" elevation ={5}>
                            <div className = "login_card-mobile">
                                <RegisterMobilePanel/>
                                {
                                    this.renderForm()
                                }
                            </div>
                        </Paper>
                        :
                        <Paper className = "login_paper" elevation ={5}>
                            <div className = "login_card">
                                {
                                    this.renderForm()
                                }
                            </div>
                        </Paper>
                    }
                </Grid>
            </Grid>
        )
    }
}

export default SignUp