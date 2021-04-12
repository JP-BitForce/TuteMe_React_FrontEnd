import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import CourseCard from '../../components/Card/CourseCard'
import Header from '../../components/Header/Header'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import Pagination from '../../components/Pagination/Paginator'
import { getCourses, getFilterCategories } from '../../api/course'

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
        current: 1,
        fetchError: null,
        coursesData: []
    }

    componentDidMount() {
        this.getCategories()
        this.getCoursesApi(0)
    }

    getCategories = () => {
        const auth = this.props.auth
        getFilterCategories(auth.accessToken).then(response => {
            if (response) {
                this.setState({
                    slicedCourseCategories: response.courseCategoryList.slice(0,5),
                    slicedCourseInstructors: response.tutorList.slice(0,5),
                    slicedCourseType: response.courseLevelList.slice(0,5),
                    slicedCoursePrice: response.coursePriceCategoryList.slice(0,5),
                    allCoursecategories: response.courseCategoryList,
                    allCourseInstructors: response.tutorList,
                    allCourseType: response.courseLevelList,
                    allCoursePrice: response.coursePriceCategoryList
                })
            }
        }).catch(err => {
            this.setState({
                fetchError: err.message
            })
        })
    }

    getCoursesApi = (page) => {
        const auth = this.props.auth
        this.setState({ loading: true })
        getCourses(auth.accessToken, page).then(response => {
            this.setState({ 
                loading: false,
                coursesData: response.data,
                total: response.total,
                current: response.current+1,
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
        this.getCoursesApi(page-1)
    }

    getPriceCategories = (data) => {
        let list = []
        data.filter(item => {
            list.push(`Rs ${item.priceMin}.00 - ${item.priceMax}.00`)
            return 0
        })
        return list
    }

    renderCourseCard = (item) => {
        const {name, rating} = item
        return (
            <Grid item xs={6} sm={6} md={4}>
                <CourseCard
                    src = {unity}
                    title = {name}
                    by = "John Apraham"
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
            {title: "Course Price", options: this.getPriceCategories(slicedCoursePrice), checked: priceChecked, total: allCoursePrice},
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
        const {loading, total, current, coursesData} = this.state
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
                                coursesData.map(item => {
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user
    }
}

export default connect(mapStateToProps)(OnlineCourses)