import React from 'react'

import CustomButton from '../../components/Button/CustomButton'
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength'

//Material-UI
import CircularProgress from '@material-ui/core/CircularProgress';

//Boostarp
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './SignUp.css'

const SignUpForm = ({
    handleSubmit,
    validated,
    values,
    handleInputChange,
    handlePasswordScoreOnChange
}) => {

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
                    name === "password" && values[name] && 
                        <PasswordStrength 
                            value = { values[name] } 
                            min = { 5 }
                            onChangeScore = {handlePasswordScoreOnChange}   
                        /> 
                }
                {
                    name === "email" && values["emailError"] && <span className = "error">{values["emailError"]}</span>
                }
                {
                    name === "password" && values["passwordError"] && 
                    <span className = "error">{values["passwordError"]}</span>
                }
                {
                    name === "confirmPassword" && values["passwordMatchError"] &&
                    <span className = "error">{values["passwordMatchError"]}</span>
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
                <Col sm = {6}>
                    { renderInputField("text", "firstName", "First name", 50) }
                </Col>
                <Col sm = {6}>
                    { renderInputField("text", "lastName", "Last name", 50) }
                </Col>
            </Row>

            <Row>
                <Col sm>
                    { renderInputField("email", "email", "Email", 320) }
                </Col>
            </Row>

            <Row>
                <Col sm>
                    { renderInputField("password", "password", "Password", 30) }
                </Col>
            </Row>

            <Row>
                <Col sm> 
                    { renderInputField("password", "confirmPassword", "Confirm Password", 30) } 
                </Col>
            </Row>

            {
                values['apiCalling'] ? 
                <div className = "loading_div">
                    <CircularProgress/>
                </div>
                :
                <Row className = "submit_btn">
                    <Col sm> 
                        <CustomButton type="submit" fullWidth label = "Sign-Up"/>                     
                    </Col>
                </Row>
            }
        </Form>
    )
}

export default SignUpForm
