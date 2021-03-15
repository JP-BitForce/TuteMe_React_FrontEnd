import React, { Component } from 'react'

import InputField from '../../components/Input/InputField'
import TextArea from '../../components/Input/TextArea'
import Dropdown from '../../components/Input/Dropdown'

//Boostarp
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './Profile.css'

class EditInfo extends Component {

    renderTextArea = (name) => {
        return (
            <TextArea
                name = {name}
                value = { this.props.values[name] }
                onChange = { this.props.handleOnChange }
                placeholder = "About me"
                rows={3}
                max = { 250 }
            />
        )
    }

    renderInput = (type, name, max, label) => {
        return (
            <InputField 
                type = {type}
                name = {name}
                value = { this.props.values[name] }
                onChange = { this.props.handleOnChange }
                max = { max }
                placeholder = {label}
            />
        )
    }

    render() {
        return (
            <div className = "edit_form">
                <Row>
                    <Col sm={6}>
                        { this.renderInput("text", "firstName", 20, "First Name") }
                    </Col>
                    <Col sm={6}>
                        { this.renderInput("text", "lastName", 20, "Last Name") }
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                    { this.renderInput("email", "email", 20, "Email") }
                    </Col>
                    <Col sm={6}>
                    { this.renderInput("text", "dob", 20, "Date of Birth") }
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        { this.renderInput("text", "city", 20, "City") }
                    </Col>
                    <Col sm={6}>
                        { this.renderInput("text", "district", 20, "District") }
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Dropdown options = {this.props.values.genderOptions}/>
                    </Col>
                    <Col sm={6}>
                        <Dropdown options = {this.props.values.levelOptions}/>
                    </Col>
                </Row>

                { this.renderTextArea("Bio") }
            </div>
        )
    }
}


export default EditInfo