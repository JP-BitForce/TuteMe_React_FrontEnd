import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import Header from '../../components/Header/Header'
import CourseEnrolled from '../../components/Card/CourseEnrolled'
import Pagination from '../../components/Pagination/Paginator'
import EnrolledCourseFullPreview from './EnrolledCourseFullPreview'
import { getEnrolledCourses } from '../../api/course'

//Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import headerImg from '../../assets/images/Course/course.jpg'
import altImage from '../../assets/images/Course/alt.jpg'
import './Courses.css'

class MyCourses extends Component {
    state = {
        loading: false,
        searchValue: "",
        searchValueError: false,
        categoryChecked: [0],
        tutorChecked: [0],
        typeChecked: [0],
        allCoursecategories: [],
        slicedCourseCategories: [],
        allCourseInstructors: [],
        slicedCourseInstructors: [],
        allCourseType: [],
        slicedCourseType: [],
        total: 1,
        current: 1,
        coursesData:[],
        slicedCourseData: [],
        fetchError: null,
        courseSearched: false,
        searchFilterLoading: false,
        openCourseView: false,
        selectedCourse: null,
        joinId: "",
        joinIdValueError: null,
        joinLoading: false
    }

    componentDidMount() {
        this.getCoursesApi()
    }

    getCoursesApi = () => {
        const auth = this.props.auth
        this.setState({ loading: true })
        getEnrolledCourses(auth.accessToken, auth.userId).then(response => {
            this.setState({ 
                loading: false,
                total: this.getPage(response.enrolledCourses),
                current: 1,
                coursesData: response.enrolledCourses,
                fetchError: null,
                slicedCourseData: response.enrolledCourses.slice(0,10)
            })
        }).catch(err => {
            this.setState({ 
                loading: false,
                fetchError: err.message
            })
        })
    }

    handleJoin = () => {
        
    }

    handleSearchApi = () => {
        this.setState({ 
            searchValueError: false, 
            searchFilterLoading: true, 
            courseSearched: true  
        })
        const {searchValue, coursesData} = this.state
        const filterData = coursesData.filter(item => {
            let itemData = item.title.toLowerCase()
            return itemData.indexOf(searchValue.toLowerCase()) > -1
        })
        this.setState({
            total: this.getPage(filterData),
            current: 1,
            slicedCourseData: filterData,
        })
    }

    handleCourseSearch = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const {searchValue, courseSearched, coursesData} = this.state
        if (!courseSearched) {
            if (!searchValue) {
                this.setState({ searchValueError: true})
            } else {
                this.handleSearchApi()
            }
        } else {
            this.setState({ 
                searchValue: "",
                courseSearched: false,
                slicedCourseData: coursesData
            })
        }
    }

    handleCourseOnClick = (course) => {
        this.setState({
            openCourseView: true,
            selectedCourse: course
        })
    }

    handleCoursePreviewClose = () => {
        this.setState({
            openCourseView: false,
            selectedCourse: null
        })
    }

    getPage = (data) => {
        var page = 0;
        var mod = data.length % 10;
        if (mod > 0) {
            page = data.length / 10 - mod / 10 + 1;
        } else {
            page = data.length / 10;
        }
        return page;
    }

    handleInputOnChange = (event) => {
        const {value, name} = event.target
        this.setState({
            [name]: value,
            searchValueError: false
        })
    }

    handlePaginationOnChange = (event, page) => {
        const {coursesData} = this.state
        const start = (page-1)*10
        const end = page*10
        this.setState({
            current: page,
            slicedCourseData: coursesData.slice(start,end)
        })
    }

    renderListHead = () => {
        const {searchValue, searchValueError, courseSearched} = this.state
        return (
            <div className = "courses_list_head">
                <form noValidate autoComplete="off" onSubmit = {this.handleCourseSearch}>
                    <TextField
                        id="standard-basic" 
                        label="course" 
                        onChange = {this.handleInputOnChange} 
                        variant = "outlined"
                        error = {searchValueError}
                        value = {searchValue}
                        helperText = {searchValueError && "Incorrect entry"}
                        name = "searchValue"
                        size = "small"
                    />
                    <Button variant="contained" style = {{marginLeft: "5px"}} type = "submit">{courseSearched ? "Cancel" : "Search"}</Button>
                </form>
            </div>
        )
    }

    renderCourseCards = (item, index) => {
        return (
            <Grid item xs={6} sm={6} md={3} key = {index}>
                <div className = "course_enrolled_card" onClick = {() => this.handleCourseOnClick(item)}>
                    <CourseEnrolled src = {altImage} item = {item}/>
                </div>
            </Grid>
        )
    }

    renderCoursesConatiner = () => {
        const {loading, total, current, slicedCourseData} = this.state
        return (
            <div className = "my_courses__container">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={12}>
                        <div maxWidth="md" className = "course__list__root">
                        <div maxWidth="md">
                            { this.renderListHead() }
                        </div>
                            <Grid container spacing={4}>
                                { slicedCourseData.map((item, index) => this.renderCourseCards(item, index)) }
                            </Grid>
                        </div>
                        <div className = "pagination_div">
                            {
                                !loading &&
                                <Pagination 
                                    total = {total}
                                    current = {current}
                                    handleOnChange = {this.handlePaginationOnChange}
                                />
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }

    renderNoCoursesAvailable = () => {
        return (
            <div className = "no_courses_available_container">
                <span className = "no_courses_available">NO COURSES AVAILABLE</span>
            </div>
        )
    }

    render() {
        const {loading, coursesData, selectedCourse, openCourseView} = this.state
        return (
            <div className = "my_courses_root">
                <Header 
                    title = "EXPLORE COURSES" 
                    src = {headerImg}
                />
                {
                    loading ? <Loading open = {loading} />
                    :
                    coursesData.length === 0 ? this.renderNoCoursesAvailable()
                    :
                    this.renderCoursesConatiner()
                }
                {
                    selectedCourse &&
                    <EnrolledCourseFullPreview
                        open = {openCourseView}
                        course = {selectedCourse}
                        handleClose = {this.handleCoursePreviewClose}
                        values = {this.state}
                        handleInputOnChange = {this.handleInputOnChange}
                        handleJoin = {this.handleJoin}
                    />
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth.user
    }
}

export default connect(mapStateToProps)(MyCourses)