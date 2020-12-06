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

import './SignIn.css'

class SignIn extends Component {
    state = {
        validated:false,
        email:null,
        password:null
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
    }

    handleCommonTypeInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
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
            <Grid container component="main" className = "signIn_root">
                <CssBaseline />
                <Grid item xs={false} sm={4} md={5} className = "signIn_image"/>

                <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square className = "card_root">
                    <div className = "signIn_paper" >
                        <Card className = "signIn_card">
                            <Card.Body>
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
                                        { this.renderInputField("email", "email", this.state.email, this.handleCommonTypeInputChange, 320, "Email")}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        { this.renderInputField("password", "password", this.state.password, this.handleCommonTypeInputChange, 20, "Password")}
                                    </Col>
                                </Row>

                                <Grid container>
                                    <Grid item xs></Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Forgot Password"}
                                        </Link>
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
                                        Sign In
                                        </Button>
                                    </Col>
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
                            </Card.Body>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default SignIn