import React from 'react'

//Boostrap
import Form from "react-bootstrap/Form";

const Dropdown = ({options, onChange, value, name}) => {
    return (
        <Form.Group>
            <Form.Control as="select"  onChange={onChange} defaultValue = {value} name = {name}>
                {
                    options.map(item => {
                        return (
                            <option>{item}</option>
                        )
                    })
                }
            </Form.Control>
        </Form.Group>
    )
}

export default Dropdown
