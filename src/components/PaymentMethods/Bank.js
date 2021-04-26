import React from 'react'

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import InputField from '../Input/InputField'

//Boostrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Bank = ({values, handleInputOnChange, handleFileOnChange, handleDateOnchange}) => {

    const picOnChange = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            handleFileOnChange(files[0])
        }
    }

    const renderInputField = (type, name, placeholder, max) => {
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
                <Col> <span>Bank: Peoples Bank</span> </Col>
                <Col> <span>Acc no: 1234567854566</span> </Col>
            </Row>
            <Row>
                <Col> 
                    { renderInputField("text", "firstName", "First name", 30) } 
                </Col>
                <Col> 
                    { renderInputField("text", "lastName", "Last name", 30) } 
                </Col>
            </Row>
            <Row>
                <Col> 
                    { renderInputField("email", "email", "Email", 320) } 
                </Col>
            </Row>
            <Row>
                <Col>
                    <span>Deposited Date: </span>
                    <DatePicker
                        className = "date_picker__input"
                        selected = {values["depositedAt"]}
                        onChange = {(date) => handleDateOnchange("depositedAt", date)}
                        selectsStart
                        placeholderText = 'Deposited Date'
                        isClearable
                        defaultValue = {new Date()}
                        showTimeSelect
                        timeFormat = "HH:mm"
                        timeIntervals = {15}
                        timeCaption = "time"
                        dateFormat = "MMMM d, yyyy h:mm aa"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        <span>Provide scanned copy of bank slip here : </span>
                        <input 
                            type = 'file' 
                            id = 'file' 
                            onChange = {picOnChange}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Bank
