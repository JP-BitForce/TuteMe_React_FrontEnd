import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import Header from '../../components/Header/Header'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import CourseEnrolled from '../../components/Card/CourseEnrolled'
import Pagination from '../../components/Pagination/Paginator'

//Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import headerImg from '../../assets/images/Course/course.jpg'
import reactJs from '../../assets/images/Course/react.jpg'
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
        current: 1
    }

    courseCategories = [
        "All",
        "UI/UX Design",
        "Art & Design",
        "Computer Science",
        "History & Archelogic",
        "App Development",
        "Health & Fitness",
        "Graphic Design",
        "Marketing",
        "Music",
        "Buisness",
        "Management"
    ]

    courseInstuctors = ["All"," Ronald Jackson","John Dee","Nathan Messy"," Tony Griffin"]

    courseType = ["All", "Primary", "Ordinary", "Advanced"]

    dummyCourses = [
        {des:"lorem ipsum", name:"Design for the web", by:"John Smith", rating:4},
        {des:"lorem ipsum", name:"Western", by:"John Smith", rating:4},
        {des:"lorem ipsum", name:"Classical", by:"Django Caprio", rating:5},
        {des:"lorem ipsum", name:"adobe photoshop", by:"John Smith", rating:4},
        {des:"lorem ipsum", name:"Western", by:"John Smith", rating:4},
        {des:"lorem ipsum", name:"web with adobe photoshop", by:"Django Caprio", rating:5},
    ]

    componentDidMount() {
        this.setState({
            slicedCourseCategories: this.courseCategories.slice(0,5),
            slicedCourseInstructors: this.courseInstuctors.slice(0,5),
            slicedCourseType: this.courseType.slice(0,5),
            allCoursecategories: this.courseCategories,
            allCourseInstructors: this.courseInstuctors,
            allCourseType: this.courseType,
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
        const {name, by, rating} = item
        return (
            <Grid item xs={6} sm={6} md={4} key = {index}>
                <div className = "course_enrolled_card">
                    <CourseEnrolled src = {reactJs} title = {name} by = {by} rating = {rating}/>
                </div>
            </Grid>
        )
    }

    renderCoursesConatiner = () => {
        const {loading, total, current} = this.state
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
                                    this.dummyCourses.map((item, index) => {
                                        return this.renderCourseCards(item, index)
                                    })
                                }
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
        const {loading} = this.state
        return (
            <div className = "my_courses_root">
                <Header 
                    title = "EXPLORE COURSES" 
                    src = {headerImg}
                />
                {
                    loading ? 
                    <Loading open = {loading} />
                    :
                    this.renderCoursesConatiner()
                }
            </div>
        )
    }
}

export default MyCourses