import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import CourseCard from '../../components/Card/CourseCard'
import Modal from '../../components/Modal/Modal'
import CourseCategories from './CourseCategories'
import Header from '../../components/Header/Header'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'

//Material-UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import all from '../../assets/images/courses/all.png'
import javascript from '../../assets/images/courses/javascript.png'
import reactnative from '../../assets/images/courses/react-native.png'
import maths from '../../assets/images/courses/maths.png'
import bio from '../../assets/images/courses/bio.png'
import musical from '../../assets/images/courses/musical.png'
import accounting from '../../assets/images/courses/accounting.png'
import music_2 from '../../assets/images/courses/music_2.png'
import headerImg from '../../assets/images/Course/online_headerImg.jpg'
import certificate from '../../assets/images/Course/certificate.png'
import prizing from '../../assets/images/Course/prizing.png'
import unity from '../../assets/images/Course/unity.jpg'
import './Courses.css'

class OnlineCourses extends Component {
    state = {
        loading: false,
        categoryOption: "ALL",
        categoryOptions: ["ALL"],
        selected:{category : "ALL", src : all },
        moreCategories: false,
        checked: [0]
    }

    dummyCourseCategories = [
        {category : "ALL", src : all },
        {category : "UI/UX Design", src : javascript },
        {category : "Art & Design", src : reactnative },
        {category : "Computer Science", src : maths },
        {category : "History & Archelogic", src : bio },
        {category : "App Development", src : bio },
        {category : "Health & Fitness", src : bio },
        {category : "Graphic Design", src : javascript },
        {category : "Marketing", src : accounting },
        {category : "Music", src : musical },
        {category : "Buisness", src : accounting },
        {category : "Management", src : accounting },
    ]

    dummyCourses = [
        {src:reactnative, des:"lorem ipsum", name:"Western", by:"John Smith", rating:4},
        {src:music_2, des:"lorem ipsum", name:"Classical", by:"Django Caprio", rating:5},
        {src:javascript, des:"lorem ipsum", name:"Western", by:"John Smith", rating:4},
        {src:maths, des:"lorem ipsum", name:"Classical", by:"Django Caprio", rating:5},
    ]

    cards = [
        {src : certificate, title : "Certificate Courses", description :"The automated process all your website tasks."},
        {src : prizing, title : "Prizing courses ",  description :"The automated process all your website tasks."},
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

    courseType = ["All", "Primary", "Ordinary", "Advanced", "Others"]

    coursePrizes = ["All", "Under $125.00", "$125.00 - $175.00"]

    categories = [
        {title : "Category", options : this.courseCategories},
        {title : "Instructors", options : this.courseInstuctors},
        {title : "Type", options : this.courseType},
        {title : "Price", options : this.coursePrizes}
    ]

    handleCategoryModalOk = () => {

    }

    handleListItemOnClick = (item) => {
        this.setState({
            selected: item
        })
    }

    handleCoursesSearch = () => {

    }

    handleSearchOnChange = () => {

    }

    handleMoreCategories = () => {
        this.setState({
            moreCategories: !this.state.moreCategories
        })
    }

    onCategorySelect = (item) => {
        this.setState({
            selected: item
        })
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

    renderCategoryModal = () => {
        return (
            <Modal
                open = {this.state.moreCategories}
                handleClose = {this.handleMoreCategories}
                title = "Select Course Category Here!"
                handleCancel = {this.handleMoreCategories}
                handleOk = {this.handleCategoryModalOk}
            >
                <CourseCategories 
                    handleClick = {this.handleListItemOnClick}
                    items = {this.dummyCourseCategories}
                />
            </Modal>
        )
    }

    renderCategoryItem = (item) => {
        const {category,src} = item
        return (
            <Grid item xs={6} sm={6} md={3}>
                <Paper elevation = {5}>
                    <div 
                        onClick={()=>this.onCategorySelect(item)}
                        className = {[
                            "category_item_wrapper",
                            this.state.selected.category === category && "selected_category"
                        ].join(" ")}
                    >
                        <img src={src} alt={category} className = "category_icon_src"/>
                        <span>{category}</span>
                    </div>
                </Paper>
            </Grid>
        )
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
                />
            </Grid>
        )
    }

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

    renderCourseList = () =>{
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
                    </Grid>
                </Grid>
            </div>
        )
    }

    renderRoot = () => {
        return (
            <div className = "online_courses_container">
                <div className = "online_course_list_root">
                    <div className = "more_category">
                        <span onClick = {this.handleMoreCategories}>More Categories</span>
                    </div>
                    { this.renderCourseList() }  
                </div>   
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
                    cards = {this.cards}
                />
                {
                    loading ? 
                    <Loading open = {loading} />
                    :
                    this.renderRoot()
                }
                { this.renderCategoryModal() }
            </div>
        )
    }
}

export default OnlineCourses