import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import CourseCard from '../../components/Card/CourseCard'
import Modal from '../../components/Modal/Modal'
import CourseCategories from './CourseCategories'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
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
import './Courses.css'

class OnlineCourses extends Component {
    state = {
        loading: false,
        categoryOption: "ALL",
        categoryOptions: ["ALL"],
        selected:{category : "ALL", src : all },
        moreCategories: false,
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
            <Grid item xs={6} sm={3}>
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

    renderListItems = () => {
        return (
            <div className = "online_course_list_container">
                { this.renderListHead() }
                <div className = "online_course_list">
                    <Grid container spacing={3}>
                        {
                            this.dummyCourses.map(item => {
                                const {src, name, by, rating} = item
                                return (
                                    <Grid item xs={6} sm={3}>
                                        <Paper elevation = {3}>
                                            <CourseCard
                                                src = {src}
                                                title = {name}
                                                by = {by}
                                                rating = {rating}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            </div>
        )
    }

    renderCoursesRoot = () => {
        return (
            <div className = "online_courses_container">
                <div className = "online_courses_category_root">
                    <div className = "courses_category_header_container">
                        <span className = "courses_category_title">Browse Our Online Courses</span>
                    </div>
                    <div className = "courses_category_container">
                        <Grid container spacing={3}>
                            {
                                this.dummyCourseCategories.slice(0,8).map(item => this.renderCategoryItem(item))
                            }
                        </Grid>
                        <div className = "more_category">
                            <span onClick = {this.handleMoreCategories}>More Categories</span>
                        </div>
                        <Divider/>
                    </div>
                    <div className = "online_course_list_root">
                        { this.renderListItems()}
                    </div>                 
                </div>
            </div>
        )
    }

    render() {
        const {loading} = this.state
        return (
            <div className = "online_courses_root">
                {
                    loading ? 
                    <Loading open = {loading} />
                    :
                    this.renderCoursesRoot()
                }
                { this.renderCategoryModal() }
            </div>
        )
    }
}

export default OnlineCourses