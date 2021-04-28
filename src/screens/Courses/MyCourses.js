import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import Header from '../../components/Header/Header'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import CourseEnrolled from '../../components/Card/CourseEnrolled'
import Pagination from '../../components/Pagination/Paginator'
import { getEnrolledCourses, getFilterCategories } from '../../api/course'

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
        fetchError: null
    }

    componentDidMount() {
        console.clear()
        this.getCategoriesApi()
        this.getCoursesApi()
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

    getCoursesApi = () => {
        const auth = this.props.auth
        this.setState({ loading: true })
        getEnrolledCourses(auth.accessToken, auth.userId).then(response => {
            this.setState({ 
                loading: false,
                total: 1,
                current: 1,
                coursesData: response.enrolledCourses,
                fetchError: null
            })
        }).catch(err => {
            this.setState({ 
                loading: false,
                fetchError: err.message
            })
        })
    }

    handleCourseSearch = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!this.state.searchValue) {
            this.setState({ searchValueError: true })
        } else {
            this.setState({ searchValueError: false })
        }
    }

    handleFilter = () => {
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

    handlePaginationOnChange = (page) => {

    }

    renderListHead = () => {
        const {searchValue, searchValueError} = this.state
        return (
            <div className = "courses_list_head">
                <Button variant="contained" onClick = {this.handleFilter}>Filter courses</Button>
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
                    <Button variant="contained" style = {{marginLeft: "5px"}} type = "submit">Search</Button>
                </form>
            </div>
        )
    }

    renderCategoryFilters = () => {
        const {
            slicedCourseCategories, slicedCourseInstructors, slicedCourseType, 
            categoryChecked, tutorChecked, typeChecked,
            allCoursecategories, allCourseInstructors, allCourseType
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
                <Grid item xs={6} sm={6} md={12}>
                    <CategoryFilter 
                        title = "Course Instructors"
                        options = {slicedCourseInstructors}
                        handleToggle = {this.handleToggle}
                        checked = {tutorChecked}
                        handleLoadMore = {this.handleLoadMore}
                        total = {allCourseInstructors.length}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                    <CategoryFilter 
                        title = "Course Type"
                        options = {slicedCourseType}
                        handleToggle = {this.handleToggle}
                        checked = {typeChecked}
                        handleLoadMore = {this.handleLoadMore}
                        total = {allCourseType.length}
                    />
                </Grid>
            </>
        )
    }

    renderCourseCards = (item, index) => {
        return (
            <Grid item xs={6} sm={6} md={4} key = {index}>
                <div className = "course_enrolled_card">
                    <CourseEnrolled src = {altImage} item = {item}/>
                </div>
            </Grid>
        )
    }

    renderCoursesConatiner = () => {
        const {loading, total, current, coursesData} = this.state
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
                                { coursesData.map((item, index) => this.renderCourseCards(item, index)) }
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
        const {loading, coursesData} = this.state
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