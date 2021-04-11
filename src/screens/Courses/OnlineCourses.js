import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import CourseCard from '../../components/Card/CourseCard'
import Header from '../../components/Header/Header'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import Pagination from '../../components/Pagination/Paginator'

//Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import headerImg from '../../assets/images/Course/online_headerImg.jpg'
import unity from '../../assets/images/Course/unity.jpg'
import './Courses.css'

class OnlineCourses extends Component {
    state = {
        loading: false,
        categoryOption: "ALL",
        categoryOptions: ["ALL"],
        moreCategories: false,
        checked: [0],
        searchValue: "",
        searchValueError: false,
        categoryChecked: [0],
        tutorChecked: [0],
        typeChecked: [0],
        priceChecked: [0],
        allCoursecategories: [],
        slicedCourseCategories: [],
        allCourseInstructors: [],
        slicedCourseInstructors: [],
        allCourseType: [],
        slicedCourseType: [],
        allCoursePrice: [],
        slicedCoursePrice: [],
        total: 1,
        current: 1
    }

    dummyCourses = [
        {des:"lorem ipsum", name:"Western", by:"John Smith", rating:4},
        {des:"lorem ipsum", name:"Classical", by:"Django Caprio", rating:5},
        {des:"lorem ipsum", name:"Western", by:"John Smith", rating:4},
        {des:"lorem ipsum", name:"Classical", by:"Django Caprio", rating:5},
    ]

    courseCategories = [
        "ALL",
        "UI/UX Design",
        "Art & Design",
        "Computer Science",
        "History & Archelogic",
        "App Development"
    ]

    courseInstuctors = ["All", " Ronald Jackson", "John Dee", "Nathan Messy", " Tony Griffin"]

    courseType = ["All", "Primary", "Ordinary", "Advanced"]

    coursePrizes = ["All", "Under $125.00", "$125.00 - $175.00"]

    componentDidMount() {
        this.setState({
            slicedCourseCategories: this.courseCategories.slice(0,5),
            slicedCourseInstructors: this.courseInstuctors.slice(0,5),
            slicedCourseType: this.courseType.slice(0,5),
            slicedCoursePrice: this.coursePrizes.slice(0,5),
            allCoursecategories: this.courseCategories,
            allCourseInstructors: this.courseInstuctors,
            allCourseType: this.courseType,
            allCoursePrice: this.coursePrizes
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
            categoryChecked, typeChecked, tutorChecked, priceChecked,
            allCoursecategories, allCourseType, allCourseInstructors, allCoursePrice
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

        let priceList = []
        priceChecked.filter(idx => {
            priceList.push(allCoursePrice[idx])
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
            case "Course Price": this.handleCheck("priceChecked", index)
                                break;
            default: return
        }
    };

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
            allCoursecategories, allCourseInstructors, allCourseType, allCoursePrice
        } = this.state
        switch(type) {
            case "Course Category": this.handleLoad(allCoursecategories, "slicedCourseCategories")
                                    break;
            case "Course Instructors": this.handleLoad(allCourseInstructors, "slicedCourseInstructors")
                                       break;
            case "Course Type": this.handleLoad(allCourseType, "slicedCourseType")
                                break;
            case "Course Price": this.handleLoad(allCoursePrice, "slicedCoursePrice")
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

    renderCourseCard = (item) => {
        const {name, by, rating} = item
        return (
            <Grid item xs={6} sm={6} md={4}>
                <CourseCard
                    src = {unity}
                    title = {name}
                    by = {by}
                    rating = {rating}
                    price = "150"
                    description = "Donec molestie tincidunt tellus sit amet aliquet"
                />
            </Grid>
        )
    }

    renderListHead = () => {
        const {searchValue, searchValueError} = this.state
        return (
            <div className = "courses_list_head">
                <Button variant="contained" onClick = {this.handleFilter}>Filter courses</Button>
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
                    <Button variant="contained" style = {{marginLeft: "5px"}} type = "submit">Search</Button>
                </form>
            </div>
        )
    }

    renderCategoryFilters = () => {
        const {
            categoryChecked, tutorChecked, typeChecked, priceChecked,
            slicedCourseCategories, slicedCourseInstructors, slicedCoursePrice, slicedCourseType,
            allCourseInstructors, allCoursePrice, allCourseType, allCoursecategories
        } = this.state
        const filters = [
            {title: "Course Category", options: slicedCourseCategories, checked: categoryChecked, total: allCoursecategories},
            {title: "Course Instructors", options: slicedCourseInstructors, checked: tutorChecked, total: allCourseInstructors },
            {title: "Course Type", options: slicedCourseType, checked: typeChecked, total: allCourseType},
            {title: "Course Price", options: slicedCoursePrice, checked: priceChecked, total: allCoursePrice},
        ]
        return filters.map(item => {
            return (
                <Grid item xs={6} sm={6} md={12}>
                    <CategoryFilter 
                        title = {item.title}
                        options = {item.options}
                        handleToggle = {this.handleToggle}
                        checked = {item.checked}
                        handleLoadMore = {this.handleLoadMore}
                        total = {item.total.length}
                    />
                </Grid>
            )
        })
    }

    renderCourseList = () =>{
        const {loading, total, current} = this.state
        return (
            <div className = "online_course_list_container">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={3}>
                        <Grid container spacing={1}>
                            { this.renderCategoryFilters() }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <div maxWidth="md">
                            { this.renderListHead() }
                        </div>
                        <Grid container spacing={2}>
                            {
                                this.dummyCourses.map(item => {
                                    return this.renderCourseCard(item)
                                })
                            }
                        </Grid>
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

    render() {
        const {loading} = this.state
        return (
            <div className = "online_courses_root">
                <Header 
                    title = "BROWSE ONLINE COURSES" 
                    src = {headerImg}
                />
                {
                    loading ? 
                    <Loading open = {loading} />
                    :
                    this.renderCourseList()
                }
            </div>
        )
    }
}

export default OnlineCourses