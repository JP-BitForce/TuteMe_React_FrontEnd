import React from 'react'
import moment from 'moment';

import ReadOnlyRating from '../Rating/ReadOnlyRating'

//Material-UI
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import './InfoCard.css'

const CourseEnrolled = ({src, item}) => {
    const {title, description, rating, duration, enrolledAt, tutorName, courseImg} = item

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    return (
        <div className = "course_enrolled_item">
            <Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <div className = "course_thumnail">
                        <img src = {courseImg ? getImageSource(courseImg) : src} alt = {title} className = "course_thumnail_img"/>
                        <div className = "course_author">By {tutorName}</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <div className = "course_enrolled_content">
                        <div className = "course_meta">
                            <span>{duration}</span>
                            <span>{moment(enrolledAt).format('YYYY-MM-DD')}</span>
                        </div>
                        <Divider/>
                        <h5>{title}</h5>
                        <h6>{description.slice(0,100)}...</h6>
                        <div className = "course_enrolled_rating">
                            <ReadOnlyRating rate = {rating}/>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default CourseEnrolled
