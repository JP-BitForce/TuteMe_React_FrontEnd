import React from 'react'

//Boostarp
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import InputField from '../../components/Input/InputField'
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength'

const ChangePassword = ({values, handleOnChange, handlePasswordScoreOnChange}) => {

    const renderInput = (name, label) => {
        return (
            <InputField 
                type = "password"
                name = {name}
                value = { values[name] }
                onChange = { handleOnChange }
                max = { 30 }
                placeholder = {label}
            />
        )
    }

    return (
        <div>
            { renderInput("oldPassword", "Old Password") }

            <Row>
                <Col sm={6}>
                    { renderInput("newPassword", "New Password") }
                    { 
                        values["passwordError"] && <span className = "error">{values["passwordError"]}</span>
                    }
                    {
                        values["newPassword"] && 
                        <PasswordStrength 
                            value = { values["newPassword"] } 
                            min = { 5 }
                            onChangeScore = {handlePasswordScoreOnChange}      
                        /> 
                    }
                </Col>
                <Col sm={6}>
                    { renderInput("confirmPassword", "Confirm Password") }
                    { 
                        values["confirmPasswordError"] && <span className = "error">{values["confirmPasswordError"]}</span>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default ChangePassword
