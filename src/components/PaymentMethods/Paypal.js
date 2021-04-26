import React from 'react'

import InputField from '../Input/InputField'

//Boostrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Paypal = ({values, handleInputOnChange}) => {

    const fields = [
        {type: "text", name: "firstName", placeholder: "First name", max: 30},
        {type: "text", name: "lastName", placeholder: "Last name", max: 30},
        {type: "email", name: "email", placeholder: "Email", max: 320},
        {type: "text", name: "address", placeholder: "Address", max: 320},
        {type: "text", name: "city", placeholder: "City", max: 50},
        {type: "number", name: "mobile", placeholder: "Mobile", max: 10},
        {type: "number", name: "zip", placeholder: "Zip", max: 5},
        {type: "number", name: "cvv", placeholder: "Cvv", max: 4},
    ]

    const renderInputField = (item) => {
        const {type, name, placeholder, max} = item
        return (
            <InputField
                type = {type}
                name = {name}
                value = {values[name]}
                placeholder = {placeholder}
                onChange = {handleInputOnChange}
                max = {max}
            />
        )
    }

    return (
        <div>
            <Row>
                <Col> { renderInputField(fields[0]) } </Col>
                <Col> { renderInputField(fields[1]) } </Col>
            </Row>
            {
                fields.slice(2,6).map(item => renderInputField(item) )
            }
            <Row>
                <Col> { renderInputField(fields[6]) } </Col>
                <Col> { renderInputField(fields[7]) } </Col>
            </Row>
        </div>
    )
}

export default Paypal
