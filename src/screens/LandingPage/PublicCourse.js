import React, { Component } from 'react'

import AppBar from '../../components/AppBar/AppBar'
import Footer from '../../components/Footer/Footer'
import Loading from '../../components/Loading/Loading'
import ReadOnlyRating from '../../components/Rating/ReadOnlyRating'
import Pagination from '../../components/Pagination/Paginator'
import {getCourses, searchCourseByValue} from '../../api/landing'

//Material-UI
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import src from '../../assets/images/Course/alt.jpg'
import './Links.css'

class PublicCourse extends Component {
    state = {
        loading: false,
        courseData: [],
        total: 0,
        current: 0,
        fetchError: null,
        searchValueError: null, 
        searchValue: "", 
        searchCourse: false,
        searchLoading: false
    }

    componentDidMount() {
        this.getCoursesApi(0)
    }

    getCoursesApi = (page) => {
        this.setState({ loading: true })
        getCourses(page).then(response => {
            this.setState({
                loading: false,
                courseData: response.data,
                total: response.total,
                current: response.current+1,
                fetchError: null,
            })
        }).catch(err => {
            this.setState({
                fetchError: "server error, please try again later",
                loading: false,
                courseData: []
            })
        })
    }

    searchCourseByValueApi = (page) => {
        this.setState({ searchLoading: true })
        searchCourseByValue(page, this.state.searchValue).then(response=> {
            this.setState({
                searchLoading: false,
                courseData: response.data,
                total: response.total,
                current: response.current+1,
                fetchError: null,
                searchCourse: true
            })
        }).catch(err => {
            this.setState({
                fetchError: "server error, please try again later",
                searchLoading: false,
                courseData: [],
                searchCourse: true
            })
        })
    }

    handleCourseSearch = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const {searchValue, searchCourse} = this.state
        if (!searchCourse) {
            if (!searchValue) {
                this.setState({ searchValueError: true })
            } else {
                this.searchCourseByValueApi(0)
                this.setState({ searchValueError: false })
            }
        } else {
            this.setState({ searchValue: "", searchCourse: false})
            this.getCoursesApi(0)
        }
    }

    handleInputOnChange = (event) => {
        const {value, name} = event.target
        this.setState({
            [name]: value,
            searchValueError: false,
            emptyError: null
        })
    }

    getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    getDuration = (duration) => {
        if (duration) {
            if (duration.year !== 0) {
                return `${duration.year} year(s), ${duration.month} month(s), ${duration.days} day(s)`
            } else {
                return  `${duration.month} month(s), ${duration.days} day(s)`
            }
        } else {
            return "Duration: Unknown"
        }
    }

    handlePagination = (event, page) => {
        if (!this.state.searchCourse) {
            this.searchCourseByValueApi(page-1)
        } else {
            this.getCoursesApi(page-1)
        }
    }

    renderCourseCard = (item) => {
        const {id, title, description, courseImg, price, courseCategory, courseType, courseDuration, tutor, rating} = item
        return (
            <Grid item xs={6} sm={6} md={3} key = {id}>
                <div className = "public_card_item">
                    <Grid conatiner>
                        <Grid item xs={12} sm={12} md={12}>
                            <div className = "course_thumnail">
                                <img src = {courseImg? this.getImageSource(courseImg) : src} alt = {title} className = "course_thumnail_img"/>
                                <div className = "course_price">Rs.{price}</div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <div className = "course_enrolled_content">
                                <div className = "course_meta">
                                    <span>{ this.getDuration(courseDuration) }</span>
                                    <span>by {tutor}</span>
                                </div>
                                <Divider/>
                                <h5>{title}</h5>
                                <h6>{description.slice(0, 100)}...</h6>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <ReadOnlyRating rate = {rating}/>
                                    </Grid>
                                </Grid>
                                <div className = "course_card__meta">
                                    <span>Type: {courseType.title}</span>
                                    <span>Category: {courseCategory.category}</span>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        )
    }

    renderCourseList = () => {
        const {courseData} = this.state
        return (
            <Grid container spacing={4}>
                { courseData.map(item => this.renderCourseCard(item)) }
            </Grid>
        )
    }

    renderCourseListHead = () => {
        return (
            <div className = "row">
                <div class="col">
                    <div class="section_title text-center">
                        <h1>Popular Courses</h1>
                    </div>
                </div>
            </div>
        )
    }

    renderCourseSearch = () => {
        const {searchValueError, searchValue, searchCourse} = this.state
        return (
            <div className = "courses_list_head">
                <form noValidate autoComplete="off" onSubmit = {this.handleCourseSearch}>
                    <TextField 
                        id = "standard-basic" 
                        label = "course" 
                        onChange = {this.handleInputOnChange}
                        variant = "outlined"
                        error = {searchValueError}
                        value = {searchValue}
                        helperText = {searchValueError && "Incorrect entry"}
                        name = "searchValue"
                        size = "small"
                    />
                    <Button variant="contained" style = {{marginLeft: "5px"}} type = "submit">{searchCourse ? "Cancel": "Search"}</Button>
                </form>
            </div>
        )
    }

    renderPagination = () => {
        const {total, current, courseData} = this.state
        return (
            <div className = "pagination_div">
                {
                    courseData.length > 0 &&
                    <Pagination
                        total = {total}
                        current = {current}
                        handleOnChange = {this.handlePagination}
                    />
                }
            </div>
        )
    }

    renderNoCoursesAvailable = () => {
        return (
            <Grid item xs={12} sm={12} md={12}>
                <div className = "no_courses_available_container">
                    <span className = "no_courses_available">NO COURSES FOUND</span>
                </div>
            </Grid>
        )
    }

    renderMainContent = () => {
        const {courseData, searchLoading} = this.state
        return (
            <div className = "public_course_main_root">
                { this.renderCourseListHead() }
                { this.renderCourseSearch() }
                { 
                    searchLoading ? <CircularProgress/> 
                    :
                    courseData.length > 0 ? this.renderCourseList() 
                    :
                    this.renderNoCoursesAvailable()
                }
                { this.renderPagination() }
            </div>
        )
    }

    renderTopContent = () => {
        return (
            <div className = "public_course_content_top_root">
                <div className = "content_top__container">
                    <div className = "col-lg__1">
                        <div className = "content_top_block">
                            <h1 class="mb-4">Explore our online courses</h1>
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
        const {loading} = this.state
        return (
            <div>
                <AppBar history = {history}/>
                { 
                    loading ? <Loading open = {loading}/> : this.renderMainContainer() 
                }
                <Footer history = {history}/>
            </div>
        )
    }
}

export default PublicCourse