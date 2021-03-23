import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import Header from '../../components/Header/Header'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import CourseEnrolled from '../../components/Card/CourseEnrolled'

//Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import all from '../../assets/images/courses/all.png'
import headerImg from '../../assets/images/Course/course.jpg'
import certificate from '../../assets/images/Course/certificate.png'
import online_materials from '../../assets/images/Course/online_materials.png'
import reactJs from '../../assets/images/Course/react.jpg'
import './Courses.css'

class MyCourses extends Component {
    state = {
        loading: false,
        checked: [0],
        searchValue: "",
        selected:{category : "ALL", src : all },
    }

    courseCategories = [
        "ALL",
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

    courseInstuctors = [
        " Ronald Jackson",
        "John Dee",
        "Nathan Messy",
        " Tony Griffin"
    ]

    courseType = ["Primary", "Ordinary", "Advanced", "Others"]

    dummyCourses = [
        {des:"lorem ipsum", name:"Design for the web", by:"John Smith", rating:4},
        {des:"lorem ipsum", name:"Western", by:"John Smith", rating:4},
        {des:"lorem ipsum", name:"Classical", by:"Django Caprio", rating:5},
        {des:"lorem ipsum", name:"adobe photoshop", by:"John Smith", rating:4},
        {des:"lorem ipsum", name:"Western", by:"John Smith", rating:4},
        {des:"lorem ipsum", name:"web with adobe photoshop", by:"Django Caprio", rating:5},
    ]

    cards = [
        {src : certificate, title : "Certifications", description :"The automated process all your website tasks."},
        {src : online_materials, title : "E-Materials",  description :"The automated process all your website tasks."},
    ]

    categories = [
        {title : "Course Category", options: this.courseCategories},
        {title : "Course Instructors", options: this.courseInstuctors},
        {title : "Course Type", options: this.courseType},
    ]

    handleSearch = () => {
        
    }

    handleInputOnChange = () => {

    }

    handleToggle = (value) => () => {
        const checked = this.state.checked
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        this.setState({
            checked: newChecked
        })
    };

    renderListHead = () => {
        const selected = this.state.selected
        return (
            <div className = "courses_list_head">
                <div className = "header_category">
                    <div className = "category_icon_small selected_category">
                        <Avatar src = {selected.src}/>
                    </div>
                    <span>
                        {selected.category}
                    </span>
                </div>
                <form noValidate autoComplete="off" onSubmit = {this.handleCoursesSearch}>
                    <TextField id="standard-basic" label="serach" onChange = {this.handleSearchOnChange}/>
                </form>
            </div>
        )
    }

    renderCategoryFilters = () => {
        return this.categories.map(item => {
            return (
                <Grid item xs={6} sm={4} md={12}>
                    <CategoryFilter 
                        title = {item.title}
                        options = {item.options}
                        handleToggle = {this.handleToggle}
                        checked = {this.state.checked}
                    />
                </Grid>
            )
        })
    }

    renderCourseCards = (item) => {
        const {name, by, rating} = item
        return (
            <Grid item key={name} xs={12} sm={12} md={4}>
                <div className = "course_enrolled_card">
                    <CourseEnrolled src = {reactJs} title = {name} by = {by} rating = {rating}/>
                </div>
            </Grid>
        )
    }

    renderCoursesConatiner = () => {
        return (
            <div className = "my_courses__container">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={3}>
                        <Grid container spacing={4}>
                            { this.renderCategoryFilters() }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <div maxWidth="md">
                        <div maxWidth="md">
                            { this.renderListHead() }
                        </div>
                            <Grid container spacing={4}>
                                {
                                    this.dummyCourses.map(item => {
                                        return this.renderCourseCards(item)
                                    })
                                }
                            </Grid>
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
                    cards = {this.cards}
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