import React, { Component } from 'react'

import AppBar from '../../components/AppBar/AppBar'
import Footer from '../../components/Footer/Footer'
import InputField from '../../components/Input/InputField'
import TextArea from '../../components/Input/TextArea'
import CustomButton from '../../components/Button/CustomButton'
import SnackBar from '../../components/SnackBar/SnackBar'
import {sendMessage} from '../../api/landing'

//Boostrap
import Form from "react-bootstrap/Form"

//Material-UI
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

import './Links.css'

class Contact extends Component {
    state = {
        validated: false,
        name: "",
        email: "",
        message: "",
        snackBarOn: false,
        severity: "success",
        snackBarMessage: "",
        sendLoading: false
    }

    detail = [
        {id: "1", title: "Address", value: "University of Kelaniya, Sri Lanka 11600"},
        {id: "2", title: "Contact No", value: "0771234567"},
        {id: "3", title: "Email", value: "hello.tuteme@gmail.com"},
        {id: "4", title: "Website", value: "WWW.Example.lk"}
    ]

    handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        this.setState({ validated: !form.checkValidity() })

        const {name, email, message} = this.state
        if (name && email && message) {
            const body = {name, email, message}
            this.setState({ sendLoading: true })
            sendMessage(body).then(response => {
                this.setState({
                    name: "",
                    email: "",
                    message: "",
                    snackBarOn: true,
                    severity: "success",
                    snackBarMessage: response.message,
                    sendLoading: false
                })
            }).catch(err => {
                this.setState({
                    snackBarOn: true,
                    severity: "error",
                    snackBarMessage: "server error, please try again later",
                    sendLoading: false
                })
            })
        }
    }

    handleSnackBarClose = () => {
        this.setState({
            snackBarOn: false,
            severity: "",
            snackBarMessage: "",
        })
    }

    renderLoading = () => {
        return (
            <div className = "loading_div">
                <CircularProgress/>
            </div>
        )
    }

    handleInputOnChange = (event) => {
        const {value, name} = event.target
        this.setState({ [name]: value})
    }

    renderDetailContent = () => {
        return (
            <Grid container spacing={4}>
                {
                    this.detail.map(item => {
                        const {id, title, value} = item
                        return (
                            <Grid item xs={12} sm={12} md={6}>
                                <div className = "contact_detail_card" key = {id}>
                                    <h4>{title}</h4>
                                    <span>{value}</span>
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }

    renderFormContent = () => {
        const {validated, name, email, message, sendLoading} = this.state
        return (
            <div className = "contact_form_root">
                <Form
                    onSubmit={this.handleSubmit}
                    noValidate
                    validated={validated}
                    style = {{textAlign: "left"}}
                >
                <InputField
                    type = "text"
                    name = "name"
                    value = {name}
                    onChange = {this.handleInputOnChange}
                    max = {50}
                    placeholder = "Name"
                />
                <InputField
                    type = "email"
                    name = "email"
                    value = {email}
                    onChange = {this.handleInputOnChange}
                    max = {320}
                    placeholder = "Email"
                />
                <TextArea
                    name = "message"
                    value = {message}
                    onChange = {this.handleInputOnChange}
                    placeholder = "Your message"
                    rows = {4}
                />
                {
                    sendLoading ? this.renderLoading() : <CustomButton label = "Sumbit" fullWidth type = "submit"/>
                }
                </Form>
            </div>
        )
    }

    renderContent = () => {
        return (
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6}>
                    { this.renderDetailContent() }
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    { this.renderFormContent() }
                </Grid>
            </Grid>
        )
    }

    renderContactListHead = () => {
        return (
            <div className = "row">
                <div class="col">
                    <div class="section_title text-center">
                        <h1>Contact us</h1>
                    </div>
                </div>
            </div>
        )
    }

    renderMainContent = () => {
        return (
            <div className = "contact_main_root">
                { this.renderContactListHead() }
                { this.renderContent() }
            </div>
        )
    } 

    renderTopContent = () => {
        return (
            <div className = "contact_content_top_root">
                <div className = "content_top__container">
                    <div className = "col-lg__1">
                        <div className = "content_top_block">
                            <h1 class="mb-4">Get in touch</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderMainContainer = () => {
        return (
            <div>
                { this.renderTopContent() }
                { this.renderMainContent() }
            </div>
        )
    }

    render() {
        const history = this.props.history
        const {snackBarOn, snackBarMessage, severity} = this.state
        return (
            <div>
                <AppBar history = {history}/>
                { this.renderMainContainer() }
                <Footer history = {history}/>
                <SnackBar
                    open = {snackBarOn}
                    autoHideDuration = {3000}
                    message = {snackBarMessage}
                    severity = {severity}
                    handleClose = {this.handleSnackBarClose}
                    align = {{ vertical: 'top', horizontal: 'right' }}
                />
            </div>
        )
    }
}

export default Contact
