import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import CourseCard from '../../components/Card/CourseCard'
import CustomButton from '../../components/Button/CustomButton'
import InputFeild from '../../components/Input/InputField'
import Header from '../../components/Header/Header'

//Boostarp
import Card from 'react-bootstrap/Card'

//Material-UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';

import all from '../../assets/images/courses/all.png'
import javascript from '../../assets/images/courses/javascript.png'
import reactnative from '../../assets/images/courses/react-native.png'
import maths from '../../assets/images/courses/maths.png'
import bio from '../../assets/images/courses/bio.png'
import musical from '../../assets/images/courses/musical.png'
import accounting from '../../assets/images/courses/accounting.png'
import headerImg from '../../assets/images/Course/course.jpg'
import certificate from '../../assets/images/Course/certificate.png'
import prizing from '../../assets/images/Course/prizing.png'
import './Courses.css'

class MyCourses extends Component {
    state = {
        loading: false,
        checked: [0],
        filterOpen: false
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
        {src:javascript, des:"lorem ipsum", name:"Western", by:"John Smith", rating:4},
        {src:maths, des:"lorem ipsum", name:"Classical", by:"Django Caprio", rating:5},
        {src:reactnative, des:"lorem ipsum", name:"Western", by:"John Smith", rating:4},
        {src:javascript, des:"lorem ipsum", name:"Western", by:"John Smith", rating:4},
        {src:maths, des:"lorem ipsum", name:"Classical", by:"Django Caprio", rating:5},
    ]

    cards = [
        {src : certificate, title : "Certificate Courses", description :"The automated process all your website tasks."},
        {src : prizing, title : "Prizing courses ",  description :"The automated process all your website tasks."},
    ]

    handleSearch = () => {
        
    }

    handleInputOnChange = () => {

    }

    toggleDrawer = () => {
        this.setState({
            filterOpen: !this.state.filterOpen
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

    renderFilterContainer = () => {
        const checked = this.state.checked
        return (
            <Card>
                <Card.Body>
                    <ListItemText primary="FILTER BY CATEGORIES"/>
                    <List
                        aria-labelledby="main"
                    >
                        {
                            this.dummyCourseCategories.map((item, index) => {
                                const labelId = `checkbox-list-label-${index}`;
                                return (
                                    <ListItem key={index} role={undefined} dense button onClick={this.handleToggle(index)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={checked.indexOf(index) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={item.category} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Card.Body>
            </Card>
        )
    }

    renderCourses = () => {
        return (
            <main>
                <Paper elevation = {1} style = {{padding:"3%"}}>
                    <Grid container spacing={2} justify="flex-end">
                        <Grid item>
                            <InputFeild
                                type = "text"
                                name = "course"
                                value = {this.state.searchValue}
                                onChange = {this.handleInputOnChange}
                                max = {100}
                                placeholder = "course"
                            />
                        </Grid>
                        <Grid item>
                            <CustomButton label = "search" onClick = {this.handleSearch}/>
                        </Grid>
                    </Grid>
                    <div className = "more_category">
                        <span onClick = {this.toggleDrawer}>Filter Categories</span>
                    </div>
                    <div maxWidth="md">
                        <Grid container spacing={4}>
                            {
                                this.dummyCourses.map(item => {
                                    const {src, name, by, rating} = item
                                    return (
                                        <Grid item key={name} xs={6} sm={6} md={4}>
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
                </Paper>
            </main>
        )
    }

    renderCoursesRoot = () => {
        return (
            <div className = "my_courses_container">
                { this.renderCourses() }
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
                    this.renderCoursesRoot()
                }
                <Drawer anchor="right" open={this.state.filterOpen} onClose={this.toggleDrawer}>
                    { this.renderFilterContainer() }
                </Drawer>
            </div>
        )
    }
}

export default MyCourses