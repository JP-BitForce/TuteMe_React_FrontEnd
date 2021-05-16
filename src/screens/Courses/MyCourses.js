import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import Header from '../../components/Header/Header'
import CourseEnrolled from '../../components/Card/CourseEnrolled'
import Pagination from '../../components/Pagination/Paginator'
import EnrolledCourseFullPreview from './EnrolledCourseFullPreview'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import { getEnrolledCourses, getFilterCategories, filterEnrolledCourses, searchEnrolledCourses } from '../../api/course'
import {startLesson} from '../../api/lesson'

//Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        fetchError: null,
        courseSearched: false,
        searchFilterLoading: false,
        openCourseView: false,
        selectedCourse: null,
        joinId: "",
        joinIdValueError: null,
        joinLoading: false,
        filterCourse: false,
        btnDisabled: true,
        joinError: null
    }

    componentDidMount() {
        this.getCoursesApi(0)
        this.getCategoriesApi()
    }

    getCoursesApi = (page) => {
        const auth = this.props.auth
        this.setState({ loading: true })
        getEnrolledCourses(auth.accessToken, auth.userId, page).then(response => {
            this.setState({ 
                loading: false,
                total: response.total,
                current: response.current+1,
                coursesData: response.enrolledCourses,
                fetchError: null,
                btnDisabled: response.enrolledCourses.length === 0
            })
        }).catch(err => {
            this.setState({ 
                loading: false,
                fetchError: err.message
            })
        })
    }

    getCategoriesApi = () => {
        const auth = this.props.auth
        getFilterCategories(auth.accessToken).then(response => {
            this.setState({
                slicedCourseCategories: response.courseCategoryList.slice(0,5),
                slicedCourseInstructors: response.tutorList.slice(0,5),
                slicedCourseType: response.courseLevelList.slice(0,5),
                allCoursecategories: response.courseCategoryList,
                allCourseInstructors: response.tutorList,
                allCourseType: response.courseLevelList,
            })
        }).catch(err => {
            this.setState({
                fetchError: err.message
            })
        })
    }

    handleFilterApi = (page, list) => {
        if(!this.state.filterCourse) {
            const auth = this.props.auth
            const body = {
                page: page,
                courseCategories: list.categoryList,
                userId: auth.userId
            }
            this.setState({ filterCourse: true,  searchFilterLoading: true })
            filterEnrolledCourses(auth.accessToken, body).then(response => {
                this.setState({ 
                    searchFilterLoading: false,
                    coursesData: response.enrolledCourses,
                    total: response.total,
                    current: response.current+1,
                    fetchError: null,
                })
            }).catch(err => {
                this.setState({ 
                    searchFilterLoading: false,
                    fetchError: err.message 
                })
            })
        } else {
            this.setState({ 
                filterCourse: false,
                categoryChecked: [0],
                tutorChecked: [0],
                typeChecked: [0],
                priceChecked: [0], 
            })
            this.getCoursesApi(0)
        }
    }

    handleJoin = async(courseId, tutorId) => {
        const {joinId} = this.state
        let verified = false
        if (joinId) {
            const auth = this.props.auth
            const body = { tutorId, courseId, joinId }
            try {
                await startLesson(auth.accessToken, body)
                this.setState({ 
                    connected: true,
                    startError: null,
                    joinId: ""
                })
                verified =  true
            } catch (err) {
                let joinError = null
                if (err.message === "JOIN_ID_NOT_FOUND") {
                    joinError = "You not created yet, wait until tutor create it"
                } 
                else if (err.message === "JOIN_ID_MISMATCH") {
                    joinError = "Oops! sorry id is incorrect, try again"
                }
                else {
                    joinError = "server error, please try again later"
                }
                this.setState({ 
                    connected: false,
                    joinError
                })
            }
        }
        return verified
    }

    handleSearchApi = (page) => {
        this.setState({ 
            searchValueError: false, 
            searchFilterLoading: true, 
            courseSearched: true  
        })
        const auth = this.props.auth
        const body = {
            page: page,
            userId: auth.userId,
            value: this.state.searchValue
        }
        searchEnrolledCourses(auth.accessToken, body).then(response => {
            this.setState({ 
                searchFilterLoading: false,
                coursesData: response.enrolledCourses,
                total: response.total,
                current: response.current+1,
                fetchError: null,
            })
        }).catch(err => {
            this.setState({ 
                searchFilterLoading: false,
                fetchError: err.message 
            })
        })
    }

    handleCourseSearch = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const {searchValue, courseSearched} = this.state
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
            })
            this.getCoursesApi(0)
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
            selectedCourse: null,
            joinId: ""
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

    handleFilter = () => {
        this.handleFilterApi(0, this.getFiltersList())
    }

    getFiltersList = () => {
        const {
            categoryChecked, typeChecked, tutorChecked,
            allCoursecategories, allCourseType, allCourseInstructors
        } = this.state

        let categoryList = []
        categoryChecked.filter(idx => {
            categoryList.push(allCoursecategories[idx])
            return 0
        })

        let tutorList = []
        tutorChecked.filter(idx => {
            tutorList.push(allCourseInstructors[idx])
            return 0
        })

        let typeList = []
        typeChecked.filter(idx => {
            typeList.push(allCourseType[idx])
            return 0
        })

        const list = { categoryList, tutorList, typeList}
        return list
    }

    handleInputOnChange = (event) => {
        const {value, name} = event.target
        this.setState({
            [name]: value,
            searchValueError: false
        })
    }

    handleToggle = (type, index) => {
        switch(type) {
            case "Course Category": this.handleCheck("categoryChecked", index)
                                    break;
            case "Course Instructors": this.handleCheck("tutorChecked", index)
                                       break;
            case "Course Type": this.handleCheck("typeChecked", index)
                                break;
            default: return
        }
    }

    handleCheck = (type, index) => {
        const checked = this.state[type]
        const currentIndex = checked.indexOf(index);
        const newChecked = [...checked];

        if (currentIndex === -1) {
          newChecked.push(index);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        this.setState({ [type]: newChecked })
    }

    handleLoadMore = (type) => {
        const {
            allCoursecategories, allCourseInstructors, allCourseType
        } = this.state
        switch(type) {
            case "Course Category": this.handleLoad(allCoursecategories, "slicedCourseCategories")
                                    break;
            case "Course Instructors": this.handleLoad(allCourseInstructors, "slicedCourseInstructors")
                                       break;
            case "Course Type": this.handleLoad(allCourseType, "slicedCourseType")
                                break;
            default: return
        }
    }

    handleLoad = (all, state) => {
        let data = all
        if(this.state[state] === all) {
            data = all.slice(0,5)
        } 
        this.setState({
            [state]: data
        })
    }

    handlePaginationOnChange = (event, page) => {
        const {filterCourse, courseSearched} = this.state
        if (courseSearched) {
            this.handleSearchApi(page-1)
        } else if (filterCourse) {
            this.handleFilterApi(page-1, this.getFiltersList())
        } else {
            this.getCoursesApi(0)
        }
    }

    renderListHead = () => {
        const {searchValue, searchValueError, courseSearched, filterCourse, btnDisabled} = this.state
        return (
            <div className = "courses_list_head">
                <Button variant="contained" onClick = {this.handleFilter} disabled = {btnDisabled}>
                { filterCourse ? "Cancel" : "Filter courses" }
                </Button>
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
                    <Button 
                        variant="contained" 
                        style = {{marginLeft: "5px"}} 
                        type = "submit"
                        disabled = {btnDisabled}
                    >
                    {courseSearched ? "Cancel" : "Search"}
                    </Button>
                </form>
            </div>
        )
    }

    renderCourseCards = (item, index) => {
        return (
            <Grid item xs={6} sm={6} md={4} key = {index}>
                <div className = "course_enrolled_card" onClick = {() => this.handleCourseOnClick(item)}>
                    <CourseEnrolled src = {altImage} item = {item}/>
                </div>
            </Grid>
        )
    }

    renderCategoryFilters = () => {
        const {
            slicedCourseCategories, categoryChecked, allCoursecategories,
        } = this.state
        return (
            <>
                <Grid item xs={6} sm={6} md={12}>
                    <CategoryFilter 
                        title = "Course Category"
                        options = {slicedCourseCategories}
                        handleToggle = {this.handleToggle}
                        checked = {categoryChecked}
                        handleLoadMore = {this.handleLoadMore}
                        total = {allCoursecategories.length}
                    />
                </Grid>
            </>
        )
    }

    renderCoursesConatiner = () => {
        const {loading, total, current, coursesData, searchFilterLoading} = this.state
        return (
            <div className = "my_courses__container">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={3}>
                        <Grid container spacing={1}>
                            { this.renderCategoryFilters() }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <div maxWidth="md" className = "course__list__root">
                        <div maxWidth="md">
                            { this.renderListHead() }
                        </div>
                            <Grid container spacing={4}>
                                { 
                                    searchFilterLoading ? 
                                    <Grid item xs={12} sm={12} md={12}>
                                        <CircularProgress/>
                                    </Grid>
                                    :
                                    coursesData.length === 0 ? 
                                    this.renderNoCoursesAvailable() 
                                    :
                                    coursesData.map((item, index) => this.renderCourseCards(item, index)) 
                                }
                            </Grid>
                        </div>
                        <div className = "pagination_div">
                            {
                                !loading && coursesData.length > 0 &&
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
            <Grid item xs={12} sm={12} md={12}>
                <div className = "no_courses_available_container">
                    <span className = "no_courses_available">NO COURSES AVAILABLE</span>
                </div>
            </Grid>
        )
    }

    render() {
        const {loading, selectedCourse, openCourseView} = this.state
        return (
            <div className = "my_courses_root">
                <Header 
                    title = "EXPLORE COURSES" 
                    src = {headerImg}
                />
                {
                    loading ? <Loading open = {loading} />
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
                        auth = {this.props.auth}
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