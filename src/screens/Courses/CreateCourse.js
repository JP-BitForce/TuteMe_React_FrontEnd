import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'

import HeaderTopper from '../../components/Header/HeaderTopper'
import HeaderCard from '../../components/Header/HeaderCard'
import CustomButton from '../../components/Button/CustomButton'
import Dropdown from '../../components/Input/Dropdown'
import InputField from '../../components/Input/InputField'
import TextArea from '../../components/Input/TextArea'
import SnackBar from '../../components/SnackBar/SnackBar'
import {createNewCourse, getFilterCategories, getCourseByTutor, updateCourse, updateCourseWithoutFormData} from '../../api/course'

//Boostarp
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import InputGroup from 'react-bootstrap/InputGroup'
import Card from "react-bootstrap/Card"
import CardMedia from '@material-ui/core/CardMedia';

//Material-UI
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'

import Create from '@material-ui/icons/Create'
import MenuBook from '@material-ui/icons/MenuBook'

import upload from '../../assets/images/Blog/upload.svg'
import headerImg from '../../assets/images/Course/new.jpg'
import src from '../../assets/images/Course/alt.jpg'
import './Courses.css'

class CreateCourse extends Component {
    state = {
        childNav: ["Create Course", "Create"],
        tabValue: 0,
        validated: false,
        apiCalling: false,
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
        schedules: [],
        checked: [],
        day: "Monday",
        disableAdd: true,
        categoriesData: [],
        typesData: [],
        loading: false,
        updateFormValidated: false,
        tutorCourseData: null,
        updating: false,
        newName: "",
        newPrice: "",
        newDescription: "",
        newCategory: "",
        newType: "",
        newImgTitle: null,
        NewYears: 0,
        newMonth: 0,
        newDays: 0,
        newSchedules: [],
        newCover: null,
        newFile: null
    }
    inputFile = React.createRef()
    courseImgFile = React.createRef()
    TAB_LINKS = ["Create", "Course"]
    ICONS = {
        Create: <Create/>,
        Course: <MenuBook/>,
    }
    YEAR = [0, 1, 2]
    MONTH = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    DAYS = [0, 5, 10, 15, 20, 25, 30]
    WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    componentDidMount() {
        this.getCategoriesApi()
        this.getCourseByTutorApi()
    }

    getCategoriesApi = () => {
        const auth = this.props.auth
        this.setState({loading: true})
        getFilterCategories(auth.accessToken).then(response => {
            if (response) {
                this.setState({
                    categoriesData: response.courseCategoryList,
                    typesData: response.courseLevelList,
                    category: response.courseCategoryList[0],
                    type: response.courseLevelList[0],
                })
            }
        }).catch(err => {
            this.setState({
                fetchError: err.message,
            })
        })
    }

    getCourseByTutorApi = () => {
        const auth = this.props.auth
        getCourseByTutor(auth.accessToken, auth.profileId).then(response => {
            this.setState({ tutorCourseData: response, loading: false })
            this.setTutorCourseValues(response)
        }).catch(err=> {
            this.setState({ 
                fetchError: err.meesge, 
                loading: false, 
                tutorCourseData: null 
            })
        })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({ validated: !form.checkValidity() })
        const {name, description, price, category, type, file, years, month, days, schedules} = this.state
        if (name && description && price && file) {
            this.setState({ apiCalling : true })
            const auth = this.props.auth
            const course = { tutorId: auth.profileId, description, courseName: name, price, category, type, years, month, days, schedules}
            const formData = new FormData()
            const json = JSON.stringify(course)
            const blob = new Blob([json], {
                type: 'application/json'
            });
            formData.append("course", blob)
            formData.append("file", file)

            createNewCourse(auth.accessToken, formData).then(response => {
                this.setState({ tutorCourseData: response, apiCalling : false })
                this.setTutorCourseValues(response)
                this.setSnackBar("success", "new course created successfully")
            }).catch(err => {
                this.setState({ apiCalling : false })
                this.setSnackBar("error", "server error, please try again")
            })
        }
    }

    handleUpdateSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({ updateFormValidated: !form.checkValidity() })
        this.setState({ updating : true })
        const { newName, newPrice, newDescription, newCategory, newType, NewYears,
            newMonth, newDays, newSchedules, newFile, tutorCourseData, newCover
        } = this.state
        const auth = this.props.auth
        const course = { 
            courseId: tutorCourseData.id,
            tutorId: auth.profileId, 
            description: newDescription, 
            courseName: newName, 
            price: newPrice, 
            category: newCategory, 
            type: newType, 
            years: NewYears, 
            month: newMonth, 
            days: newDays, 
            schedules: newSchedules
        }
        if (newCover && newCover === this.getImageSource(tutorCourseData.courseImg)) {
            updateCourseWithoutFormData(auth.accessToken, course).then(response => {
                this.setState({ tutorCourseData: response, updating : false })
                this.setTutorCourseValues(response)
                this.setSnackBar("success", "course updated successfully")
            }).catch(err => {
                this.setState({ updating : false, tutorCourseData: null  })
                this.setSnackBar("error", "server error, please try again")
            })
        } else {
            const formData = new FormData()
            const json = JSON.stringify(course)
            const blob = new Blob([json], {
                type: 'application/json'
            });
            formData.append("course", blob)
            formData.append("file", newFile)
    
            updateCourse(auth.accessToken, formData).then(response => {
                this.setState({ tutorCourseData: response, updating : false })
                this.setTutorCourseValues(response)
                this.setSnackBar("success", "course updated successfully")
            }).catch(err => {
                this.setState({ updating : false, tutorCourseData: null  })
                this.setSnackBar("error", "server error, please try again")
            })
        }
    }

    checkChanges = () => {
        let changed = false
        const { newName, newPrice, newDescription, newCategory, newType, NewYears,
            newMonth, newDays, newSchedules, newCover, tutorCourseData
        } = this.state
        
        const {title, price, description, courseCategory, courseType, courseDuration, schedules, courseImg} = tutorCourseData

        if (newName !== title || newPrice !== price || newDescription !== description || newCategory !== courseCategory.category
            || newType !== courseType.title || NewYears !== courseDuration.year || newMonth !== courseDuration.month ||
            newDays !== courseDuration.days || newSchedules !== schedules
        ) {
            changed = true
        } else {
            changed = newCover && newCover !== this.getImageSource(courseImg)
        }
        return changed
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
        const {start, end} = this.state
        let disableAdd = true
        if (name === "start") {
            if (end) {
                disableAdd = false
            }
        } else {
            if (start) {
                disableAdd = false
            }
        }
        this.setState({ [name]: val, disableAdd })
    }

    handleAdd = () => {
        const {day, start, end, schedules} = this.state
        const newSchedule = { day, startTime: moment(start).format('hh:mm a'), endTime: moment(end).format('hh:mm a') } 
        schedules.push(newSchedule)
        this.setState({ schedules })
    }

    handleRemove = () => {
        const {schedules, checked} = this.state
        let newSchedule = schedules.filter(schedule => !checked.includes(schedule))
        this.setState({ schedules: newSchedule, checked: this.not(checked, schedules) })
    }

    handleToggle = (value) => () => {
        let checked = this.state.checked
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1)
        }
        this.setState({ checked: newChecked })
    }

    not = (a, b) => {
        return a.filter((value) => b.indexOf(value) === -1)
    }
    
    handleCoverPicOnSelect = (file, title) => {
        let reader = new FileReader()
        reader.onloadend = () => {
            if (title === "imgTitle") {
                this.setState({ cover: reader.result, file })
            } else {
                this.setState({ newCover: reader.result, newFile: file })
            }
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

    setTutorCourseValues = (data) => {
        this.setState({
            newName: data.title,
            newPrice: data.price,
            newDescription: data.description,
            newCategory: data.courseCategory.category,
            newType: data.courseType.title,
            NewYears: data.courseDuration.year,
            newMonth: data.courseDuration.month,
            newDays: data.courseDuration.days,
            newSchedules: data.schedules,
            newImgTitle: null,
            newCover: data.courseImg ? this.getImageSource(data.courseImg) : null
        })
    }

    getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
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

    coursePicOnClick = () => {
        this.courseImgFile.current.click()
    }

    coverPicOnChange = (e, title) => {
        const { files } = e.target;
        if (files && files.length) {
            this.handleCoverPicOnSelect(files[0], title)
        }
        this.setState({ [title]: files[0].name })
    }

    renderSubmitBtn = (label) => {
        return (
            <Row className = "submit_btn">
                <Col sm> 
                    <CustomButton type="submit" fullWidth label = {label} disabled = {label === "Update" && !this.checkChanges()}/>                     
                </Col>
            </Row>
        )
    }

    renderCanceltBtn = () => {
        const {tutorCourseData} = this.state
        return (
            <Row className = "submit_btn">
                <Col sm> 
                    <Button 
                        variant="outlined" 
                        fullWidth 
                        onClick = {() => this.setTutorCourseValues(tutorCourseData)}
                        disabled = {!this.checkChanges()}
                    >Cancel</Button>                    
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
                        onChange = {(e) => this.coverPicOnChange(e, "imgTitle")}
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

    renderPriceField = (name) => {
        return (
            <Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        type = "number"
                        name = {name}
                        value = {this.state[name]} 
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

    renderDatePicker = (name, placeholder) => {
        return  <DatePicker
                    className = "date_picker__input"
                    selected = {this.state[name]}
                    onChange = {(date) => this.handleDateOnchange(name, date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals = {30}
                    timeCaption = "Time"
                    dateFormat = "h:mm aa"
                    placeholderText = {placeholder}
                    isClearable
                />
    }

    renderSchedule = (schedules) => {
        const {day, checked, disableAdd} = this.state
        return (
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={5}>
                    <div className = "schedule_grid_item_1">
                        <Dropdown options = {this.WEEK} onChange = {this.handleInputOnChange} value = {day} name = "day"/>
                        <div className = "customDatePickerWidth">
                            { this.renderDatePicker("start", "Starts") }
                            { this.renderDatePicker("end", "Ends") }
                        </div> 
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                    <Grid container direction="column" alignItems="center">
                        <Button variant = "outlined" size = "small" onClick = {this.handleAdd} disabled = {disableAdd}> ≫ </Button>
                        <div className = "vertical_seperator"/>
                        <Button variant = "outlined" size ="small" onClick = {this.handleRemove} disabled = {checked.length === 0}> ≪ </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                    <Card className = "schedule_grid_item_2">
                        <List dense component="div" role="list">
                        {
                            schedules.map((value, idx) => {
                                const labelId = `transfer-list-all-item-${idx}-label`
                                const {day, startTime, endTime} = value
                                return (
                                    <ListItem key={idx} role="listitem" button onClick={this.handleToggle(value)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                checked = {checked.indexOf(value) !== -1}
                                                tabIndex = {-1}
                                                disableRipple
                                                inputProps = {{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText 
                                            id={labelId} 
                                            primary = {day} 
                                            secondary = {`${startTime} - ${endTime}`}
                                        />
                                    </ListItem>
                                )
                            })
                        }
                        </List>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    renderCourseFormContent = () => {
        const {categoriesData, typesData, schedules} = this.state
        return (
            <>
                <span className = "header_title_span text_left">Course Details</span>
                <Row>
                    <Col sm = {6}> { this.renderInputField("text", "name", "Course name", 50) } </Col>
                    <Col sm = {6}> { this.renderPriceField("price") } </Col>
                </Row>
                <Row>
                    <Col sm> { this.renderTextArea("description", "Description", 3, 320) } </Col>
                </Row>
                <Row>
                    <Col sm> { this.renderDropDown(categoriesData, "category", "Course category") } </Col>
                    <Col sm> { this.renderDropDown(typesData, "type", "Course type") } </Col>
                </Row>
                <span className = "header_title_span text_left">Course Duration</span>
                <Row>
                    <Col sm> { this.renderDropDown(this.YEAR, "year", "Year") } </Col>
                    <Col sm> { this.renderDropDown(this.MONTH, "month", "Month") } </Col>
                    <Col sm> { this.renderDropDown(this.DAYS, "days", "Days") } </Col>
                </Row>
                <span className = "header_title_span text_left">Course Schedule</span>
                { this.renderSchedule(schedules) }
            </>
        )
    }

    renderUpdateCourseForm = () => {
        const {updating, categoriesData, typesData, newSchedules, newCover} = this.state
        return (
            <>
                <span className = "header_title_span text_left">Course Details</span>
                <Row>
                    <Col sm = {6}>
                        <Card>
                            <input type = "file" autocomplete = "off" tabindex = "-1" style = {{display: 'none'}} 
                                ref = {this.courseImgFile}
                                onChange = {(e) => this.coverPicOnChange(e, "newImgTitle")}
                            />
                            <CardMedia image = { newCover ? newCover : src} title = "course"
                                className = "tutor_course_img_src"
                                onClick = {this.coursePicOnClick} 
                            />
                        </Card>
                    </Col>
                    <Col sm = {6}>
                        { this.renderInputField("text", "newName", "Course name", 50) } 
                        { this.renderPriceField("newPrice") }
                        { this.renderTextArea("newDescription", "Description", 3, 320) }
                    </Col>
                </Row>
                <Row>
                    <Col sm> { this.renderDropDown(categoriesData, "newCategory", "Course category") } </Col>
                    <Col sm> { this.renderDropDown(typesData, "newType", "Course type") } </Col>
                </Row>
                <span className = "header_title_span text_left">Course Duration</span>
                <Row>
                    <Col sm> { this.renderDropDown(this.YEAR, "newYear", "Year") } </Col>
                    <Col sm> { this.renderDropDown(this.MONTH, "newMonth", "Month") } </Col>
                    <Col sm> { this.renderDropDown(this.DAYS, "newDays", "Days") } </Col>
                </Row>
                <span className = "header_title_span text_left">Course Schedule</span>
                { this.renderSchedule(newSchedules) }
                { 
                    updating ? this.renderLoading() 
                    :
                    <Row>
                        <Col sm> { this.renderCanceltBtn() } </Col>
                        <Col sm> { this.renderSubmitBtn("Update") } </Col>
                    </Row>
                }
            </>
        )
    }

    renderNoCourseAvailable = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12}>
                    <div className = "no_courses_available_container">
                        <span className = "no_courses_available">NO COURSE AVAILABLE</span>
                    </div>
                </Grid>
            </Grid>
        )
    }

    renderUpdateForm = () => {
        const {updateFormValidated, tutorCourseData} = this.state
        return (
            <Form onSubmit = {this.handleUpdateSubmit} noValidate validated={updateFormValidated} className = "create_course_form">
                { tutorCourseData ? this.renderUpdateCourseForm() :  this.renderNoCourseAvailable() }
            </Form>
        )
    }

    renderCreateForm = () => {
        const {validated, apiCalling} = this.state
        return (
            <Form onSubmit={this.handleSubmit} noValidate validated={validated} className = "create_course_form">
                { this.renderCourseFormContent() }
                { this.renderImageSelector() }
                { apiCalling ? this.renderLoading() : this.renderSubmitBtn("Create New") }
            </Form>
        )
    } 

    renderMainContainer = () => {
        switch(this.state.tabValue) {
            case 0 : return this.renderCreateForm()
            case 1 : return this.renderUpdateForm()
            default : return this.renderCreateForm()
        }
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
                    { this.renderMainContainer() }
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