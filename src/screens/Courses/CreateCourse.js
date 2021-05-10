import React, { Component } from 'react'
import {connect} from 'react-redux'

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import HeaderTopper from '../../components/Header/HeaderTopper'
import HeaderCard from '../../components/Header/HeaderCard'
import CustomButton from '../../components/Button/CustomButton'
import Dropdown from '../../components/Input/Dropdown'
import InputField from '../../components/Input/InputField'
import TextArea from '../../components/Input/TextArea'
import SnackBar from '../../components/SnackBar/SnackBar'
import {createNewCourse} from '../../api/course'

//Boostarp
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup'

//Material-UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

import Create from '@material-ui/icons/Create';
import Update from '@material-ui/icons/Update';

import upload from '../../assets/images/Blog/upload.svg'
import headerImg from '../../assets/images/Course/new.jpg'
import './Courses.css'

class CreateCourse extends Component {
    state = {
        childNav: ["Create Course", "Create"],
        tabValue: 0,
        validated: false,
        apiCalling: false,
        id: "",
        fullName: "",
        email: "",
        name: "",
        description: "",
        price: "",
        category: "",
        type: "",
        imgTitle: null,
        file: null,
        cover: null,
        years: 0,
        month: 0,
        days: 0,
        snackBarOn: false,
        severity: "success",
        snackBarMessage: "",
        start: null,
        end: null,
        schedules: []
    }

    inputFile = React.createRef()

    TAB_LINKS = ["Create", "Update"]

    ICONS = {
        Create: <Create/>,
        Update: <Update/>,
    }

