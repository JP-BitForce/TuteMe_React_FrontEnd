import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'

import './Courses.css'

class MyCourses extends Component {
    state = {
        loading: false
    }


    renderCourses = () => {
        return (
            <div className = "courses_category_header_container">
                <span className = "courses_category_title">Explore Courses</span>
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

    renderCoursesRoot = () => {
        return (
            <div className = "my_courses_container">
                {
                        this.renderCourses()
                }
            </div>
        )
    }

    render() {
        const {loading} = this.state
        return (
            <div className = "my_courses_root">
                {
                    loading ? 
                    <Loading open = {loading} />
                    :
                    this.renderCoursesRoot()
                }
            </div>
        )
    }
}

export default MyCourses