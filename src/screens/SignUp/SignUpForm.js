import React from 'react'

import CustomButton from '../../components/Button/CustomButton'
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength'
import PasswordInput from '../../components/PasswordInput/PasswordInput'

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
    handlePasswordScoreOnChange,
    onEyeClick
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
                    name === "email" && values["emailError"] && <span className = "error">{values["emailError"]}</span>
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

            <PasswordInput
                type = {values["passwordType"]}
                name = "password"
                value = {values["password"]}
                onChange = {handleInputChange}
                max = {30}
                placeholder = "password"
                onClick = {onEyeClick}
            />
            {
                values["password"] && 
                    <PasswordStrength 
                        value = { values["password"] } 
                        min = { 5 }
                        onChangeScore = {handlePasswordScoreOnChange}   
                    /> 
            }
            {
                values["passwordError"] && <span className = "error">{values["passwordError"]}</span>
            }

            <Row>
                <Col sm> 
                    { renderInputField("password", "confirmPassword", "Confirm password", 30) } 
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
