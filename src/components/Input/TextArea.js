import React from 'react'

//Boostrap
import Form from "react-bootstrap/Form";

const TextArea = ({name, value, onChange, placeholder, rows, max}) => {
    return (
        <Form.Group>
            <Form.Control 
                as="textarea" 
                rows={rows}
                name = {name}
                value = {value} 
                onChange = {onChange}
                required
                maxLength = {max}
                placeholder = {placeholder} 
            />
            <Form.Control.Feedback type="invalid">
                {placeholder} can't be empty
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default TextArea