    YEAR = [0, 1, 2]
    MONTH = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    DAYS = [0, 5, 10, 15, 20, 25, 30]
    WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({ validated: !form.checkValidity() })
        const {id, fullName, email, name, description, price, category, type, file, years, month, days} = this.state
        if (id && email && name && description && price && file) {
            this.setState({ apiCalling : true })
            const auth = this.props.auth
            const course = { id, fullName, description, email, name, price, category, type, years, month, days }
            const formData = new FormData()
            const json = JSON.stringify(course)
            const blob = new Blob([json], {
                type: 'application/json'
            });
            formData.append("course", blob)
            formData.append("file", file)

            createNewCourse(auth.accessToken, formData).then(response => {
                this.setState({ apiCalling : false })
                this.setSnackBar("success", response.message)
            }).catch(err => {
                this.setState({ apiCalling : false })
                this.setSnackBar("success", err.message)
            })
        }
    }

    handleTabChange = (newValue) => {
        const childNav = ["Create Course"]
        if (newValue === 0) {
            childNav.push("Create")
        } else {
            childNav.push("Update")
        }
        this.setState({ tabValue: newValue, childNav })
    }

    handleInputOnChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleDateOnchange = (name, val) => {
        this.setState({ [name]: val })
    }

    handleAdd = () => {

    }

    handleRemove = () => {

    }
    
    handleCoverPicOnSelect = (file) => {
        let reader = new FileReader()
        reader.onloadend = () => {
            this.setState({ 
                cover: reader.result,
                file 
            });
        }
        reader.readAsDataURL(file)
    }

    handleSnackBarClose = () => {
        this.setState({ 
            snackBarOn: false,
            snackBarMessage: "",
            severity: ""
        })
    }

    setSnackBar = (severity, snackBarMessage) => {
        this.setState({
            snackBarOn: true,
            severity,
            snackBarMessage
        })
    }

    removeImageOnClick = () => {
        this.setState({ 
            imgTitle: null,
            cover: null,
            file : null
        })
    }

    coverePicOnClick = () => {
        this.inputFile.current.click()
    }

    coverPicOnChange = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            this.handleCoverPicOnSelect(files[0])
        }
        this.setState({ imgTitle: files[0].name })
    }

    renderSubmitBtn = () => {
        return (
            <Row className = "submit_btn">
                <Col sm> 
                    <CustomButton type="submit" fullWidth label = "Create New"/>                     
                </Col>
            </Row>
        )
    }

    renderLoading = () => {
        return (
            <div className = "loading_div">
                <CircularProgress/>
            </div>
        )
    }

    renderImageSelector = () => {
        const {imgTitle} = this.state
        return (
            <div className = "blog_cover_root">
                <span className = "header_title_span text_left">Course Cover Image</span>
                <div className = "blog_cover">
                    <input 
                        type = "file" 
                        autocomplete = "off" 
                        tabindex = "-1" 
                        style = {{display: 'none'}} 
                        ref = {this.inputFile}
                        onChange = {this.coverPicOnChange}
                    />
                    <img src = {upload} alt = "" className = "upload_img_src" onClick = {this.coverePicOnClick}/>
                    <div className = "blog_cover_text">
                        <h5>Drop or Select file</h5>
                        <p>
                            {
                                imgTitle ? 
                                <div>
                                    selected image: {imgTitle}
                                    <Button variant="outlined" size="small" onClick = {this.removeImageOnClick}>remove</Button>
                                </div>
                                :
                                "Choose you cover picture for your course"
                            }
                            
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    renderPriceField = () => {
        return (
            <Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        type = "number"
                        name = "price"
                        value = {this.state.price} 
                        onChange = {this.handleInputOnChange}
                        required
                        maxLength = {5}
                        placeholder = "Price(LKR)"
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        )
    }

    renderInputField = (type, name, placeholder, max) => {
        return (
            <InputField
                type = {type}
                name = {name}
                value = {this.state[name]}
                onChange = {this.handleInputOnChange}
                max = {max}
                placeholder = {placeholder}
            />
        )
    }

    renderDropDown = (options, name, label) => {
        return (
        <>
            <Form.Label className = "header_title_span text_left_label">{label}</Form.Label>
            <Dropdown
                options = {options}
                onChange = {this.handleInputOnChange}
                value = {this.state[name]}
                name = {name}
            />
        </>
        )
    }

    renderTextArea = (name, placeholder, rows, max) => {
        return (
            <TextArea
                name = {name}
                value = {this.state[name]}
                onChange = {this.handleInputOnChange}
                placeholder = {placeholder}
                rows = {rows}
                max = {max}
            />
        )
    }

    renderDatePicker = (value, placeholder) => {
        return  <DatePicker
                    className = "date_picker__input"
                    selected = {value}
                    onChange = {(date) => this.handleDateOnchange(value, date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals = {30}
                    timeCaption = "Time"
                    dateFormat = "h:mm aa"
                    placeholderText = {placeholder}
                />
    }

    renderSchedule = () => {
        return (
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item>
                    <Paper style = {{padding: "2%", alignItems: "center", justifyContent: "center"}}>
                        <Row>
                            <Col sm> 
                                <Dropdown 
                                    options = {this.WEEK} 
                                    onChange = {this.handleInputOnChange} 
                                    value = {this.state["day"]} 
                                    name = "day"
                                /> 
                            </Col>
                            <Col sm> { this.renderDatePicker(this.state["start"], "Starts") } </Col>
                            <Col sm> { this.renderDatePicker(this.state["end"], "Ends") } </Col>
                        </Row>
                    </Paper>
                </Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button variant = "outlined" size = "small" onClick = {this.handleAdd}> ≫ </Button>
                        <div className = "vertical_seperator"/>
                        <Button variant = "outlined" size ="small" onClick = {this.handleRemove}> ≪ </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Paper>
                        <List dense component="div" role="list">

                        </List>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    renderTutorFormContent = () => {
        return (
            <>
                <span className = "header_title_span text_left">Tutor Details</span>
                <Row>
                    <Col sm = {6}> { this.renderInputField("text", "id", "Your ID", 10) } </Col>
                    <Col sm = {6}> { this.renderInputField("text", "fullName", "Full name", 50) } </Col>
                </Row>
                <Row>
                    <Col sm> { this.renderInputField("email", "email", "Your Email", 320) } </Col>
                </Row>
            </>
        )
    }

    renderCourseFormContent = () => {
        return (
            <>
                <span className = "header_title_span text_left">Course Details</span>
                <Row>
                    <Col sm = {6}> { this.renderInputField("text", "name", "Course name", 10) } </Col>
                    <Col sm = {6}> { this.renderPriceField() } </Col>
                </Row>
                <Row>
                    <Col sm> { this.renderTextArea("description", "Description", 3, 320) } </Col>
                </Row>
                <Row>
                    <Col sm> { this.renderDropDown([], "category", "Course category") } </Col>
                    <Col sm> { this.renderDropDown([], "type", "Course type") } </Col>
                </Row>
                <span className = "header_title_span text_left">Course Duration</span>
                <Row>
                    <Col sm> { this.renderDropDown(this.YEAR, "year", "Year") } </Col>
                    <Col sm> { this.renderDropDown(this.MONTH, "month", "Month") } </Col>
                    <Col sm> { this.renderDropDown(this.DAYS, "days", "Days") } </Col>
                </Row>
                <span className = "header_title_span text_left">Course Schedule</span>
                { this.renderSchedule() }
            </>
        )
    }

    renderForm = () => {
        const {validated, apiCalling} = this.state
        return (
            <Form onSubmit={this.handleSubmit} noValidate validated={validated} className = "create_course_form">
                { this.renderTutorFormContent() }
                { this.renderCourseFormContent() }
                { this.renderImageSelector() }
                { apiCalling ? this.renderLoading() : this.renderSubmitBtn() }
            </Form>
        )
    } 

    render() {
        const {childNav, tabValue, snackBarOn, snackBarMessage, severity} = this.state
        return (
            <div className = "create_course_root">
                <HeaderTopper screen = "Create Course" rootNav = "Pages" childNav = {childNav} />
                <div className = "create_course_root_head">
                    <HeaderCard
                        tabs = {this.TAB_LINKS}
                        src = {headerImg}
                        icons = {this.ICONS}
                        tabValue = {tabValue}
                        handleTabChange = {this.handleTabChange}
                    />
                </div>
                <Container>
                    { this.renderForm() }
                </Container>
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user
    }
}

export default connect(mapStateToProps)(CreateCourse)