import React, { Component } from 'react'

//Boostrap
import Card from 'react-bootstrap/Card'
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Material-UI
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';

import './SignUp.css'

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
        emailError:null
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

    renderInputField = (type,name,value,onChange,max,placeholder) => {
        return (
            <Form.Group>
                <Form.Control
                    type = {type}
                    name = {name}
                    value = {value} 
                    onChange = {onChange}
                    required
                    maxLength = {max}
                    placeholder = {placeholder}
                />
                <Form.Control.Feedback type="invalid">
                    {placeholder} name can't be empty
                </Form.Control.Feedback>
            </Form.Group>
        )
    }


    render() {
        return (
            <Grid container component="main" className = "signUp_root">
                <CssBaseline />
                <Grid item xs={false} sm={4} md={5} className = "signUp_image"/>

                <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
                    <div className = "signUp_paper" >
                        <Card className = "signUp_card">
                            <Card.Body>
                            <Row>
                                <span className = "already_member">Already a member ? <a href="/signIn">SIGN IN</a> </span>
                            </Row>

                            <Card.Title className = "signUp_from_title">Sign Up</Card.Title>
                            </Card.Body>
                            <Form
                                onSubmit={this.handleSubmit}
                                noValidate
                                validated={this.state.validated}
                            >
                            <Row>
                                <Col sm={6}>
                                    { this.renderInputField("text", "firstName", this.state.firstName, this.handleCommonTypeInputChange, 20, "First Name")}
                                </Col>
                                <Col sm={6}>
                                    { this.renderInputField("text", "lastName", this.state.lastName, this.handleCommonTypeInputChange, 20, "Last Name")}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    { this.renderInputField("text", "dob", this.state.dob, this.handleCommonTypeInputChange, 10, "Date of Birth")}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    { this.renderInputField("email", "email", this.state.email, this.handleCommonTypeInputChange, 320, "Email")}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    { this.renderInputField("password", "password", this.state.password, this.handleCommonTypeInputChange, 20, "Password")}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    { this.renderInputField("password", "confirmPassword", this.state.confirmPassword, this.handleCommonTypeInputChange, 20, "Confirm Password")}
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
                                <span className = "terms_condition">By signing up, I agreed to</span>
                                <Link href = "#" variant="body1">Terms & Conditions</Link>
                            </Row>

                            <Row className = "home_btn">
                                <Col>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<NavigationIcon  />}
                                        onClick = {this.handleHomeRoute}
                                    >
                                    Home
                                    </Button>
                                </Col>  
                            </Row>

                            </Form>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default SignUp