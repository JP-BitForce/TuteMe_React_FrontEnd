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

import './SignIn.css'

import InputField from '../../components/Input/InputField'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import RegisterLeftPanel from '../../components/RegisterLeftPanel/RegisterLeftPanel'
import RegisterMobilePanel from '../../components/RegisterMobilePanel/RegisterMobilePanel'
import SocialRegister from '../../components/SocialRegister/SocialRegister'
import CustomButton from '../../components/Button/CustomButton'

class SignIn extends Component {
    state = {
        validated:false,
        email:"",
        password:"",
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

    handleLoader = (boolean) => {
        this.setState({
            loading:boolean
        })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({
          validated: !form.checkValidity(),
          loading:true
        });
    }

    handleCommonTypeInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
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
        if(this.state.type === "password") {
            this.setState({ type:"text" })
        } else {
            this.setState({ type:"password" })
        }
    }

    renderForm = () => {
        return (
            <Card.Body className = { this.state.mobileView ? "login_form-mobile" :"login_form"}>
                <Row>
                    <span className = "not_member">Not a member ? <a href="/signUp">SIGN UP</a> </span>
                </Row>

                <Card.Title className = "signIn_from_title">Sign In</Card.Title>
                    <Form
                        onSubmit={this.handleSubmit}
                        noValidate
                        validated={this.state.validated}
                    >
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
                                <PasswordInput 
                                    type = { this.state.type }
                                    name = "password"
                                    value = { this.state.password }
                                    onChange = { this.handleCommonTypeInputChange }
                                    max = { 30 }
                                    placeholder = "Password"  
                                    onClick = { this.handleVisibility } 
                                />
                            </Col>
                        </Row>

                        <Row className = "submit_btn">
                            <Col>
                                <CustomButton label = "Sign-In" type="submit" fullWidth/>
                            </Col>
                        </Row>

                        <Grid container style = {{marginTop:'2%'}}>
                            <Grid item xs></Grid>
                            <Grid item>
                                <Link href="/forgotPassword" variant="body2">
                                    {"Forgot Password"}
                                </Link>
                            </Grid>
                        </Grid>

                        <SocialRegister/>
                </Form>
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
        return (
            !this.state.mobileView ? this.renderDesktopView() : this.renderMobileView()
        )
    }
}

export default SignIn