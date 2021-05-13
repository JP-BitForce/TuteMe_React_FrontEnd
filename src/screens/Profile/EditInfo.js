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

    renderTutorForm = () => {
        const {genderOptions, gender} = this.props.values
        return (
            <>
                <Row>
                    <Col sm={6}>{ this.renderInput("text", "firstName", 50, "First Name") }</Col>
                    <Col sm={6}>{ this.renderInput("text", "lastName", 50, "Last Name") }</Col>
                </Row>
                <Row>
                    <Col sm={6}>{ this.renderInput("email", "email", 320, "Email") }</Col>
                    <Col sm={6}>
                        <Dropdown options = {genderOptions} value = {gender} onChange = {this.props.handleOnChange} name = "gender"/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>{ this.renderInput("text", "city", 20, "City") }</Col>
                    <Col sm={6}>{ this.renderInput("text", "district", 20, "District") }</Col>
                </Row>
                { this.renderTextArea("bio") }
                <Row>
                    <Col sm={6}>{ this.renderInput("text", "facebook", 320, "Facebook") }</Col>
                    <Col sm={6}>{ this.renderInput("text", "twitter", 320, "Twitter") }</Col>
                </Row>
                <Row>
                    <Col sm={6}>{ this.renderInput("text", "instagram", 320, "Instagram") }</Col>
                    <Col sm={6}>{ this.renderInput("text", "linkedIn", 320, "LinkedIn") }</Col>
                </Row>
            </>
        )
    }

    renderStudentForm = () => {
        const {genderOptions, levelOptions, gender, level} = this.props.values
        return (
            <>
                <Row>
                    <Col sm={6}>{ this.renderInput("text", "firstName", 50, "First Name") }</Col>
                    <Col sm={6}>{ this.renderInput("text", "lastName", 50, "Last Name") }</Col>
                </Row>
                <Row>
                    <Col sm={6}>{ this.renderInput("email", "email", 320, "Email") }</Col>
                    <Col sm={6}>{ this.renderInput("text", "dob", 20, "Date of Birth") }</Col>
                </Row>
                <Row>
                    <Col sm={6}>{ this.renderInput("text", "city", 20, "City") }</Col>
                    <Col sm={6}>{ this.renderInput("text", "district", 20, "District") }</Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Dropdown options = {genderOptions} value = {gender} onChange = {this.props.handleOnChange} name = "gender"/>
                    </Col>
                    <Col sm={6}>
                        <Dropdown options = {levelOptions} value = {level} onChange = {this.props.handleOnChange} name = "level"/>
                    </Col>
                </Row>

                { this.renderTextArea("bio") }
            </>
        )
    }

    render() {
        return (
            <div className = "edit_form">
                {
                    this.props.values["role"] === "ROLE_STUDENT" ? this.renderStudentForm() : this.renderTutorForm()
                }
            </div>
        )
    }
}


export default EditInfo