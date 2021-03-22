import React from 'react'

//Boostarp
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const InputGroupSearch = ({name, value, onChange, max, placeholder,onClick}) => {
    return (
        <InputGroup className="mb-3">
            <Form.Control
                name = {name}
                value = {value} 
                onChange = {onChange}
                required
                maxLength = {max}
                placeholder = {placeholder}
            />
            <InputGroup.Append>
                <Button 
                    onClick = {onClick}
                    style = {{backgroundImage : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"}}
                >Search</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default InputGroupSearch
