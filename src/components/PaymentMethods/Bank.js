import React from 'react'

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

//Boostrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

//Material-UI
import Divider from "@material-ui/core/Divider"

const Bank = ({values, handleInputOnChange, handleFileOnChange, handleDateOnchange}) => {

    const picOnChange = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            handleFileOnChange(files[0])
        }
    }

    const renderInputField = (type, name, placeholder, max) => {
        return (
            <Form.Control 
                type = {type}
                name = {name}
                value = {values[name]}
                placeholder = {placeholder}
                onChange = {handleInputOnChange}
                max = {max} 
            />
        )
    }

    const renderDatePicker = () => {
        return (
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
        )
    }

    return (
        <div>
            <Divider/>
            <h5 style = {{textAlign:"left", textTransform: "uppercase", marginTop: "2%", marginBottom: "2%"}}>Bank</h5>
            <div className = "en_course_prev_main_content_cal_item">
                <span>Bank: Peoples Bank</span>
                <span>Acc no: 1234567854566</span>
            </div>
            <Row>
                <Col> { renderInputField("text", "firstName", "First name", 30) } </Col>
                <Col> { renderInputField("text", "lastName", "Last name", 30) } </Col>
            </Row>
            <Row>
                <Col> { renderInputField("email", "email", "Email", 320) } </Col>
            </Row>
            <div style = {{marginTop: "4%", display: "flex", alignItems: "center"}}>
                <span style = {{marginRight: "2%"}}>Deposited Date</span>
                { renderDatePicker() }
            </div>
            <div style = {{marginTop: "4%", display: "flex", alignItems: "center"}}>
                <span style = {{marginRight: "2%"}}>Provide scanned copy of bank slip here : </span>
                <input type = 'file' id = 'file' onChange = {picOnChange} />
            </div>
        </div>
    )
}

export default Bank
