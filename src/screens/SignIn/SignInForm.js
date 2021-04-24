import React from 'react'

import CustomButton from '../../components/Button/CustomButton'
import PasswordInput from '../../components/PasswordInput/PasswordInput'

//Boostrap
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Material-UI
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

const SignInForm = ({handleSubmit, validated, values, handleInputChange, onClick}) => {

    const renderInputField = (type, name, placeholder, max) => {
        return (
            <Form.Group>
                <Form.Control
                    type = {type}
                    name = {name}
                    value = {values[name]} 
                    onChange = {handleInputChange}
                    required
                    maxLength = {max}
                    placeholder = {placeholder}
                />
                <Form.Control.Feedback type="invalid">
                    {placeholder} can't be empty
                </Form.Control.Feedback>
                {
                    name === "email" && values["emailError"] && <span className = "error">{values["emailError"]}</span>
                }
            </Form.Group>
        )
    }

    return (
        <Form
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
        >
            <Row>
                <Col sm>
                    { renderInputField("email", "email", "Email", 320) }
                </Col>
            </Row>

            <Row>
                <Col sm>
                    <PasswordInput
                        type = {values["passwordType"]}
                        name = "password"
                        value = {values["password"]}
                        onChange = {handleInputChange}
                        max = {30}
                        placeholder = "password"
                        onClick = {onClick}
                    />
                </Col>
            </Row>

            {
                values['apiCalling'] ? 
                <div className = "loading_div">
                    <CircularProgress/>
                </div>
                :
                <Row className = "submit_btn">
                    <Col>
                        <CustomButton label = "Sign-In" type="submit" fullWidth/>
                    </Col>
                </Row>
            }


            <Grid container style = {{marginTop:'2%'}}>
                <Grid item xs/>
                <Grid item>
                    <Link href="/forgotPassword" variant="body2">
                        {"Forgot Password"}
                    </Link>
                </Grid>
            </Grid>
        </Form>
    )
}

export default SignInForm
