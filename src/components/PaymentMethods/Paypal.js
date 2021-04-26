import React from 'react'

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import InputField from '../Input/InputField'

//Boostrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Paypal = ({values, handleInputOnChange, handleDateOnchange}) => {

    const fields = [
        {type: "text", name: "firstName", placeholder: "First name", max: 30},
        {type: "text", name: "lastName", placeholder: "Last name", max: 30},
        {type: "email", name: "email", placeholder: "Email", max: 320},
        {type: "text", name: "address", placeholder: "Address", max: 320},
        {type: "text", name: "city", placeholder: "City", max: 50},
        {type: "number", name: "mobile", placeholder: "Mobile", max: 10},
        {type: "number", name: "cardNo", placeholder: "Card number", max: 5},
        {type: "number", name: "zip", placeholder: "Zip", max: 5},
        {type: "number", name: "cvv", placeholder: "CVV", max: 4},
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
                <Col>
                    { renderInputField(fields[6]) }
                </Col>
                <Col>
                    <DatePicker
                        className = "date_picker__input"
                        selected = {values["exp"]}
                        onChange = {(date) => handleDateOnchange("exp", date)}
                        selectsStart
                        placeholderText = 'Expiry Date'
                        isClearable
                        defaultValue = {new Date()}
                        dateFormat = "MMMM d, yyyy"
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={15}
                        scrollableYearDropdown
                    />
                </Col>
            </Row>
            <Row>
                <Col> { renderInputField(fields[7]) } </Col>
                <Col> { renderInputField(fields[8]) } </Col>
            </Row>
        </div>
    )
}

export default Paypal
