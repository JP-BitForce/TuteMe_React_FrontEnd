import React from 'react'

//Boostrap
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PasswordStrengthBar from 'react-password-strength-bar';

const PasswordStrength = ({value, min}) => {
    return (
        <div style = {{marginBottom:"2%"}}>
            <PasswordStrengthBar 
                password={value} 
                minLength={min}
                onChangeScore={score => {
                    console.log(score);
                }}
            />
        </div>
    )
}

export default PasswordStrength
