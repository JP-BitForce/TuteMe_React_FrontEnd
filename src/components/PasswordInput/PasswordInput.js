import React from 'react'

//Boostrap
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import visibility_off from '../../assets/images/visibility_off.png'
import visibility from '../../assets/images/visibility.png'

const PasswordInput = ({type, name, value, onChange, max, placeholder, onClick}) => {
    return (
        <Form.Group as = {Row}>
            <Col>
                <InputGroup>
                    <Form.Control
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        required
                        maxLength={max}
                        placeholder = {placeholder}
                    />

                    <InputGroup.Append onClick={onClick}>
                        <InputGroup.Text className="password-toggle__span">
                            {
                                type === "password" ? <img src={visibility} className = "fa-eye-slash"/> : 
                                <img src={visibility_off} className = "fa-eye"/>
                            }
                        </InputGroup.Text>
                    </InputGroup.Append>

                    <Form.Control.Feedback type="invalid">
                        {placeholder} can't be empty
                    </Form.Control.Feedback>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}

export default PasswordInput
