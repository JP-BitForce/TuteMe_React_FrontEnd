import React from 'react'

//Boostrap
import Form from "react-bootstrap/Form";

const InputField = ({type, name, value, onChange, max, placeholder}) => {
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

export default InputField
