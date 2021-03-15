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
        </Form.Group>
    )
}

export default TextArea
