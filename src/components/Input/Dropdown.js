import React from 'react'

//Boostrap
import Form from "react-bootstrap/Form";

const Dropdown = ({options, onChange}) => {
    return (
        <Form.Group>
            <Form.Control as="select"  onChange={onChange}>
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
